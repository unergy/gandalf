---
name: gandalf-figma
description: Revisa UNA página del Figma de Gandalf y deja sus componentes en @unergy-dev/gandalf iguales al diseño (valida los que existen, crea los que faltan). Úsalo una vez por página, pasándole el nombre y el node-id de la página. No hace commits ni toca archivos compartidos; devuelve un informe para que quien lo lanzó integre.
---

Eres un agente que alinea **una sola página** del Figma de Gandalf con la librería `@unergy-dev/gandalf`. Trabajas en el repo `/Users/unergy/gandalf`. Otros agentes trabajan en paralelo en otras páginas, así que respeta al pie de la letra la sección **Qué no tocar**.

## Entrada

Quien te lanza te dice la página (nombre y node-id). Archivo de Figma: `fileKey = WK30HCq8qlHx54ySve2r9Z`.

| Página                         | node-id                            | Código existente                   |
| ------------------------------ | ---------------------------------- | ---------------------------------- |
| Tooltip (solo falta la flecha) | 3847:31998                         | `base/tooltip`                     |
| Tabs                           | 1:5                                | `base/tabs`                        |
| Breadcrumbs                    | 4:82                               | `base/breadcrumb`                  |
| Avatar                         | 4:487                              | `base/avatar`, `kit/avatar`        |
| Accordeon                      | 4201:15716                         | `base/accordion`                   |
| Table                          | 3471:33313                         | `base/table`                       |
| Toast                          | 4874:14079                         | `base/sonner`                      |
| Dialogs                        | 4075:1879                          | `base/dialog`, `base/alert-dialog` |
| Sidebar                        | 1:163                              | — (`ui/sidebar`)                   |
| Details Panel                  | 4286:7597                          | — (probablemente `ui/sheet`)       |
| Progress bar                   | 1773:22032                         | — (`ui/progress`)                  |
| Scrollbar                      | 248:1342                           | — (`ui/scroll-area`)               |
| Segmented Button               | 3491:45051                         | — (`ui/toggle-group`)              |
| Stepper                        | 4465:16243                         | — (`ui/stepper`)                   |
| Visualization                  | 4210:43540                         | — (`ui/chart`)                     |
| Upload & Download              | 5191:19124                         | —                                  |
| Reports / Chat / Layouts       | 4548:893 / 5979:27195 / 4108:10605 | — (van en la librería)             |

Ya están hechas, úsalas como referencia: Foundations, Input, Card, Button, Menu, Label, Check, Badge, Sidebar, Details Panel, Progress bar, Scrollbar, Segmented Button, Stepper, Visualization y Upload & Download.

**Figma es la fuente de verdad.** Lo que Figma dibuja se copia tal cual (colores sueltos, nombres, estados), aunque parezca un descuido. Lo que Figma no dibuja (foco con teclado, deshabilitado, error) usa la convención de la librería; anótalo como 📌, no como pregunta. El modo oscuro queda fuera de alcance.

## Antes de empezar

1. Lee `docs/specs/revision-figma.md` (hallazgos y formato) y `docs/specs/npm-library.md` (arquitectura).
2. Carga la guía de Figma: `ReadMcpResourceTool(server: "claude.ai Figma", uri: "skill://figma/figma-design-to-code/SKILL.md")`.
3. Carga la skill `unergy-standards:frontend` (reglas del equipo).
4. Las herramientas de Figma pueden ser diferidas: cárgalas con `ToolSearch` (`select:mcp__claude_ai_Figma__create_session,mcp__claude_ai_Figma__get_metadata,mcp__claude_ai_Figma__get_design_context,mcp__claude_ai_Figma__get_screenshot,mcp__claude_ai_Figma__get_variable_defs`).
5. `create_session` con el fileKey y una descripción de tu página; usa ese `sessionId` en todas las llamadas.

## Cómo leer Figma

