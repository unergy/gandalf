# Spec: publicar Gandalf UI como librería npm

|            |                                                     |
| ---------- | --------------------------------------------------- |
| **Estado** | Borrador — decisiones cerradas, listo para revisión |
| **Autora** | Laura Melissa                                       |
| **Fecha**  | 2026-10-20                                          |
| **Repo**   | `unergy/gandalf`                                    |

---

## 1. Contexto

Hoy Gandalf UI se distribuye con el **modelo shadcn**: cada proyecto copia a mano las carpetas de `app/components/gandalf/` y `app/components/ui/` (ver `content/docs/installation.md`). El CLI `gandalf-ui add` está marcado como _coming soon_.

Problemas de ese modelo para un design system interno:

- **Deriva de versiones.** Cada app tiene su propia copia; un fix en `GCombobox` no llega a nadie sin volver a copiar archivos.
- **Sin forma de saber qué versión usa cada app.** No hay `package.json` que lo diga.
- **Las capas se rompen.** La regla "no edites `ui/`" depende de disciplina en cada repo consumidor.
- **Instalación larga.** Montar shadcn-nuxt, copiar carpetas, alinear el CSS y las dependencias son varios pasos manuales.

## 2. Objetivo

Publicar Gandalf como un paquete versionado que cualquier app Vue 3 / Nuxt 4 de Unergy instala con un solo comando:

```bash
bun add @unergy/gandalf
```

```vue
<script setup lang="ts">
import { GBadge, GCombobox } from '@unergy/gandalf'
</script>
```

### Fuera de alcance (por ahora)

- CLI de copia estilo shadcn (`gandalf-ui add`). Se puede retomar después como opción de _eject_.
- Publicar en el registro público de npm.
- Reescribir componentes o cambiar su API pública.
- Migrar las apps consumidoras (cada equipo lo hace después de la v1.0.0, con la guía de la sección 10).

## 3. Estado actual relevante

Lo que se encontró al revisar el repo:

| Hallazgo                                                                                                                                                                                               | Implicación                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Los 142 `.vue` de `gandalf/` y las 60 primitivas de `ui/` importan todo de forma explícita (no dependen de auto-imports de Nuxt) y no usan APIs de Nuxt (`NuxtLink`, `useNuxtApp`, `#imports`…).       | Se pueden compilar como librería **Vue pura**. Es la buena noticia principal.                                            |
| Todos los imports internos usan el alias `@/` (`@/components/ui/...`, `@/lib/utils`).                                                                                                                  | El build tiene que resolver o reescribir `@/` porque el consumidor no lo tiene.                                          |
| Los tokens semánticos (`success`, `action`, `information`, `bni-*`…) viven en `app/assets/css/tailwind.css`, mezclados con estilos de la web de docs (Shiki, `.prose`) y un `@import` de Google Fonts. | Hay que separar el CSS del paquete del CSS de la web de docs.                                                            |
| Las clases Tailwind se escriben como texto dentro de los componentes.                                                                                                                                  | El Tailwind v4 del consumidor tiene que escanear el paquete (`@source`), o se publica CSS ya compilado. Ver decisión D3. |
| `SidebarProvider.vue` usa `useMediaQuery`, y `app/plugins/ssr-width.ts` llama a `provideSSRWidth`.                                                                                                     | El plugin pasa a ser parte del módulo Nuxt (o queda documentado para Vue puro).                                          |
| `ui/chart` importa `@unovis/vue`, que **no está en `package.json`**.                                                                                                                                   | Bug actual. Hay que añadirlo como dependencia opcional o sacar `chart` del entry principal.                              |
| El paquete raíz se llama `"app"` y tiene `"private": true`; las dependencias de docs (`@nuxt/content`, `better-sqlite3`, `i18n`…) están mezcladas con las de la librería.                              | Hay que separarlos en dos paquetes.                                                                                      |

## 4. Decisiones

### D1. Estructura del repo: monorepo con workspaces de Bun

