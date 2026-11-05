# Revisión de estilos: Figma frente a código

Comparación entre el archivo de Figma [Gandalf](https://www.figma.com/design/WK30HCq8qlHx54ySve2r9Z/Gandalf) y `@unergy/gandalf`. Para cada valor se lee la variable de Figma y se compara con el token o la clase del código.

**Leyenda:** ✅ coincide · 🔧 corregido en esta rama (`fix/figma-styles`) · ❓ hay que decidir · ⏳ sin revisar.

## Estado

| Página de Figma                                                                                                                                                                                                                                                       | Estado       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Foundations: colores                                                                                                                                                                                                                                                  | ✅ / 🔧      |
| Foundations: tipografía                                                                                                                                                                                                                                               | ✅ / 🔧 / ❓ |
| Foundations: radios                                                                                                                                                                                                                                                   | 🔧           |
| Foundations: espaciado                                                                                                                                                                                                                                                | ✅           |
| Foundations: sombras (Elevation)                                                                                                                                                                                                                                      | ⏳           |
| Tooltip                                                                                                                                                                                                                                                               | 🔧 / ❓      |
| Input: Input Field (`GInput`)                                                                                                                                                                                                                                         | 🔧 / ❓      |
| Card: Card Toggle (`GCardToggle`)                                                                                                                                                                                                                                     | 🔧           |
| Card: Files Card, Miniature                                                                                                                                                                                                                                           | ⏳           |
| Input: Text Area y Search Field, Label, Check, Table, Menu, Sidebar, Tabs, Details Panel, Progress bar, Breadcrumbs, Badge, Scrollbar, Avatar, Visualization, Accordeon, Button, Segmented Button, Stepper, Upload & Download, Toast, Reports, Chat, Dialogs, Layouts | ⏳           |

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

### Sombras ⏳

Pendiente. `Shadow/Neutral/M` coincide con `--shadow-neutral-md` ✅; falta comparar la escala `shadow-2xs` a `shadow-2xl`.

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

⏳ Text Area (`GTextarea`) y Search Field están en la misma página y faltan por revisar.

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

⏳ **Files Card** (carpeta y archivo, con 4 estados) y **Miniature** (miniatura de 128px seleccionable) están sin implementar.
