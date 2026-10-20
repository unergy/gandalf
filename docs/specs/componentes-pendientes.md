# Componentes pendientes de diseño

Esta lista sale de la [fase 0](./npm-library.md#6-plan-de-migración-por-fases) de la migración a `@unergy/gandalf`.

El paquete publica todas las primitivas de shadcn en `@unergy/gandalf/ui` como *escape hatch*. Ese subpath no tiene garantía de estabilidad, así que cada primitiva que una app use de forma habitual debería tener un `G*` con variantes y tokens de Gandalf. Para eso hace falta diseño primero.

**Estado del repo (2026-10-20):** 60 primitivas en `ui/`, 27 componentes base en `gandalf/base/`, 5 en `gandalf/kit/` y **33 primitivas sin wrapper** (34 carpetas, pero `dropdown-menu` ya lo cubre `GDropdown`).

## Qué tiene que definir diseño por componente

1. **Variantes**: `variant`, `size`, `shape`… Se traducen 1:1 a CVA.
2. **Colores semánticos** que acepta (`default`, `action`, `information`, `success`, `warning`, `destructive`) y si admite color hex libre, como `GBadge`.
3. **Estados**: hover, focus, active, disabled, error, loading y readonly.
4. **Slots y composición**: qué partes se pueden reemplazar (icono, trigger, footer…).
5. **Modo oscuro**, si aplica.

## 1. Sin wrapper, prioridad alta (roadmap v0.2)

Son las piezas más comunes en formularios y layouts. Con ellas, una app típica casi no necesitaría importar desde `/ui`.

| Primitiva `ui/` | Componente previsto | Para qué sirve | Notas para diseño |
|---|---|---|---|
| `input` | `GInput` | Campo de texto de una línea | Tamaños y estados de error, disabled y readonly. Tiene que verse igual que `GInputGroup` y `GTextarea`. |
| `radio-group` | `GRadioGroup` | Elegir una opción entre varias | Label y descripción por opción. Revisar si hace falta una variante *card*, como `GCheckboxCard`. |
| `number-field` | `GNumberField` | Entrada numérica con botones + y − | Posición de los botones y formato (moneda, %, unidades kWh). |
| `native-select` | `GNativeSelect` | `<select>` nativo con estilo | Debe verse igual que el trigger de `GSelect`. |
| `separator` | `GSeparator` | Divisor horizontal o vertical | Grosor, color y variante con texto ("o"). |
| `card` | `GCard` | Contenedor con header, contenido y footer | Bordes, sombras (`--shadow-neutral-md`) y padding. Es una de las piezas más usadas. |
| `scroll-area` | `GScrollArea` | Scroll con barra personalizada | Ancho y color de la barra. |

## 2. Sin wrapper, prioridad media (roadmap v0.3)

| Primitiva `ui/` | Componente previsto | Para qué sirve | Notas para diseño |
|---|---|---|---|
| `progress` | `GProgress` | Barra de progreso | Modos determinado e indeterminado, colores semánticos y tamaños. |
| `hover-card` | `GHoverCard` | Vista previa al pasar el mouse | Ancho máximo y retardo. Debe ser coherente con `GPopover`. |
| `sidebar` | `GSidebar` | Barra lateral de la app | Estados expandido, colapsado y móvil. Ya existen tokens `--sidebar-*`. |
| `navigation-menu` | `GNavigationMenu` | Navegación superior con submenús | Indicador del ítem activo. |

## 3. Sin wrapper, backlog del roadmap

| Primitiva `ui/` | Componente previsto | Para qué sirve | Notas para diseño |
|---|---|---|---|
| `chart` | `GChart` | Gráficas (Unovis) | Paleta de series. Hoy existen `--chart-1` a `--chart-5`, que vienen de shadcn y no de Unergy. |
| `carousel` | `GCarousel` | Carrusel | Flechas e indicadores. |
| `kbd` | `GKbd` | Atajo de teclado | Tamaño dentro de texto y dentro de botones. |
| `resizable` | `GResizable` | Paneles redimensionables | Diseño del *handle*. |
| `stepper` | `GStepper` | Pasos de un flujo | Estados pendiente, actual, completo y error. Orientación horizontal y vertical. |
| `tags-input` | `GTagsInput` | Entrada de varios valores como tags | Reutilizar `GBadge` para los tags. |
| `pin-input` | `GPinInput` | Código PIN | Ver la nota de `input-otp`. |
| `command` | `GCommand` | Paleta de comandos y búsqueda | Debe ser coherente con la lista de opciones de `GCombobox`. |
| `context-menu` | `GContextMenu` | Menú de clic derecho | Debe ser coherente con `GDropdown`. |

## 4. Sin wrapper y fuera del roadmap

Hay que decidir si llevan `G*` o se quedan solo en `/ui`.

| Primitiva `ui/` | Componente previsto | Para qué sirve | Recomendación |
|---|---|---|---|
| `sheet` | `GSheet` | Panel lateral tipo diálogo | **Wrapper.** Es muy común en apps internas (detalles y filtros). Tiene que ser coherente con `GDialog`. |
| `drawer` | `GDrawer` | Panel inferior para móvil | Decidir junto con `sheet`. Probablemente baste con uno de los dos. |
| `slider` | `GSlider` | Seleccionar un valor en un rango | **Wrapper.** Encaja en los filtros. |
| `spinner` | `GSpinner` | Indicador de carga | **Wrapper.** Además permitiría añadir un estado *loading* a `GButton`, que hoy no lo tiene. |
| `empty` | `GEmpty` | Estado vacío | **Wrapper.** Se usa con `GTable` y en listas. Definir ilustración o icono y texto. |
| `toggle` / `toggle-group` | `GToggle` / `GToggleGroup` | Botones de dos estados | Revisar si `GButtonGroup` ya cubre el caso. |
| `collapsible` | `GCollapsible` | Mostrar u ocultar contenido | Revisar si `GAccordion` ya lo cubre. Si es así, queda solo en `/ui`. |
| `input-otp` | `GInputOtp` | Código de un solo uso | Elegir entre `input-otp` y `pin-input`, porque duplican función. |
| `item` | `GItem` | Ítem genérico de lista | Primitiva de bajo nivel. Queda solo en `/ui`, salvo que aparezcan listas recurrentes. |
| `menubar` | `GMenubar` | Barra de menús tipo escritorio | Poco común en web. Queda solo en `/ui`. |
| `aspect-ratio` | — | Mantener una proporción | No necesita diseño. Queda solo en `/ui`. |
| `form` | — | Integración con vee-validate | No es visual. `GField` ya cubre la parte visual. |
| `dropdown-menu` | — | Menú desplegable | Ya lo cubre `GDropdown`. No hace falta un wrapper aparte. |

## 5. Con wrapper, pero la doc no está completa

Estos componentes ya tienen código en `gandalf/base/`, pero su página de docs está marcada como `planned` o `in-progress`. Diseño debería validar lo que hay antes de la `1.0.0`, porque desde ahí cambiar su API cuenta como *breaking change*.

| Estado en la doc | Componentes |
|---|---|
| `planned` (el código ya existe) | `GButton`, `GSelect` |
| `in-progress` | `GAccordion`, `GAlert`, `GAlertDialog`, `GBreadcrumb`, `GButtonGroup`, `GCheckbox`, `GCombobox`, `GDialog`, `GDropdown`, `GField`, `GInputGroup`, `GPagination`, `GSkeleton`, `GToaster`, `GSwitch`, `GTable`, `GTextarea`, `GTooltip` |

## Propuesta para la 1.0.0

Para la `1.0.0` deberían estar diseñados y con wrapper:

- Todo el **grupo 1**.
- De los grupos 3 y 4: **`GSheet`, `GSpinner` y `GEmpty`**.
- Todo el **grupo 5**, validado.

El resto puede llegar en minors.
