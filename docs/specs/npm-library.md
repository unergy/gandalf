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

- `build.lib` con varios entries (`index`, `nuxt/module`) y salida **solo ESM**.
- `preserveModules: true` para que el _tree-shaking_ funcione componente a componente.
- `resolve.alias: { '@': './src' }` en el build. Rollup reescribe `@/` a rutas relativas en la salida.
- `vite-plugin-dts` (con `vue-tsc`) genera los `.d.ts`, incluidos los tipos de props de los SFC.
- `rollupOptions.external`: todas las `peerDependencies` y `dependencies` (expresión regular sobre `vue`, `reka-ui`, `@vueuse/*`, etc.).

_Alternativa:_ `unbuild` + `mkdist`, que publica los `.vue` sin compilar. Es más simple, pero obliga al consumidor a compilar SFC de `node_modules` y los tipos son menos fiables. Se descarta.

### D3. CSS: Tailwind v4 escanea el paquete (no se publica CSS compilado)

El paquete publica `@unergy/gandalf/styles.css`:

```css
/* packages/gandalf/src/styles/index.css */
@import 'tw-animate-css';
@import 'vue-sonner/style.css';
@import './tokens.css';
@source '../'; /* el Tailwind del consumidor escanea los componentes del paquete */
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

Qué **no** entra en el CSS del paquete: el `@import` de Google Fonts (cada app decide cómo cargar Inter), los estilos de Shiki/`.prose` y `@plugin '@tailwindcss/typography'`. Todo eso se queda en `apps/docs`.

_Alternativa descartada:_ publicar un CSS precompilado con todas las clases. Duplica utilidades con el Tailwind de la app y hace muy difícil sobrescribir estilos.

### D4. Dependencias: `peerDependencies` vs `dependencies`

| Tipo                                                   | Paquetes                                                                                                                                                                                                         | Razón                                                                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `peerDependencies`                                     | `vue ^3.5`, `tailwindcss ^4`                                                                                                                                                                                     | Debe haber una sola instancia en la app.                                                  |
| `peerDependencies` opcionales (`peerDependenciesMeta`) | `nuxt ^4`, `@unovis/vue`, `@tanstack/vue-table`, `vee-validate`, `@vee-validate/zod`, `zod`                                                                                                                      | Solo hacen falta si se usa `chart`, `table`, `form` o el módulo Nuxt.                     |
| `dependencies`                                         | `reka-ui`, `@vueuse/core`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-vue-next`, `@internationalized/date`, `vaul-vue`, `vue-sonner`, `vue-input-otp`, `embla-carousel-vue`, `tw-animate-css` | Son detalles de implementación. El consumidor no debería tener que alinear sus versiones. |

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
- **Subpaths opcionales** para lo que trae peers pesados: `@unergy/gandalf/chart`, `/table`, `/form`. Así el entry principal no exige `@unovis/vue` ni `vee-validate`.

```jsonc
// packages/gandalf/package.json (extracto)
{
  "name": "@unergy/gandalf",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./ui/*": { "types": "./dist/ui/*/index.d.ts", "import": "./dist/ui/*/index.js" },
    "./chart": { "types": "./dist/chart/index.d.ts", "import": "./dist/chart/index.js" },
    "./table": { "types": "./dist/table/index.d.ts", "import": "./dist/table/index.js" },
    "./form": { "types": "./dist/form/index.d.ts", "import": "./dist/form/index.js" },
    "./nuxt": { "types": "./dist/nuxt/module.d.ts", "import": "./dist/nuxt/module.js" },
    "./styles.css": "./src/styles/index.css",
    "./tokens.css": "./src/styles/tokens.css",
  },
  "files": ["dist", "src/styles", "src/components"],
}
```

`src/components` se incluye en `files` porque el `@source` de D3 necesita el código fuente para que Tailwind encuentre las clases. Otra opción es apuntar `@source` a `dist/`; hay que comprobarlo en la fase 2 y quedarse con la que genere menos ruido.

### D7. Registro: GitHub Packages, scope `@unergy`

La librería es de uso interno, así que el registro tiene que ser **privado**. Se compararon tres opciones:

| Opción                                   | Privado | Coste                                   | Acceso                                                                                          | Encaje                                             |
| ---------------------------------------- | ------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **GitHub Packages**                      | Sí      | Incluido en el plan de GitHub de la org | Con los mismos permisos de la org `unergy`: quien tiene acceso al repo, tiene acceso al paquete | El código, el CI y los permisos ya están en GitHub |
| npmjs, org privada                       | Sí      | Se paga por usuario y al mes            | Hay que gestionar una segunda lista de usuarios en npmjs                                        | Duplica la gestión de accesos                      |
| Registro propio (Verdaccio, Artifactory) | Sí      | Infraestructura propia                  | Hay que mantenerlo                                                                              | Desproporcionado para un solo paquete              |

**Recomendación: GitHub Packages.** El repo ya vive en `github.com/unergy`. Quien entra o sale de la org gana o pierde el acceso al paquete automáticamente, sin coste extra ni otra cuenta que administrar.

Cómo se configura:

- **Publicar:** la Action de release usa el `GITHUB_TOKEN` del propio repo con `permissions: packages: write`. No hace falta un token personal.
- **CI de las apps:** en la configuración del paquete, en _Manage Actions access_, se da acceso de lectura a cada repo consumidor. Con eso su `GITHUB_TOKEN` puede instalar el paquete sin secretos adicionales.
- **Local:** cada dev crea una vez un token (_classic_, scope `read:packages`) y lo exporta como `GITHUB_TOKEN`. Cada repo consumidor versiona este `.npmrc`, que no contiene secretos:

  ```ini
  @unergy:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```

