# Revisión de estilos: Figma frente a código

Comparación entre el archivo de Figma [Gandalf](https://www.figma.com/design/WK30HCq8qlHx54ySve2r9Z/Gandalf) y `@unergy/gandalf`. Para cada valor se lee la variable de Figma y se compara con el token o la clase del código.

**Leyenda:** ✅ coincide · 🔧 corregido en esta rama (`fix/figma-styles`) · ❓ hay que decidir · ⏳ sin revisar.

## Estado

| Página de Figma                                                                                                                                                                                                                                   | Estado       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Foundations: colores                                                                                                                                                                                                                              | ✅ / 🔧      |
| Foundations: tipografía                                                                                                                                                                                                                           | ✅ / 🔧 / ❓ |
| Foundations: radios                                                                                                                                                                                                                               | 🔧           |
| Foundations: espaciado                                                                                                                                                                                                                            | ✅           |
| Foundations: sombras (Elevation)                                                                                                                                                                                                                  | ⏳           |
| Tooltip                                                                                                                                                                                                                                           | 🔧 / ❓      |
| Label, Check, Table, Input, Menu, Sidebar, Tabs, Details Panel, Progress bar, Breadcrumbs, Badge, Scrollbar, Avatar, Visualization, Accordeon, Button, Card, Segmented Button, Stepper, Upload & Download, Toast, Reports, Chat, Dialogs, Layouts | ⏳           |

La revisión se cortó porque se alcanzó el límite de llamadas de Figma del plan actual (seat Collab, plan Professional). Se retoma cuando el límite se renueve o con un seat con más cupo.

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
