# @unergy-dev/gandalf

## 0.6.0

### Minor Changes

- d72d7d2: **Breaking:** `GAccordion` follows the Accordeon page in Figma. `variant` is now `main` (default, Accordeon Main) or `blended` (Accordeon Blended); `default`, `layout` and `blended-main` are gone. `GAccordion` takes `category` (`main` / `default`) for Blended, and `GAccordionItem` takes `type` (`visualization` / `table`) for Main. `GAccordionTrigger` draws Figma's 48px header: uppercase 12px semibold title, a `label` badge (Tonal, Outlined in Blended Default; `label` and `label-icon` slots), a `count` (Main), and the "Mostrar" / "Ocultar" action (`expandText`, `collapseText`), with the alpha hover / pressed overlays and muted disabled colors. `indicatorColor`, `indicatorPosition` and the `indicator-label` slot are removed: Figma fixes the chevron's place and color for each variant. `GAccordionContent` adds no padding. The CVAs are exported as `gandalfAccordionVariants`, `gandalfAccordionItemVariants` and `gandalfAccordionTriggerVariants`; `gandalfAccordionIndicatorVariants` and `ACCORDION_VARIANT_KEY` are removed.
- f1c1159: **Breaking:** `GAvatar` and `GKitAvatar` follow the Avatar page in Figma. `variant="rounded" | "square"` becomes `type="circle" | "square"` (square is now 8px, `corner/lg`). New props `size` (`xs` 24px, `sm` 32px by default, `md` 40px, `lg` 48px, with bold 12 / 14 / 16 / 18px text) and `semantic` (`default`, `action`, `information`, `success`, `warning`, `destructive`). `GKitAvatarGroup` overlaps by half the avatar size, without ring, and takes `type`, `size` and `more` (a last "+N" avatar). New `GAvatarRol` (Avatar Rol: legal, ambiental, forestal, civil, electrico).
- 7952388: `GBreadcrumb` follows the Breadcrumbs page in Figma: new `size` prop (`md` / `xs`), links in `base/foreground-extra-quiet` that turn `base/foreground` on hover together with their chevron, current page in semibold `base/foreground`, and Figma's spacing (8px between text and chevron in md, none in xs). The CVAs (`gandalfBreadcrumb*Variants`) and `GandalfBreadcrumbSize` are exported.
- 7e14810: New components from the Figma Chat page: `GInputChat` (the field to write a message, with attachments, attach buttons, send button and an editing state), `GMessageCard` (a chat message with avatar, ⋮ menu, comment, images, attachments and date) and `GMiniatures` (an attachment chip, as a file or an image thumbnail).
- 903fcfe: **Breaking:** `GDialog` and `GAlertDialog` follow the Figma page Dialogs. The card is `card/card` with a 24px radius, the `LG` elevation and no padding, 416px wide by default. `GDialogHeader` is Figma's Dialog Header (72px, 24px semibold title) with `type` `left` (default; `#icon` slot and a Ghost primary close button) or `center`. The close button moved from the corner of `GDialogContent` to `GDialogHeader`: `GDialogContent` no longer takes `showCloseButton` (use it on `GDialogHeader`). New `GDialogBody` and `GAlertDialogBody` for the content bands; put the description inside one. `GDialogFooter` is Figma's Group Button (24px padding, buttons in a row on the right) and its `showCloseButton` now renders an Outline primary `GButton` (`closeLabel`). `GAlertDialogHeader` is centred by default, with no close button; `GAlertDialogAction` and `GAlertDialogCancel` take `variant` and `size` like `GButton` (Tonal primary and Outline primary by default). The dialog CVAs are exported as `gandalfDialog*Variants`.
- 97489e1: New components from the Figma **Layouts** page: `GHeader` (the app bar with the Unergy logo, sidebar toggle and actions), `GLayout` (the app shell: header, `GKitSidebar` below it and the scrolling page), `GLayoutTitle` (First and Second Level titles) and `GLayoutBreadcrumbs` (back button, breadcrumbs and tools of a Second Level screen).
- 5221210: New components from the Figma **Reports** page: `GCircleReport` and `GAvatarReport` (report type badges), `GPin` (map pin with a layer name), `GIcons` (illustrated map markers) and `GPickerItem` (icon or label item of the layer style picker, with `v-model`).
- ba1b6ae: Table aligned with Figma: 12px-rounded frame with `bni/border`, header cells 12px semibold in `base/foreground-extra-quiet` without forced uppercase, body cells 14px in `base/inverse`, `accent` row hover, `description` prop/slot for two-line headers and cells (Text Configuration=Double), `action` slot shown on header hover, `footer` slot on `GTable` for the footer bar and `containerClass` for the frame.
- da9fa52: **Breaking:** `GTabsList` follows the Figma **Tabs** page. `variant` is now `'toggle-primary'` (default, was `'base'`), `'toggle-secondary'` (new) or `'tab'` (was `'outline'`). Hover and press use Figma's alpha overlays, the `tab` variant draws a 1px `bni/border` line, 16px spacing, a 3px `primary` underline and `primary/primary-quiet` on hover, and the toggle items use 16px semibold labels.
- c916ba2: Toast matches the Figma page: 404px card on `base/base`, 16px radius, elevation SM, padding 12/12/12/20 and 16px gaps. Title in Body/mdEm (16px semibold) truncated, description 14px with a 1.3 line height in `base/foreground-quiet`, 18px icons (`check`, `loader-circle`, `component`, `triangle-alert`, `siren`) and a 16px close icon pinned to the top. The toast card is now exported as `GToast` (prop `type`, as in Figma), and `GToaster` sets sonner's `--width` to 404px. `GandalfToastColor` is deprecated in favor of `GandalfToastType`, and the toast CVAs (`gandalfToastVariants`, `gandalfToastIconVariants`, `gandalfToastTitleVariants`) take `type` instead of `color`.