- **Deploys fuera de GitHub** (Vercel, Netlify…): se añade el mismo token como variable de entorno del proyecto. Para no depender de una persona, conviene usar un usuario de servicio de la org.

El coste de esta opción es el paso del token local. Se documenta en `installation.md` con capturas de pantalla.

### D8. Versionado y releases: Changesets + SemVer

- `@changesets/cli` en la raíz. Cada PR que toque `packages/gandalf` incluye un changeset.
- Una GitHub Action en `main` abre el PR "Version Packages" y, al hacer merge, publica en el registro y crea el tag y el GitHub Release.
- `content/docs/changelog.md` se genera a partir del `CHANGELOG.md` del paquete.
- Mientras sea `0.x`, un _minor_ puede romper la API. Desde `1.0.0` se aplica SemVer estricto: cambiar props, slots o eventos de un `G*` es un _major_.

## 5. Calidad y CI

Pipeline en cada PR (`.github/workflows/ci.yml`):

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
| **2. Build**          | `vite.config.ts` de librería, barrel `index.ts`, subpaths y `exports`. Generación de `.d.ts`.                                                                                | `publint` y `attw` limpios. El smoke test con Vue+Vite pasa.                                         |
| **3. Nuxt**           | Módulo `@unergy/gandalf/nuxt` con auto-imports y el plugin de SSR width.                                                                                                     | El smoke test con Nuxt pasa con y sin el módulo.                                                     |
| **4. Release**        | Changesets, workflow de publicación, `.npmrc` documentado. Publicar `0.1.0`.                                                                                                 | El paquete se instala desde el registro en una app limpia.                                           |
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
| Fricción de autenticación con GitHub Packages en CI y en local.                                                                          | Guía paso a paso y un secreto compartido de org. Volver a evaluar npmjs privado (D7).                                                          |
| Las apps que ya copiaron y modificaron componentes no pueden migrar 1:1.                                                                 | Inventariar las diferencias en el piloto. Lo que sea genérico se sube al paquete como variant o slot.                                          |

## 9. Métricas de éxito

- Instalar Gandalf en una app nueva lleva **menos de 5 minutos** y tres pasos (instalar, importar el CSS, añadir el módulo).
- El 100 % de los componentes listados en la doc se importan desde el paquete.
- Un fix publicado llega a una app con un solo `bun update @unergy/gandalf`.
- A los 3 meses de la 1.0, ninguna app activa de Unergy mantiene copias locales de `gandalf/`.

## 10. Guía de migración para apps consumidoras (borrador)

1. Configurar el `.npmrc` del registro y ejecutar `bun add @unergy/gandalf`.
2. Añadir `@import '@unergy/gandalf/styles.css';` después de `@import 'tailwindcss';`. Borrar los tokens duplicados del CSS local, **salvo los overrides intencionales**.
3. En Nuxt, añadir `'@unergy/gandalf/nuxt'` a `modules` y quitar `shadcn-nuxt` si solo se usaba por Gandalf.
4. Reemplazar `@/components/gandalf/...` por `@unergy/gandalf` (con un _codemod_ simple de buscar y reemplazar).
5. Borrar `app/components/gandalf/` y las primitivas de `app/components/ui/` que ya vienen en el paquete.
6. Hacer QA visual de las pantallas principales.

## 11. Decisiones tomadas

| Tema                 | Decisión                                                                                                                                             | Por qué                                                                                                                                                                                                                                                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nombre**           | `@unergy/gandalf`                                                                                                                                    | El nombre del proyecto es "gandalf". El scope `@unergy` es obligatorio en GitHub Packages, así que no hay riesgo de chocar con el paquete público `gandalf` de npm. Si en el futuro se hace un CLI, se llamará `@unergy/gandalf-cli`.                                                                                 |
| **Registro**         | GitHub Packages                                                                                                                                      | Ver D7.                                                                                                                                                                                                                                                                                                               |
| **Primitivas `ui/`** | Se publican en el subpath `@unergy/gandalf/ui`, marcadas como _escape hatch_                                                                         | Hoy hay unas 60 primitivas y menos de 30 componentes `G*`. Si se dejan internas, cualquier app que necesite un `Sheet` o un `Slider` tendría que volver a copiar archivos, que es justo lo que este cambio quiere eliminar. Como no tienen garantía de estabilidad entre minors, cuando exista el `G*` se migra a él. |
| **Vue sin Nuxt**     | La librería se mantiene en Vue puro y el módulo Nuxt es opcional. Se dan soporte oficial y QA a Nuxt 4.                                              | Los componentes ya no dependen de Nuxt, así que mantenerlo no cuesta nada. Basta un smoke test con Vue+Vite para no romperlo sin darse cuenta.                                                                                                                                                                        |
| **Fuente Inter**     | Fuera del paquete. La doc recomienda `@nuxt/fonts` en Nuxt o `@fontsource-variable/inter` en Vue.                                                    | El `@import` actual de Google Fonts bloquea el render y cada app ya decide cómo cargar sus fuentes. El paquete solo declara `--font-sans` con Inter primero y sus fallbacks.                                                                                                                                          |
| **App piloto**       | Una app Nuxt 4 que **ya tenga copias de `gandalf/`**, que esté en desarrollo activo y que no tenga ninguna entrega crítica en las próximas 4 semanas | Así se valida el caso real de migración (copias locales a paquete), no solo una instalación en limpio. El equipo de producto elige la app concreta.                                                                                                                                                                   |

## 12. Preguntas abiertas

Ninguna que bloquee la fase 0. Solo falta que producto nombre la app piloto antes de la fase 6.