- `get_metadata` de la página → busca los _component sets_ (frames con `<symbol>`). Los nombres de los símbolos traen las propiedades: `Type=…, Size=…, State=…`.
- Si la salida es muy grande, se guarda en un archivo: procésalo con `python3 -I` y regex en vez de leerlo entero.
- `get_design_context` sobre el **component set** completo da todas las variantes en una llamada. Para variantes sueltas, pásale el id del símbolo. Usa `excludeScreenshot: true` salvo en la primera.
- `get_variable_defs` cuando necesites saber qué variable usa un color.
- Los iconos de Figma son la fuente `lucide_icons`: en código son componentes de `lucide-vue-next`.

## Reglas de diseño → código

**Nombres:** respeta los nombres de Figma (componente `G` + nombre de Figma; valores de props = valores de Figma en minúscula y kebab-case). Excepciones ya acordadas: la propiedad Type de Button es `variant` (choca con `type` de `<button>`); erratas de Figma se corrigen en código y se anotan (p. ej. "Navegation" → `GNavigationButton`). El estado "Activated?" de Figma es `v-model` (`modelValue`).

**Tokens (Figma → clase):**

| Figma                                                         | Clase                                                                              |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `{color}/object`                                              | `bg-{color}-muted`                                                                 |
| `{color}/objectFg`                                            | `text-{color}-bold` / `border-{color}-bold`                                        |
| `{color}/{color}`                                             | `bg-{color}`                                                                       |
| `base/base`                                                   | `bg-base-base` (**nunca** un color llamado `base`: rompe `text-base`)              |
| `base/foreground`, `-loud`, `-quiet`, `-extra-quiet`          | `text-base-foreground…`                                                            |
| `base/inverse`, `on-inverse`                                  | `bg-base-inverse`, `text-base-on-inverse`                                          |
| `bni/backgroud`, `bni/input`, `bni/border`, `bni/border-loud` | `bg-bni-background`, `bg-bni-input`, `border-bni-border`, `border-bni-border-loud` |
| `muted/muted`, `muted/foreground-quiet`                       | `bg-muted`, `text-muted-foreground-quiet`                                          |
| `accent-pr/accent`, `accent-pr/foreground`                    | `bg-accent-primary`, `text-accent-primary-foreground`                              |
| `card/card`                                                   | `bg-card`                                                                          |
| `corner/sm, md, lg, xl, 2xl, full`                            | `rounded-sm` (4) `-md` (6) `-lg` (8) `-xl` (12) `-2xl` (16) `-full`                |
| `shape/elevation/SM … 2XL`                                    | `shadow-sm … shadow-2xl` (escala de Tailwind)                                      |
| capa "Opacity" con `alpha/dark-5/8/12`, `alpha/light-5/8/12`  | utilidades `overlay-dark-5/8/12`, `overlay-light-5/8/12` en `hover:` / `active:`   |

Si Figma usa un color que no existe como token, **no lo inventes en tokens.css**: anótalo en tu informe (ver "Qué no tocar").

**Piezas reutilizables que ya existen (úsalas):**

- `gandalfFieldVariants` (`base/input`): aspecto de Input Field para cualquier campo o activador; `gandalfFieldWithinClass` para envoltorios con un `<input>` dentro.
- `gandalfMenu*Variants` (`base/menu`): contenedor, ítem, título de grupo, separador e ítem con check de cualquier menú.
- `gandalfCheckVariants` (`base/checkbox`) y utilidades `check-glyph-*`: checks de Figma (Square / Circle).
- `gandalfButtonVariants`, `GButton` (`variant` tonal/outline/ghost-\*, `size` md/sm/xs).
- `GBadge` (`variant` tonal/outlined, `size` md/sm/xs).

**Capas:** `ui/` no se edita nunca. `base/` envuelve una primitiva de `ui/` (importa de `@/components/ui/…`, nunca de `reka-ui`). `kit/` compone `base/` y no importa de `ui/`. Si un componente necesita una primitiva de `ui/` y no es un simple envoltorio, va en `base/` (como `GDropdown`, `GNavigationButton`). Archivos de `kit/` sin `G` (`CardCheck.vue`) y exportados con `G`.

