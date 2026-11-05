# Revisión de estilos: Figma frente a código

Comparación entre el archivo de Figma [Gandalf](https://www.figma.com/design/WK30HCq8qlHx54ySve2r9Z/Gandalf) y `@unergy/gandalf`. Para cada valor se lee la variable de Figma y se compara con el token o la clase del código.

**Leyenda:** ✅ coincide · 🔧 corregido en esta rama (`fix/figma-styles`) · ❓ hay que decidir · ⏳ sin revisar.

## Estado

| Página de Figma                                                                                                                                                                                          | Estado       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Foundations: colores                                                                                                                                                                                     | ✅ / 🔧      |
| Foundations: tipografía                                                                                                                                                                                  | ✅ / 🔧 / ❓ |
| Foundations: radios                                                                                                                                                                                      | 🔧           |
| Foundations: espaciado                                                                                                                                                                                   | ✅           |
| Foundations: sombras (Elevation)                                                                                                                                                                         | 🔧           |
| Tooltip                                                                                                                                                                                                  | 🔧 / ❓      |
| Input: Input Field (`GInput`)                                                                                                                                                                            | 🔧 / ❓      |
| Input: Text Area (`GTextarea`), Search Field (`GSearchField`)                                                                                                                                            | 🔧           |
| Label (`GLabel`), Check: Square / Circle (`GCheckbox`, `GRadioGroup`)                                                                                                                                    | 🔧           |
| Check: Card Check, Card Toggle Box, Menu Check Item, Star                                                                                                                                                | ⏳           |
| Card: Card Toggle (`GCardToggle`)                                                                                                                                                                        | 🔧           |
| Card: Files Card, Miniature                                                                                                                                                                              | ⏳           |
| Button (`GButton`)                                                                                                                                                                                       | 🔧 / ❓      |
| Menu (`GDropdown`, `GSelect`, `GCombobox` y kits)                                                                                                                                                        | 🔧 / ❓      |
| Table, Sidebar, Tabs, Details Panel, Progress bar, Breadcrumbs, Badge, Scrollbar, Avatar, Visualization, Accordeon, Segmented Button, Stepper, Upload & Download, Toast, Reports, Chat, Dialogs, Layouts | ⏳           |

Desde noviembre de 2026 la revisión se hace con un seat Dev, sin el límite mensual que tenía el seat Collab.

---

## Foundations

### Colores semánticos de Gandalf ✅

`default`, `action`, `information`, `success`, `warning` y `destructive`, en sus tres niveles (base, `-muted`, `-bold`), coinciden con Figma (`{color}/{color}`, `{color}/object`, `{color}/objectFg`). También coinciden `base/*` y `bni/*`.

### Colores base de shadcn 🔧

Los tokens que usan las primitivas de shadcn (`--primary`, `--muted`, `--card`…) tenían los valores grises por defecto de shadcn, no los de Figma. Afectaba a cualquier componente construido sobre `ui/`: botones primarios casi negros en vez del morado de marca, textos negros en vez de `slate-700`, bordes grises neutros en vez de `slate-200`.

| Token                                       | Figma                          | Antes                | Ahora           |
| ------------------------------------------- | ------------------------------ | -------------------- | --------------- |
| `--foreground`                              | `base/foreground` #314158      | #0a0a0a              | #314158         |
| `--primary`                                 | `primary/primary` #2c2039      | #171717              | #2c2039         |
| `--primary-foreground`                      | #ffffff                        | #fafafa              | #ffffff         |
| `--secondary` / `-foreground`               | #f8fafc / #314158              | #f5f5f5 / #171717    | igual que Figma |
| `--muted` / `-foreground`                   | #f1f5f9 / #45556c              | #f5f5f5 / #737373    | igual que Figma |
| `--accent` / `-foreground`                  | #f1f5f9 / #314158              | #f5f5f5 / #171717    | igual que Figma |
| `--card-foreground`, `--popover-foreground` | #314158                        | #0a0a0a              | #314158         |
| `--sidebar-*` (8 tokens)                    | `sidebar/*`                    | grises de shadcn     | igual que Figma |
| `--color-accent-primary-foreground`         | `accent-pr/foreground` #7c33dc | `purple-700` #8200db | #7c33dc         |

Se añadieron tokens que existían en Figma y no en el código: `base-inverse`, `base-on-inverse`, `primary-quiet`, `primary-foreground-loud` y `muted-quiet`.

❓ **Valores deducidos, a confirmar con diseño.** Figma no tiene variables con estos nombres, así que se tomaron de su equivalente más cercano:

- `--border` y `--input`: #e2e8f0, de `bni/border`.
- `--ring`: #c27aff, de `bni/ring` y `sidebar/ring`.

❓ **Modo oscuro.** No se encontraron valores de modo oscuro en Foundations, así que `.dark` sigue con los valores por defecto de shadcn.

### Tipografía

✅ Tamaños y pesos de `Display`, `Heading` y `Body` coinciden con las utilidades `text-display-*`, `text-heading-*` y `text-body-*`. La fuente es Inter.

🔧 `text-action-md` usaba `var(--text-md)`, que no existe en Tailwind: no aplicaba tamaño ni peso. Ahora usa 16px y 600, como `Action/md`. `text-body-sm` no declaraba peso; ahora usa 400, como `Body/sm`.

❓ **Interlineado.** Figma declara `lineHeight: 100` en casi todos los estilos y `1.5` en `Body/md`. Las utilidades del código no fijan interlineado y heredan el de Tailwind (por ejemplo, 16px para 12px de texto). Hay que confirmar si `100` significa 100 % (interlineado igual al tamaño) antes de cambiarlo, porque afectaría a todo el texto.

ℹ️ `text-body-xl` y `text-body-xlEm` existen en el código pero no en Figma.

### Radios 🔧

Figma usa la escala por defecto de Tailwind. El código la sobrescribía con la fórmula de shadcn (`--radius` ± n), que daba entre 2 y 4px más:

| Clase        | Figma | Antes | Ahora |
| ------------ | ----- | ----- | ----- |
| `rounded-sm` | 4px   | 6px   | 4px   |
| `rounded-md` | 6px   | 8px   | 6px   |
| `rounded-lg` | 8px   | 10px  | 8px   |
| `rounded-xl` | 12px  | 14px  | 12px  |

`--radius` pasa de 10px a 8px, el paso `lg`. Lo siguen leyendo Sonner y algunos botones de `ui/input-group`.

### Espaciado ✅

Padding y gap usan la escala de 4px de Tailwind (`p-1` a `p-10`), igual que el código.

### Sombras (Elevation) 🔧

La escala de Figma (`shape/elevation/2XS` … `2XL`) es la de Tailwind por defecto. El código la sobrescribía con los valores de un tema de shadcn, mucho más suaves: por ejemplo, `shadow-2xl` era `0 1px 3px rgb(0 0 0 / 0.25)` en vez de `0 25px 50px -12px rgb(0 0 0 / 0.25)`. Se quitaron esas sobrescrituras, así que `shadow-2xs` … `shadow-2xl` ahora son los de Figma. Los componentes con `shadow-lg`, `shadow-xl` o `shadow-2xl` (popovers, diálogos de shadcn) se ven con más sombra, como en el diseño.

`Shadow/Neutral/M` sigue como `shadow-neutral-md` ✅.

---

## Componentes

### Tooltip (`GTooltipContent`)

| Propiedad                              | Figma                              | Antes                                                  | Ahora                                      |
| -------------------------------------- | ---------------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| Fondo / texto                          | `base/inverse` / `base/on-inverse` | `bg-slate-800` / `text-white` (mismo color, sin token) | `bg-base-inverse` / `text-base-on-inverse` |
| Radio                                  | 12px                               | 14px                                                   | 12px                                       |
| Sombra                                 | `Shadow/Neutral/M`                 | `shadow-md`                                            | `shadow-neutral-md`                        |
| Texto                                  | centrado                           | a la izquierda                                         | centrado                                   |
| Alto mínimo                            | 38px                               | ninguno                                                | 38px                                       |
| Padding, tamaño de texto, ancho máximo | 8px, 12px, 320px                   | igual                                                  | ✅                                         |

❓ **Flecha.** En Figma es un triángulo de 12×8px con la punta recta. En el código es un cuadrado de 10px rotado con la punta redondeada, que viene de `ui/tooltip`. Como `ui/` no se edita, igualarla obliga a que `GTooltipContent` dibuje su propia flecha. Hay que decidir si la diferencia importa.

### Input → Input Field (`GInput`)

`GInput` se creó sin ver Figma y luego se ajustó a la página **Input**. Se revisaron los tres tamaños y los estados normal, hover, foco, deshabilitado, error y error con foco.

| Propiedad          | Figma                                                 | Antes                      | Ahora                                                                                    |
| ------------------ | ----------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| Tamaños            | `xs` 24px · `sm` 32px · `md` 40px                     | `sm` 32px · `default` 36px | `xs` · `sm` · `md` (por defecto `md`)                                                    |
| Texto              | 12 / 14 / 16px                                        | 14px (16px en móvil)       | 12 / 14 / 16px                                                                           |
| Padding horizontal | 8 / 10 / 12px                                         | 12px                       | 8 / 10 / 12px                                                                            |
| Radio              | 8px (`corner/lg`)                                     | 6px                        | 8px                                                                                      |
| Borde              | `bni/border-loud`                                     | `--input` (slate-200)      | `bni-border-loud` (slate-300)                                                            |
| Placeholder        | `base/foreground-extra-quiet`                         | `muted-foreground`         | `base-foreground-extra-quiet`                                                            |
| Hover              | fondo `bni/input`                                     | sin cambio                 | `bni-input`                                                                              |
| Foco               | fondo `bni/input`, borde 2px `base/foreground-quiet`  | halo morado de 3px         | igual que Figma (borde de 1px más anillo interior de 1px, para que el texto no se mueva) |
| Error              | borde `destructive/destructive`; con foco, 2px        | borde `destructive`        | igual que Figma                                                                          |
| Deshabilitado      | fondo `muted`, borde y texto `muted/foreground-quiet` | opacidad 50 %              | igual que Figma                                                                          |
| Sombra             | ninguna                                               | `shadow-xs`                | ninguna                                                                                  |

❓ **Iconos dentro del campo.** En Figma, Input Field tiene iconos opcionales al principio y al final (16 / 14 / 12px según el tamaño). `GInput` no los tiene: hoy se resuelve con `GInputGroup`, que habría que revisar con el mismo diseño. Hay que decidir si `GInput` lleva slots `leading` y `trailing` o si eso queda para `GInputGroup`.

ℹ️ **Label y texto de ayuda.** Figma dibuja el campo completo: label de 14px semibold, asterisco de requerido en `text/contextual/danger` (#c10007) y texto de ayuda de 12px en `base/foreground-extra-quiet` (`destructive` si hay error), con 4px de separación. En el código eso es `GField` + `GLabel`, que faltan por revisar.

### Input → Text Area (`GTextarea`) 🔧

Mismos estados que Input Field (usa la misma CVA), con alto mínimo de 72px y padding de 12px en todos los tamaños. Nueva prop `size` para el texto: `xs` 12px, `sm` 14px, `md` 16px.

### Input → Search Field (`GSearchField`) 🔧

Componente nuevo en `kit/`: campo con lupa al inicio y botón para borrar al final (solo cuando hay texto), `v-model`, evento `clear` y tamaños `md` (40px, 16px), `sm` (32px, 12px) y `xs` (24px, 12px). En `sm` el texto es de 12px, como en Figma (Input Field usa 14px a esa altura).

El buscador dentro de `GKitCombobox` usa este mismo aspecto, como en "Menu & Search" de la página Menu.

### Card

La página **Card** no tiene una tarjeta contenedora genérica como la de shadcn (header, contenido, footer). Tiene tres componentes concretos: **Card Toggle**, **Files Card** y **Miniature**. La tarjeta genérica sigue disponible solo como primitiva (`@unergy/gandalf/ui/card`), sin diseño propio.

#### Card Toggle (`GCardToggle`) 🔧

Componente nuevo en `kit/`, hecho desde Figma. Las props usan los nombres del diseño:

| Figma                    | Código                                                                            |
| ------------------------ | --------------------------------------------------------------------------------- |
| Type=Doble / Type=Report | `type="doble"` / `type="report"` (56px / 40px)                                    |
| Activated?=Yes           | `v-model` (`true`)                                                                |
| Avatar Item              | slot `avatar` + prop `color` (colores semánticos, como en el ejemplo del diálogo) |
| Complementary            | slot `complementary`                                                              |
| State=Hovered / Pressed  | `:hover` / `:active`, con capa `alpha/dark-5` / `alpha/dark-8`                    |

Tokens nuevos tomados de Figma: `alpha-dark-5` y `alpha-dark-8` (`rgb(0 24 86)` al 5 % y al 8 %).

❓ **Foco con teclado:** Figma no lo define; se usa el anillo `ring` estándar.

❓ **`GCheckboxCard`:** marca la selección en azul (`action`), mientras que Card Toggle usa morado (`accent-pr`). Hay que decidir si `GCheckboxCard` se alinea con Card Toggle o si son dos patrones distintos a propósito.

#### Files Card (`GFilesCard`) 🔧

Componente nuevo en `kit/`, hecho desde Figma, con los nombres del diseño:

| Figma                                  | Código                                                         |
| -------------------------------------- | -------------------------------------------------------------- |
| Type=Folder / Type=File                | `type="folder"` (72px) / `type="file"` (192px)                 |
| fileCount ("# Files")                  | prop `fileCount`                                               |
| State=Activated                        | `v-model`                                                      |
| State=Hovered / Pressed                | capas `alpha-dark-5` / `alpha-dark-8`                          |
| Botón de la esquina (Ghost primary xs) | slot `actions`; sus clics no activan la tarjeta                |
| Vista previa ("Icon & Name")           | slot `preview`; por defecto, icono y `extension` en mayúsculas |

Fondo `base/base`, borde `bni/border-loud`, radio de 16px (`corner/2xl`). Activado: `accent-pr/accent` con borde `accent-pr/foreground`.

❓ **Icono en la cabecera de un archivo.** En Figma aparece solo en la variante Hovered de File. Parece un descuido del diseño, así que en el código es opcional (slot `icon`) y no depende del estado.

#### Miniature (`GMiniature`) 🔧

Miniatura seleccionable de 128px (`v-model`, `src`, `alt`). Hover con fondo `base/base-loud`. Activado: el marco se reduce a 104px con borde de 4px `accent-pr/foreground` y fondo `accent-pr/accent`, como en Figma. Sin imagen muestra el fondo `base/inverse` del diseño.

### Button (`GButton`) 🔧

`GButton` era el botón de shadcn sin cambios (variantes `default`, `outline`, `ghost`…). Ahora usa las de Figma:

| Figma                                     | Código                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Type=Tonal primary / action / destructive | `variant="tonal-primary"` (por defecto) / `"tonal-action"` / `"tonal-destructive"`                |
| Type=Outline primary / destructive        | `variant="outline-primary"` / `"outline-destructive"`                                             |
| Type=Ghost primary / action / danger      | `variant="ghost-primary"` / `"ghost-action"` / `"ghost-danger"`                                   |
| Size=md / sm / xs                         | `size="md"` (40px, 16px, gap 12px) / `"sm"` (36px, 14px) / `"xs"` (32px, 14px)                    |
| Alert Dot                                 | prop `alertDot`                                                                                   |
| State=Hovered / Pressed                   | capas `alpha/light-8` / `light-12` en los rellenos; `alpha/dark-8` / `dark-12` en outline y ghost |
| State=Disabled                            | `muted` / `muted/foreground-quiet` (sin opacidad)                                                 |

La propiedad de Figma se llama Type, pero en el código es `variant`, porque `type` es el atributo nativo de `<button>`. Los valores sí son los de Figma.

Tokens nuevos: `alpha-dark-12`, `alpha-light-8` y `alpha-light-12`, y las utilidades `overlay-dark-8`, `overlay-dark-12`, `overlay-light-8` y `overlay-light-12`, que pintan la capa "Opacity" de Figma por debajo del texto.

**Cambio incompatible:** los nombres viejos de shadcn ya no existen en `GButton`. Se migraron los usos internos (`GKitCombobox`, `GKitDatePicker`, `GKitSelect`) y los de la doc.

❓ **Nombres en Figma:** "Ghost danger" usa _danger_ y los demás tipos _destructive_. Se respetó tal cual; diseño puede unificarlo.

🔧 **Activadores de combobox, select y date picker:** ya usan el estilo de Input Field (ver Menu).

🔧 **Floating Button (`GFloatingButton`)**: botón redondo de 44px, blanco, con icono de 18px en `primary`. Sombra 2XL en reposo y XL en hover, presionado y deshabilitado, con las capas `alpha/light-5` y `light-8` (token nuevo `alpha-light-5`).

🔧 **Navegation Buttons (`GNavigationButton`)**: activador con borde `bni/border-loud`, radio de 12px y 57px de alto, que muestra el título y la descripción de la opción elegida, o un icono y una etiqueta en color semántico (variante "Rol", prop `color`). Abre el menú de Menu con ítems de título y descripción, una marca en el actual y líneas entre grupos. Hover y abierto con `alpha/dark-5` / `dark-8` (utilidad nueva `overlay-dark-5`).

❓ **Nombre:** en Figma se llama "Navegation Buttons", con errata. En el código es `GNavigationButton`. Conviene corregirlo en Figma.

### Menu 🔧

Estilos comunes para todas las listas que se abren desde un activador, en `base/menu` (`gandalfMenuContentVariants`, `gandalfMenuItemVariants`, `gandalfMenuLabelVariants`, `gandalfMenuSeparatorVariants`). Se aplican en `GDropdown`, `GSelect*` y `GCombobox*`, y por tanto en `GKitSelect` y `GKitCombobox`.

| Figma               | Código                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dropdown menu       | fondo `card`, borde `bni/border-loud`, radio 12px, padding 12px, sombra `SM`                                                                                                         |
| Menu Item           | 36px, radio 8px, texto 16px `base/foreground`, 4px entre ítems; hover `alpha/dark-8`, presionado `dark-12`; deshabilitado con fondo `muted` y texto e icono `muted/foreground-quiet` |
| Divider Type=Header | título de grupo, 14px `base/foreground-extra-quiet`                                                                                                                                  |
| Divider Type=Line   | línea `border` con 16px de aire arriba y abajo                                                                                                                                       |

Los ejemplos de Figma usan **Input Field** como activador. Por eso el aspecto de campo de `GInput` pasó a una CVA compartida (`gandalfFieldVariants`), que ahora usan también `GSelectTrigger` y los activadores de `GKitCombobox` y `GKitDatePicker`. Estos dos últimos dejan de ser un `GButton` y pasan a ser un `<button>` con aspecto de campo. Abierto, el activador se ve como un campo con foco. El tamaño `default` de los `kit/` pasa de 36px a 40px (md de Figma).

❓ **Menu Item Description** (título y descripción) no tiene componente propio: se compone dentro del ítem. Si se usa mucho, conviene crear uno.

❓ **Badge y trailing icon en Menu Item:** se ponen en el slot del ítem; no hay props dedicadas.

🔧 **Menu & Search:** el buscador de `GKitCombobox` se ve como Search Field, a 12px del borde de la lista.

🔧 **Navegation Buttons** (página Button) usa este menú (ver Button).

### Label (`GLabel`) 🔧

14px semibold `base/foreground` (antes 14px medium con opacidad al deshabilitar). Asterisco de obligatorio en `text/contextual/danger` (#c10007, `destructive-bold`) a 2px del texto. Deshabilitado: texto `base/foreground-extra-quiet` y asterisco `muted/foreground-quiet`, sin opacidad, también cuando sigue a un control deshabilitado. Nuevo slot `info` para el icono de "más información" de Figma, a 6px.

### Check, Type=Square / Circle (`GCheckbox`, `GRadioGroup`) 🔧

En Figma no son el checkbox relleno de shadcn, sino iconos de línea de Lucide (`square`, `square-check`, `circle`, `circle-check`):

| Estado           | Color                                               |
| ---------------- | --------------------------------------------------- |
| Sin marcar       | `base/foreground-extra-quiet`                       |
| Hover sin marcar | vista previa del marcado en `base/foreground-quiet` |
| Marcado          | `accent-pr/foreground` (#7c33dc)                    |
| Hover marcado    | vista previa del desmarcado, en morado              |
| Deshabilitado    | `muted/foreground-quiet`                            |

Se dibujan con máscaras CSS (`check-glyph-*`) en un pseudo-elemento, así el color sale de los tokens y el anillo de foco sigue visible. `GRadioGroup` y `GRadioGroupItem` son nuevos.

❓ **Indeterminado:** Figma no lo define; se usa `square-minus` en morado.

---

## Bug encontrado en los tokens

🔧 **`text-base` pintaba el texto casi blanco.** El token de Figma `base/base` estaba en el código como `--color-base`. En Tailwind v4, un color llamado `base` convierte `text-base` en una utilidad de color además de tamaño, así que todo `text-base` salía en `slate-50`. Afectaba al Input de shadcn en móvil, a `GInput` y a las pestañas de `GTabs`. El token pasa a llamarse `--color-base-base` (`bg-base-base`), igual que en Figma, y ningún otro color coincide con un tamaño de Tailwind.