```
gandalf/
  packages/
    gandalf/               → la librería (lo que se publica)
      src/
        components/
          ui/              → movido desde app/components/ui
          gandalf/base/    → movido desde app/components/gandalf/base
          gandalf/kit/     → movido desde app/components/gandalf/kit
        lib/utils.ts
        styles/
          tokens.css       → @theme + :root/.dark (solo tokens)
          index.css        → tokens + @source + tw-animate + sonner
        nuxt/module.ts     → módulo Nuxt opcional (D5)
        index.ts           → barrel público
      package.json
      vite.config.ts
  apps/
    docs/                  → la web Nuxt actual (content/, pages/, previews)
  package.json             → workspaces: ["packages/*", "apps/*"]
```

La web de docs consume la librería como `"@unergy/gandalf": "workspace:*"`. Así **la documentación se convierte en el primer consumidor real**: si un preview se rompe, el paquete está mal.

Se mantuvo la carpeta `components/gandalf/` dentro de `src/` para no tocar ningún import interno: todos usan rutas como `@/components/gandalf/base/...` y `@/components/ui/...`.

**El alias `@/`:** dentro del paquete, `@/` apunta a `packages/gandalf/src`. Lo declaran `packages/gandalf/tsconfig.json` (para el editor y el CLI de shadcn) y el build de la fase 2. Mientras la web de docs consuma el código fuente, su `nuxt.config.ts` redefine `@` hacia el paquete. Por eso los docs usan `~/` para sus propios archivos y `@unergy/gandalf` para todo lo de la librería.

_Alternativa descartada:_ mantener un solo paquete y publicar desde `app/`. Mezcla las dependencias de docs con las de la librería y no prueba el paquete como lo usaría un consumidor.

### D2. Build: Vite en modo librería + `vite-plugin-dts`

Implementado en `packages/gandalf/vite.config.ts`:

- `build.lib` con salida **solo ESM** y una entrada por el barrel (`src/index.ts`) más una por cada primitiva de `ui/` (se leen de la carpeta, así una primitiva nueva de shadcn queda publicada sin tocar la configuración).
- `preserveModules: true`: `dist/` replica la estructura de `src/`, y el _tree-shaking_ funciona componente a componente. Verificado en la prueba de humo: lo que no se importa (sidebar, chart, carousel…) no llega al bundle de la app.
- `resolve.alias: { '@': src }`. Los imports `@/` se reescriben a rutas relativas en `dist/`.
- `vite-plugin-dts` con `vue-tsc` genera los `.d.ts`, incluidos los tipos de props de los SFC.
- Externos: todo lo que está en `dependencies` y `peerDependencies`, leído del `package.json`.
- **Sin minificar.** Minifica la app que consume. Minificar en la librería empeora los _stack traces_ y, además, rompió el build de Nuxt: su transformación de auto-imports confundía variables de una letra (`h`) con el helper `h` de Vue.

_Alternativa:_ `unbuild` + `mkdist`, que publica los `.vue` sin compilar. Es más simple, pero obliga al consumidor a compilar SFC de `node_modules` y los tipos son menos fiables. Se descarta.

**Errores de tipos conocidos.** `ui/chart` tiene 3 errores de tipos que vienen de shadcn (`ChartTooltipContent.vue` y `utils.ts`). No bloquean el build, sus `.d.ts` se generan, y no se corrigen porque `ui/` no se edita. Se resolverán al actualizar la primitiva desde shadcn.

**Tipos solo para `moduleResolution: "bundler"`.** Los `.d.ts` usan imports relativos sin extensión, que es lo que esperan Vite y Nuxt. Con `node16`, que exige extensiones, no resuelven. Por eso `attw` corre con `--ignore-rules internal-resolution-error`.

### D3. CSS: Tailwind v4 escanea el paquete (no se publica CSS compilado)

El paquete publica `@unergy/gandalf/styles.css`:

```css
/* packages/gandalf/src/styles/index.css, copiado a dist/styles en el build */
@import 'tw-animate-css';
@import 'vue-sonner/style.css';
@import './tokens.css';
@source '../components'; /* el Tailwind del consumidor escanea los componentes del paquete */
```

El consumidor añade una línea a su CSS:

```css
@import 'tailwindcss';
@import '@unergy/gandalf/styles.css';
```

Por qué así:

- Un solo build de Tailwind en la app. Sin clases duplicadas ni conflictos de especificidad.
- El consumidor puede sobrescribir tokens (`--primary`, `--radius`…) como hoy.
- `cn()`/`tailwind-merge` siguen funcionando con las clases del consumidor.