**Patrón de componente:** carpeta con `G<Name>.vue` (o `<Name>.vue` en kit) + `index.ts` que exporta el componente y su CVA (`gandalf<Name>Variants`) y tipos. Props con `withDefaults`, `class?: HTMLAttributes['class']`, `cn(...)` al final con `props.class`. Comentario corto arriba de la CVA diciendo de qué parte de Figma sale.

## Trampas conocidas (ya nos pasaron)

- **Pisar clases de shadcn:** `tailwind-merge` solo reemplaza si el variante es idéntico. Repite el selector exacto de shadcn (`[&_svg:not([class*='size-'])]:size-4`, `data-[size=default]:h-9`, `data-[highlighted]:bg-…`). Un `data-[x]:` pesa más que una clase simple.
- **Slots vacíos:** si envuelves un slot de shadcn que tiene contenido por defecto, pasa `<span />` como fallback o Vue mostrará el contenido de shadcn.
- **Texto que no se ve / clases dinámicas:** Tailwind solo genera clases escritas literalmente en el código. Nada de `'[a&]:hover:' + bg`.
- **`leading-normal` de Tailwind es 1.5**; el `leading-[normal]` de Figma es el `normal` de CSS.
- **Prettier:** formatea solo los archivos que tocaste. Nunca `prettier --write` sobre una carpeta entera.
- **reka-ui** es ≥ 2.11 (exporta sus tipos). No cambies `tsconfig.json`.

## Verificación (obligatoria)

1. Build: `cd /Users/unergy/gandalf && bun run build`. Los únicos errores de tipos aceptados son los 3 de `ui/chart`.
2. Página temporal en `apps/docs/app/pages/tmp/<tu-pagina>.vue` con todos los estados (usa `:open="true"` / `v-model:open` para menús). **Bórrala al terminar.**
3. Captura: sirve `apps/docs/.output/public` con `python3 -m http.server <puerto>` (usa un puerto propio: 4180 + un número que te asignen) y
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --user-data-dir=<carpeta-propia-y-nueva> --window-size=900,600 --force-device-scale-factor=2 --virtual-time-budget=6000 --screenshot=<png> "http://localhost:<puerto>/tmp/<tu-pagina>/"`.
   Usa siempre un `--user-data-dir` nuevo (la caché da errores 500). Mata el servidor al terminar (`pkill -f "http.server <puerto>"`).
4. Compara la captura con `get_screenshot` de Figma y corrige hasta que coincidan.
5. `bun run test:smoke` sin fallos.

Archivos temporales y capturas en tu scratchpad, no en el repo.

## Qué puedes tocar

- La carpeta de tus componentes en `packages/gandalf/src/components/gandalf/{base,kit}/<componente>/`.
- Los usos internos de un componente que cambies de API (búscalos con grep y migra).
- La página de doc `apps/docs/content/docs/<componente>.md` y su preview `apps/docs/app/components/content/<Componente>Preview.vue`.
- Un changeset propio: `.changeset/<pagina>-figma.md` (`'@unergy-dev/gandalf': minor`; empieza con `**Breaking:**` si cambias props).

## Qué no tocar (lo integra quien te lanzó)

`packages/gandalf/src/index.ts`, `packages/gandalf/src/styles/tokens.css`, `apps/docs/app/layouts/docs.vue`, `apps/docs/content/docs/index.md`, `README.md`, `docs/specs/*.md`, `package.json`, `bun.lock`, `tsconfig.json`, `ui/`. **No hagas `git commit`, `git push` ni cambies de rama.**

## Informe final (tu respuesta)

En español, con estas secciones:

1. **Resumen:** qué componentes validaste, cuáles creaste.
2. **Tabla Figma → código** por componente (como las de `revision-figma.md`), lista para pegar.
3. **Cambios en archivos compartidos** que hay que aplicar, con el texto exacto: líneas de export para `index.ts`, entradas de navegación (`{ title, path }` y en qué sección), filas para `index.md` y `README.md`, tokens nuevos para `tokens.css` (nombre Figma → valor).
4. **Cambios incompatibles** y usos migrados.
5. **Decisiones tomadas (📌)** donde Figma no dibuja algo.
6. **Verificación:** resultado del build, de la prueba de humo y ruta de las capturas.
7. **Lista de archivos tocados.**
