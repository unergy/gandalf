---
title: GTabs
description: Tabs in the three Figma styles — toggle primary, toggle secondary and underlined tab.
status: complete
---

# GTabs

The **Tabs** page in Figma, built on shadcn/ui's `Tabs` primitives (Reka UI under the hood). Figma draws three molecules, chosen with `variant` on `GTabsList`; the `variant`, `align` and `fullWidth` props are set once on `GTabsList` and reach every `GTabsTrigger` through `provide`/`inject`.

| `variant`          | Figma molecule        | Figma atom             |
| ------------------ | --------------------- | ---------------------- |
| `toggle-primary`   | Tabs Toggle Primary   | Toggle Tab Item        |
| `toggle-secondary` | Tabs Toggle Secondary | Toogle Tab Secondary   |
| `tab`              | Tabs                  | Tab Item (Tab, Spacer) |

## Preview

::tabs-preview
::

## Usage

```vue
<template>
  <GTabs default-value="overview">
    <GTabsList variant="tab">
      <GTabsTrigger value="overview"><ListChecks />Overview</GTabsTrigger>
      <GTabsTrigger value="settings"><Settings />Settings</GTabsTrigger>
    </GTabsList>
    <GTabsContent value="overview">Overview content.</GTabsContent>
    <GTabsContent value="settings">Settings content.</GTabsContent>
  </GTabs>
</template>

<script setup lang="ts">
import { GTabs, GTabsList, GTabsTrigger, GTabsContent } from '@unergy-dev/gandalf'
import { ListChecks, Settings } from 'lucide-vue-next'
</script>
```

## Variants

### Toggle primary

The default. A white card (`card/card`, 16px radius, 8px padding) with 40px items. Inactive items are `muted/foreground-quiet` and tint with the `alpha/dark-5` / `alpha/dark-8` overlay on hover and press; the active item gets `base/base`, a `primary` border and text, and the `SM` elevation.

```vue
<GTabsList variant="toggle-primary">
  <GTabsTrigger value="tab1">Item 1</GTabsTrigger>
</GTabsList>
```

### Toggle secondary

A compact 32px pill on `base/base-loud`. Inactive items are `base/foreground-extra-quiet` with the same hover and press overlays; the active item is `base/inverse` with `base/on-inverse` text.

```vue
<GTabsList variant="toggle-secondary">
  <GTabsTrigger value="day">Día</GTabsTrigger>
</GTabsList>
```

### Tab

A full-width row with a 1px `bni/border` line along the bottom and 16px between items (Figma's Spacer). Items accept a leading 16px Lucide icon. Hover turns the label `primary/primary-quiet`; the active item is `primary` with a 3px underline.

```vue
<GTabsList variant="tab">
  <GTabsTrigger value="tab1"><ListChecks />Item 1</GTabsTrigger>
</GTabsList>

<!-- Triggers stretch to fill the row too -->
<GTabsList variant="tab" align="stretch">
  <GTabsTrigger value="tab1">Item 1</GTabsTrigger>
</GTabsList>
```

## Full Width

Figma draws the toggle groups at content width. `fullWidth` makes them fill the available space and stretches their triggers. The `tab` list is always full width; use `align="stretch"` to stretch its triggers.

```vue
<GTabsList variant="toggle-primary" full-width>
  <GTabsTrigger value="tab1">Overview</GTabsTrigger>
  <GTabsTrigger value="tab2">Settings</GTabsTrigger>
</GTabsList>
```

## Alignment

The `align` prop on `GTabsList` controls how triggers are distributed within the list:

| Value | Behavior |
|---|---|
| `start` | Triggers are left-aligned (default) |
| `center` | Triggers are centered |
| `end` | Triggers are right-aligned |
| `stretch` | Each trigger fills equal available width (implies `fullWidth`) |

```vue
<GTabsList variant="tab" align="center">...</GTabsList>
<GTabsList variant="toggle-primary" align="stretch">...</GTabsList>
```

## Accessibility

Keyboard navigation and ARIA semantics are handled by Reka UI:

- `role="tablist"` on `GTabsList`
- `role="tab"` + `aria-selected` on each `GTabsTrigger`
- `role="tabpanel"` + `aria-labelledby` on each `GTabsContent`
- `aria-disabled` on disabled triggers
- Arrow keys (`←` / `→`) move focus between tabs
- `Home` / `End` jump to the first / last tab
- `Enter` or `Space` activates the focused tab

Focus rings are rendered with `focus-visible` so they only appear during keyboard navigation, not on pointer click. Figma does not draw focus or disabled states; they follow the library convention (`ring` color, 50% opacity).

## GTabsList Props

::docs-props-table
---
items:
  - name: variant
    type: "'toggle-primary' | 'toggle-secondary' | 'tab'"
    default: "'toggle-primary'"
    description: Visual style of the tabs list and triggers.
  - name: align
    type: "'start' | 'center' | 'end' | 'stretch'"
    default: "'start'"
    description: Alignment of the tab triggers. 'stretch' makes each trigger fill equal width and implies fullWidth.
  - name: fullWidth
    type: "boolean"
    default: "false"
    description: When true, the tab list expands to fill all available horizontal space. Has no additional effect on the tab variant, which is always full-width.
---
::

## GTabs Props

`GTabs` extends all props from Reka UI's [`TabsRoot`](https://reka-ui.com/docs/components/tabs).

::docs-props-table
---
items:
  - name: defaultValue
    type: "string"
    default: undefined
    description: The default active tab value (uncontrolled).
  - name: modelValue
    type: "string"
    default: undefined
    description: The active tab value (controlled, use with v-model).
---
::