**Se escanea el JS compilado, no el código fuente.** `@source '../components'` resuelve igual desde `src/styles` y desde `dist/styles`, así que el paquete publica solo `dist/`. Se comparó el CSS generado de las dos formas:

- Escaneando `dist/` desaparecen falsos positivos que salían de comentarios (`ring`, `invisible`, `container`…).
- Se corrige un bug que ya existía: varias primitivas de shadcn escriben `[class*=\'size-\']` con comillas escapadas, y al escanear el fuente Tailwind generaba la regla con las barras incluidas, sin aplicar a nada (tamaño de iconos en tabs, menubar, navigation-menu…). En el JS compilado la clase sale bien.

**Coste conocido:** Tailwind genera las clases de todos los componentes del paquete, se usen o no. En la prueba de humo el CSS de la app ocupa 129 KB (21 KB con gzip). Si pesa, se puede afinar más adelante con `@source` por carpeta.

Qué **no** entra en el CSS del paquete: el `@import` de Google Fonts (cada app decide cómo cargar Inter), los estilos de Shiki/`.prose` y `@plugin '@tailwindcss/typography'`. Todo eso se queda en `apps/docs`.

_Alternativa descartada:_ publicar un CSS precompilado con todas las clases. Duplica utilidades con el Tailwind de la app y hace muy difícil sobrescribir estilos.

### D4. Dependencias: `peerDependencies` vs `dependencies`