### Patch Changes

- 95e0527: Fix `GDialog`, `GAlertDialog` and `GPopover` casting absent boolean props to `false`: without `v-model:open` they never opened from their trigger, and `GDialog` was not modal (no overlay). They are now uncontrolled unless `open` is passed, and `GDialog` is modal by default.
- b489978: Fix `GSelect` never opening when used without `v-model:open`: an absent `open` was cast to `false`, so the select stayed closed. It is now uncontrolled unless `open` is passed.

## 0.5.0

### Minor Changes

- 61a6314: Add `GKitSidebar`, a navigation rail built from `GSidebar`: pass `groups` of items (`value`, `title`, `icon`, `to` / `href`, `disabled`) and the active `value` with `v-model`. It hides group titles without an icon in the collapsed rail, shows a tooltip per item, renders `to` items with the `linkAs` component (`NuxtLink`, `RouterLink`…) and has `header`, `footer` and `item` slots. New types: `SidebarNavGroup`, `SidebarNavItem`.

## 0.4.0

### Minor Changes

- 3130e9a: `GInput` has `leading` and `trailing` slots for the icons of Figma's Input Field. Native attributes now always go to the `<input>`.
- e22386e: `GMenu`, `GMenuTrigger`, `GMenuContent`, `GMenuItem`, `GMenuLabel` and `GMenuSeparator`: Figma's Dropdown menu with free content (icons, group titles, separators and a `destructive` item). `gandalfMenuItemVariants` takes a `variant`.
- 14a53a0: The `text-display-*`, `text-heading-*`, `text-body-*` and `text-action-*` utilities set the line height of their Figma style: `normal` (Figma's "Auto") for all of them, and 1.5 for `text-body-md` and `text-body-mdEm`. Before, they inherited Tailwind's line height for each size.

### Patch Changes

- 7c4cea0: `GDetailsPanel` has no shadow, as in Figma.
- b3d5396: `GFilesCard` of type `file` shows a file icon before its title on hover, and its preview icon is quiet at rest, as in Figma.
- 855b793: `GSegmentedButton` with two segments draws its divider in `primary/foreground-loud`, as Type=Two in Figma.
- 54fd18e: `GTooltipContent` draws Figma's arrow: a 12×8px triangle with a sharp tip, instead of shadcn's rotated square.
- 54fd18e: Fix `GTooltip` ignoring its props and events: `open`, `v-model:open`, `delayDuration` and the rest now reach the tooltip.

## 0.3.0

### Minor Changes

- 2883d1b: Add `GFilesCard` and `GMiniature` from Figma (Card → Files Card, Miniature). `GFilesCard` has `folder` and `file` types, an `actions` slot that does not toggle the card, and a file preview with the extension; `GMiniature` is a selectable 128px thumbnail. Both use `v-model` for the activated state.
- 1ed4183: Add `GCardToggle` from Figma (Card → Card Toggle): a selectable list card with `doble` and `report` types, a semantic-colored avatar tile, `v-model` for the activated state, and `avatar` / `complementary` slots. Adds the `alpha-dark-5` and `alpha-dark-8` overlay tokens.
- 32b414a: Add `GInput`, a single-line text input with `v-model`, styled from Figma (Input → Input Field): `xs` / `sm` / `md` sizes (24 / 32 / 40px), hover, focus, error and disabled states.
- bf5860d: **Breaking:** `GBadge` follows the Figma Badge. `variant` is `tonal` (default) or `outlined` (was `default` / `outline`); `size` is `md` (28px, 16px text, default), `sm` (24px) or `xs` (22px) (was `sm` / `default` / `lg` / `icon` — an icon alone now stays square at any size). Text and outline use each color's `-bold` tone, the Action outline is `#2b7fff`, links and buttons get the alpha hover/press overlays, disabled uses the muted colors, and badges are capped at 180px.
- 0f27bea: Add `GCardCheck` and `GCardToggleBox` (Figma Check → Card Check, Card Toggle Box): selectable cards with a circle check, an `icon` slot and `v-model`. Add `GStar` (Check → Star), a favorite toggle in two sizes. `GCheckboxCard` is deprecated in favor of `GCardCheck`.
- ed6a654: Checkbox, radio and label follow the Figma Check and Label components. `GCheckbox` and the new `GRadioGroup` / `GRadioGroupItem` are drawn as Lucide outline glyphs (square / circle) that turn purple with a check when on, preview the next state on hover and show a minus when indeterminate. `GLabel` is 14px semibold with a `#c10007` required asterisk, an `info` slot, and a quiet gray disabled state instead of transparency. Adds the `check-glyph-*` mask utilities.
- 7f980f6: Add `GDetailsPanel` from the Figma **Details Panel** page, built on `ui/sheet`: `GDetailsPanel`,
  `GDetailsPanelTrigger`, `GDetailsPanelContent`, `GDetailsPanelHeader`, `GDetailsPanelTitle`,
  `GDetailsPanelDescription`, `GDetailsPanelBody`, `GDetailsPanelFooter` and `GDetailsPanelClose`.

  A 416px `card/card` panel docked to the right, without a scrim (non-modal by default). The 72px
  header has the title in `Heading/sm` and a Ghost primary close button; the body scrolls with
  `GScrollArea`; the footer aligns its buttons to the right. The rows inside are
  `GVisualizationCard` (with a `title`) and `GVisualizationCardField`, as in the design.

- 1ec38eb: Rename the `base` color token to `base-base` (Figma `base/base`; use `bg-base-base`). A color named `base` made Tailwind treat `text-base` as a color too, so any `text-base` text rendered almost white (`slate-50`), including inputs and `GTabs`.
- 962d37c: Add `GFloatingButton` (Figma Button → Floating Button). Shadows `shadow-2xs` … `shadow-2xl` now use the Figma Elevation scale (Tailwind's defaults) instead of the softer values from the shadcn theme, so `shadow-lg`, `shadow-xl` and `shadow-2xl` are noticeably stronger. Adds the `alpha-light-5` token.
- 5649956: **Breaking:** `GButton` now uses the variants and sizes from Figma. `variant`: `tonal-primary` (default), `tonal-action`, `tonal-destructive`, `outline-primary`, `outline-destructive`, `ghost-primary`, `ghost-action`, `ghost-danger`; `size`: `md` (default, 40px), `sm` (36px), `xs` (32px). Replace `default` → `tonal-primary`, `destructive` → `tonal-destructive`, `outline` → `outline-primary`, `ghost` → `ghost-primary`, and `size="icon-sm"` → `size="xs"`. New `alertDot` prop. Adds the `alpha-dark-12`, `alpha-light-8` and `alpha-light-12` tokens and the `overlay-*` utilities.
- 332124a: Multiple-choice `GKitSelect` and `GKitCombobox` lists follow Figma's Menu Check Item: a square check on each option (previewing the next state on hover or keyboard highlight) and, once checked, the accent fill, border and text. New export: `gandalfMenuCheckItemVariants`.
- d5cea09: Menus follow the Figma Menu page: `GDropdown`, `GSelect` and `GCombobox` lists (and `GKitSelect` / `GKitCombobox`) get the Dropdown menu container (12px radius and padding, `bni-border-loud` border, SM shadow) and 36px Menu Items with alpha hover/press overlays; group labels and separators follow Figma's Divider. Select, combobox and date picker triggers now look like the Input Field (shared `gandalfFieldVariants`), and the `default` trigger size is 40px. New exports: `gandalfMenu*Variants`, `gandalfFieldVariants`.
- 1ecaea7: Add `GNavigationButton` (Figma Button → Navegation Buttons): a trigger that shows the selected option's title and description, or an icon and a colored label, and opens the Figma menu with title-and-description rows, a check on the current option and lines between groups. Supports `v-model`, `v-model:open`, `color` and an `icon` slot. Adds the `overlay-dark-5` utility.
- e7a501b: Add `GProgressBar`, built from the **Progress bar** page in Figma: a 6px square track in
  `base/base-loud` that fills with `success/success`, plus the value as a percentage in `Body/sm`
  (`00.00%`, `75.00%`, `100.0%`). Figma's `State` property is only a value, so it maps to
  `modelValue`; `max` normalises values that are not out of 100, and `label` / the `label` slot
  replace the percentage.
- b4c75bb: Add `GScrollArea` and `GScrollBar`, styled from the Figma **Scroll Bar** page.

  The scrollbar follows the `Container Scroll Bar` component set: a 6px track in `base/base-loud` with a `corner/sm` radius, a `base/foreground-quiet` thumb with the same radius, 8px of air between the track and the container edge, and 8px of padding inside the track. `orientation` maps Figma's `Type` property (`vertical`, `horizontal` or `both`) and the bar is visible whenever the content overflows (`type="auto"`).

- 9bae4e1: Add `GSearchField` (Figma Input → Search Field): a search box with a search icon, a clear button, `v-model` and `xs` / `sm` / `md` sizes. `GTextarea` now follows Figma's Text Area (Input Field states, 72px minimum height, 12px padding) and takes a `size` for its text. The search box inside `GKitCombobox` lists looks like the Search Field, as in Figma's "Menu & Search".
- d2611ce: Add `GSegmentedButton` and `GSegment`, from the **Segmented Button** page in Figma.

  A pill with a `bni/border-extra-loud` outline, 1000px corners and joined 40px segments separated
  by a 1px divider. Segments carry an optional 16px Lucide icon and an `Action/md` label; hover and
  press tint with Figma's `alpha/dark-5` and `alpha/dark-8` overlays, and the activated segment uses
  `accent-pr/accent` with `accent-pr/foreground` text. Built on `ui/toggle-group`, so it supports
  `type="single"` (the default) and `type="multiple"`, keyboard navigation and `v-model`.

- b78acd7: Add `GSidebar` and its parts from the Figma Sidebar page: `GSidebarProvider`, `GSidebar`,
  `GSidebarHeader`, `GSidebarContent`, `GSidebarGroup`, `GSidebarGroupLabel`, `GSidebarGroupContent`,
  `GSidebarMenu`, `GSidebarMenuItem`, `GSidebarMenuButton`, `GSidebarFooter`, `GSidebarTrigger` and
  `GSidebarInset`, plus the `useSidebar` composable.

  The rail is 224px expanded (`Type=Expanded`) and 52px collapsed (`Type=Icon`). Sidebar Title is a
  32px row with a 12px icon and 12px text in `sidebar/primary-fg`; Sidebar Menu Item is a 32px row
  with a 14px icon and 14px text in `sidebar/foreground`, filling with `sidebar/accent` on hover and
  with `sidebar/primary` plus a semibold `sidebar/primary-fg` label when `is-active`.

- 83ba15e: Add `GStepper` and `GStepperItem` from the Figma **Stepper** page, built on `ui/stepper`. A
  vertical list of 24px Steps with their titles: **Done** (`base/inverse` fill and a check),
  **Active** (`base/inverse` fill and the number), **Current** (outlined) and **Disabled**, with the
  alpha hover and press overlays. The line to the next step turns `base/inverse` once a step is done,
  and the last step has none.
- 33aa2ff: Add `GUploadBox` and `GUploadCard` from the Figma **Upload & Download** page.

  `GUploadBox` is the dashed drop zone: sizes `md` (112px, icon over title and description) and `sm` (56px, one row), hover and drag-over in `blue/50` with "Drop your file here", and an activated state that shows the chosen file in `action/object` with a clear button. It opens the native file picker, accepts drops and emits `files` with the `File[]`.

  `GUploadCard` is the 56px row of an upload list: file icon, name, a meta line with the size and the status (`queue`, `in-progress` as a percentage, `completed` in `success`, `error` in `destructive`), a `GBadge` with the file type and a `GButton` that removes the file or retries it.

- 005c1fd: Add the components of the Figma **Visualization** page: `GVisualizationCardField` and
  `GVisualizationLayoutField` (a label and its value, with slots for an icon, a badge or an avatar),
  plus the containers `GVisualizationCard` (Visualization Card Vertical / Horizontal) and
  `GVisualizationLayoutCard` (Visualization Layout Item), which draw the dividers between fields.

  `GVisualizationCard` takes a `title` (the group title of the Details Panel) and
  `GVisualizationCardField` a `placeholder` for empty values ("Sin definir").