| Tipo                          | Paquetes                                                                                                                                                      | Razón                                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `peerDependencies`            | `vue ^3.5`, `tailwindcss ^4`                                                                                                                                  | Debe haber una sola instancia en la app.                                                                                                                             |
| `peerDependencies` opcionales | `@unovis/vue`, `@unovis/ts`, `@tanstack/vue-table`, `vee-validate`, `embla-carousel-vue`, `embla-carousel`, `vaul-vue`, `vue-input-otp`                       | Solo los usan primitivas sueltas de `/ui` (chart, table, form, carousel, drawer, input-otp), nunca el entry principal. Solo los instala quien importa esa primitiva. |
| `dependencies`                | `reka-ui`, `@vueuse/core`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-vue-next`, `@internationalized/date`, `vue-sonner`, `tw-animate-css` | Los usa el entry principal. Son detalles de implementación: el consumidor no debería tener que alinear sus versiones.                                                |

`zod` y `@vee-validate/zod` se quitaron: ningún archivo los importaba.

**`reka-ui` no se expone.** La regla actual ("importa desde `ui/`, nunca desde `reka-ui`") pasa a valer también para el consumidor. Si un tipo de Reka hace falta en la API pública, se re-exporta desde el paquete.

### D5. Integración con Nuxt: módulo opcional `@unergy/gandalf/nuxt`

```ts
// nuxt.config.ts del consumidor
export default defineNuxtConfig({
  modules: ['@unergy/gandalf/nuxt'],
  css: ['~/assets/css/main.css'], // que importa tailwindcss + gandalf styles.css
})
```

El módulo:

1. Registra los componentes `G*` como auto-imports (`addComponent` por cada export del barrel), así se pueden usar sin `import`.
2. Registra el plugin `provideSSRWidth` (lo que hoy hace `app/plugins/ssr-width.ts`).
3. Añade `@unergy/gandalf` a `build.transpile` si hace falta para SSR.

En una app Vue sin Nuxt se importa de forma explícita y el módulo no se usa.

### D6. API pública: qué se exporta

- **Entry principal `@unergy/gandalf`**: todos los componentes `G*` de `base/` y `kit/`, sus `*Variants` de CVA, sus tipos (`GandalfBadgeColor`…), `Option` y `cn`. Los kits de combobox y select tienen helpers internos con el mismo nombre (`flatten`, `isGroup`, `toGroups`), así que de esos dos solo se exportan el componente y sus tipos.
- **Subpaths `@unergy/gandalf/ui/<primitiva>`**: las primitivas shadcn, una por subpath (`@unergy/gandalf/ui/button`, `/ui/input`…), para casos donde todavía no existe un `G*`. Es el mismo formato que `@/components/ui/button` en shadcn, así que migrar es buscar y reemplazar, y no hay choques de nombres entre primitivas. Se documenta como API de _escape hatch_, sin garantía de estabilidad entre minors.
- No hacen falta subpaths aparte para chart, table o form: ya son primitivas sueltas (`/ui/chart`, `/ui/table`, `/ui/form`) y el entry principal no las importa.

```jsonc
// packages/gandalf/package.json (extracto)
{
  "name": "@unergy/gandalf",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "files": ["dist"],
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./ui/*": {
      "types": "./dist/components/ui/*/index.d.ts",
      "import": "./dist/components/ui/*/index.js",
    },
    "./styles.css": "./dist/styles/index.css",
    "./tokens.css": "./dist/styles/tokens.css",
  },
}
```

La entrada `./nuxt` se añade en la fase 3.

### D7. Registro: npmjs.com, público, scope `@unergy`

La prioridad es que la librería sea **fácil de instalar** en cualquier app, CI o deploy. Se compararon tres opciones:

| Opción                 | Acceso para instalar                  | Coste                                  | Fricción                                                                       |
| ---------------------- | ------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| **npmjs.com, público** | Cualquiera: `bun add @unergy/gandalf` | Gratis                                 | Ninguna: sin tokens ni `.npmrc` en local, CI, Vercel…                          |
| npmjs.com, privado     | Solo los miembros de la org en npm    | Plan Teams, se paga por usuario al mes | Un token en cada máquina, CI y deploy                                          |
| GitHub Packages        | Solo los miembros de la org en GitHub | Incluido                               | Un token incluso para paquetes públicos, y un `.npmrc` en cada repo consumidor |

**Decisión: npmjs.com, público.** Es la única opción sin pasos de autenticación para quien instala.

Que el código compilado quede visible para cualquiera no supone un riesgo real, porque `gandalf/` no lleva lógica de negocio por regla del repo: son componentes de UI y tokens de diseño. Para dejar claro que no es de uso libre, el paquete se publica con `"license": "UNLICENSED"`. Si en algún momento se quiere abrir como open source, basta con cambiar la licencia.

La org `unergy` en npmjs.com ya existe y pertenece a Unergy.

Cómo se configura:

- **Publicar desde CI con _trusted publishing_ (OIDC):** en la configuración del paquete en npmjs.com se autoriza el workflow `release.yml` del repo `unergy/gandalf`. La Action publica con `permissions: id-token: write`, sin guardar ningún `NPM_TOKEN` como secreto, y npm añade _provenance_ (la prueba de qué commit y qué workflow generaron cada versión).
- **Primera publicación:** _trusted publishing_ solo se configura sobre un paquete que ya existe, así que la `0.1.0` la publica a mano una persona de la org (`npm publish --access public`). Desde la siguiente versión publica solo el CI.
- **Quién puede publicar:** el equipo `developers` de la org en npm, con 2FA obligatorio. En el día a día nadie publica a mano.
- **Instalar:** sin configuración. Basta con `bun add @unergy/gandalf`.

En `packages/gandalf/package.json`:

```jsonc
{
  "license": "UNLICENSED",
  "publishConfig": { "access": "public", "provenance": true },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/unergy/gandalf.git",
    "directory": "packages/gandalf",
  },
}
```

### D8. Versionado y releases: Changesets + SemVer

- `@changesets/cli` en la raíz. Cada PR que toque `packages/gandalf` incluye un changeset.
- Una GitHub Action en `main` abre el PR "Version Packages" y, al hacer merge, publica en npmjs.com (con _trusted publishing_, ver D7) y crea el tag y el GitHub Release.
- `content/docs/changelog.md` se genera a partir del `CHANGELOG.md` del paquete.
- Mientras sea `0.x`, un _minor_ puede romper la API. Desde `1.0.0` se aplica SemVer estricto: cambiar props, slots o eventos de un `G*` es un _major_.

## 5. Calidad y CI

Pipeline en cada PR (`.github/workflows/ci.yml`). Desde la fase 2 ya corren el build, `lint:package` (`publint` + `attw`) y la prueba de humo con `fixtures/vue-vite` (`bun run test:smoke`). Lint, format y typecheck se añaden cuando se limpien los avisos que ya existían en `main`.

Pipeline completo:

1. `bun install --frozen-lockfile`
2. `bun run lint` y `bun run format:check`
3. `bun run typecheck` (`vue-tsc --noEmit` en el paquete)
4. `bun run build` del paquete
5. **Smoke test de consumo**: `npm pack` del paquete, instalarlo en `fixtures/vue-vite` y en `fixtures/nuxt`, compilar los dos y comprobar que renderizan `GBadge`, `GCombobox` y `GKitDatePicker`.
6. `publint` y `@arethetypeswrong/cli` sobre el tarball, para validar `exports` y tipos.
7. Build de `apps/docs` contra el paquete del workspace.

Tests unitarios (Vitest + `@vue/test-utils`): mínimo uno por componente de `kit/` y por cada componente con `v-model`. No bloquea la v0.1 del paquete, pero sí la 1.0.

## 6. Plan de migración por fases

| Fase                  | Entregable                                                                                                                                                                   | Criterio de salida                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **0. Preparación** ✅ | Arreglar `@unovis/vue` en las dependencias. Pasar `types.d.ts` a `types.ts`. Separar `tailwind.css` en `tokens.css` (paquete) y `tailwind.css` (web).                        | `bun build` de la web sigue pasando y no hay diferencias visuales.                                   |
| **1. Monorepo** ✅    | Mover a `packages/gandalf` y `apps/docs` con `git mv` (para conservar el historial). Workspaces de Bun. La web de docs importa desde `@unergy/gandalf`.                      | La web de docs funciona igual consumiendo el workspace.                                              |
| **2. Build** ✅       | `vite.config.ts` de librería, barrel `index.ts`, subpaths y `exports`. Generación de `.d.ts`.                                                                                | `publint` y `attw` limpios. El smoke test con Vue+Vite pasa.                                         |
| **3. Nuxt**           | Módulo `@unergy/gandalf/nuxt` con auto-imports y el plugin de SSR width.                                                                                                     | El smoke test con Nuxt pasa con y sin el módulo.                                                     |
| **4. Release**        | Changesets, workflow de publicación con _trusted publishing_. Primera publicación manual de la `0.1.0`.                                                                      | El paquete se instala desde el registro en una app limpia.                                           |
| **5. Docs**           | Reescribir `installation.md` (instalación por npm), actualizar el README, `copilot-instructions.md`, `gandalf.instructions.md` y `skills.md` con las nuevas rutas de import. | Una persona nueva instala y usa un componente siguiendo solo la doc.                                 |
| **6. Piloto**         | Migrar una app consumidora real (proponer cuál).                                                                                                                             | La app sustituye las carpetas copiadas por el paquete, sin regresiones visuales. Se publica `1.0.0`. |

## 7. Cambios en las convenciones del repo

- **Las rutas cambian:** `app/components/gandalf/base/x/` pasa a `packages/gandalf/src/components/base/x/`. Hay que actualizar el README, `.github/instructions/*` y las skills de Copilot.
- **Nueva regla:** todo componente nuevo se exporta desde el barrel `src/index.ts`. Si no se exporta ahí, no es API pública.
- **Nueva regla:** los cambios en `src/` necesitan un changeset (lo verifica el CI).
- La regla "no edites `ui/`" se mantiene. Para actualizar shadcn se sigue usando su CLI, ahora apuntando a `packages/gandalf` en `components.json`.

## 8. Riesgos

| Riesgo                                                                                                                                   | Mitigación                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| El `@source` de Tailwind no encuentra las clases dentro de `node_modules` en algún setup (pnpm con symlinks, monorepos de consumidores). | Smoke tests con bun, npm y pnpm. Documentar el `@source` manual como respaldo.                                                                 |
| Clases construidas dinámicamente (por ejemplo `text-${color}`) que Tailwind no detecta.                                                  | Revisarlas en la fase 0. En `GBadge` ya están escritas completas en el objeto `colors`, que es el patrón correcto. Hacer lo mismo en el resto. |
| Instancias duplicadas de `reka-ui` si una app también lo instala directo (rompe `provide`/`inject`).                                     | Documentarlo. Considerar mover `reka-ui` a peer si aparece el problema en el piloto.                                                           |
| Diferencias de hidratación SSR en Nuxt por `useMediaQuery`.                                                                              | El módulo registra `provideSSRWidth`. Cubrir el sidebar en el smoke test de Nuxt.                                                              |
| Alguien publica una versión rota o maliciosa a mano.                                                                                     | Solo publica el CI con _trusted publishing_, 2FA obligatorio en la org y _provenance_ en cada versión.                                         |
| Las apps que ya copiaron y modificaron componentes no pueden migrar 1:1.                                                                 | Inventariar las diferencias en el piloto. Lo que sea genérico se sube al paquete como variant o slot.                                          |

## 9. Métricas de éxito

- Instalar Gandalf en una app nueva lleva **menos de 5 minutos** y tres pasos (instalar, importar el CSS, añadir el módulo).
- El 100 % de los componentes listados en la doc se importan desde el paquete.
- Un fix publicado llega a una app con un solo `bun update @unergy/gandalf`.
- A los 3 meses de la 1.0, ninguna app activa de Unergy mantiene copias locales de `gandalf/`.

## 10. Guía de migración para apps consumidoras (borrador)

1. Ejecutar `bun add @unergy/gandalf`.
2. Añadir `@import '@unergy/gandalf/styles.css';` después de `@import 'tailwindcss';`. Borrar los tokens duplicados del CSS local, **salvo los overrides intencionales**.
3. En Nuxt, añadir `'@unergy/gandalf/nuxt'` a `modules` y quitar `shadcn-nuxt` si solo se usaba por Gandalf.
4. Reemplazar `@/components/gandalf/...` por `@unergy/gandalf` (con un _codemod_ simple de buscar y reemplazar).
5. Borrar `app/components/gandalf/` y las primitivas de `app/components/ui/` que ya vienen en el paquete.
6. Hacer QA visual de las pantallas principales.

## 11. Decisiones tomadas

| Tema                 | Decisión                                                                                                                                             | Por qué                                                                                                                                                                                                                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nombre**           | `@unergy/gandalf`                                                                                                                                    | El nombre del proyecto es "gandalf". El nombre `gandalf` sin scope ya existe en npm, y la org `unergy` es de Unergy. Si en el futuro se hace un CLI, se llamará `@unergy/gandalf-cli`.                                                                                                                                |
| **Registro**         | npmjs.com, público, con licencia `UNLICENSED`                                                                                                        | Ver D7.                                                                                                                                                                                                                                                                                                               |
| **Primitivas `ui/`** | Se publican en el subpath `@unergy/gandalf/ui`, marcadas como _escape hatch_                                                                         | Hoy hay unas 60 primitivas y menos de 30 componentes `G*`. Si se dejan internas, cualquier app que necesite un `Sheet` o un `Slider` tendría que volver a copiar archivos, que es justo lo que este cambio quiere eliminar. Como no tienen garantía de estabilidad entre minors, cuando exista el `G*` se migra a él. |
| **Vue sin Nuxt**     | La librería se mantiene en Vue puro y el módulo Nuxt es opcional. Se dan soporte oficial y QA a Nuxt 4.                                              | Los componentes ya no dependen de Nuxt, así que mantenerlo no cuesta nada. Basta un smoke test con Vue+Vite para no romperlo sin darse cuenta.                                                                                                                                                                        |
| **Fuente Inter**     | Fuera del paquete. La doc recomienda `@nuxt/fonts` en Nuxt o `@fontsource-variable/inter` en Vue.                                                    | El `@import` actual de Google Fonts bloquea el render y cada app ya decide cómo cargar sus fuentes. El paquete solo declara `--font-sans` con Inter primero y sus fallbacks.                                                                                                                                          |
| **App piloto**       | Una app Nuxt 4 que **ya tenga copias de `gandalf/`**, que esté en desarrollo activo y que no tenga ninguna entrega crítica en las próximas 4 semanas | Así se valida el caso real de migración (copias locales a paquete), no solo una instalación en limpio. El equipo de producto elige la app concreta.                                                                                                                                                                   |

## 12. Preguntas abiertas

Ninguna que bloquee la fase 0. Solo falta que producto nombre la app piloto antes de la fase 6.
