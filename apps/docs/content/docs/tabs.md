---
title: GTabs
description: A tabs component with base and outline variants and optional full-width layout.
status: complete
---

# GTabs

A tabs component built on top of shadcn/ui's `Tabs` primitives (Reka UI under the hood), exposing two visual variants, four alignment options, and a `fullWidth` flag. The `variant`, `align`, and `fullWidth` props are set once on `GTabsList` and propagated automatically to each `GTabsTrigger` via `provide`/`inject` — no need to repeat them.

## Preview

::tabs-preview
::

## Usage

```vue
<template>
  <GTabs default-value="overview">
    <GTabsList variant="outline" align="start">
      <GTabsTrigger value="overview">Overview</GTabsTrigger>
      <GTabsTrigger value="settings">Settings</GTabsTrigger>
    </GTabsList>
    <GTabsContent value="overview">Overview content.</GTabsContent>
    <GTabsContent value="settings">Settings content.</GTabsContent>
  </GTabs>
</template>

<script setup lang="ts">
import { GTabs, GTabsList, GTabsTrigger, GTabsContent } from '@/components/gandalf/base/tabs'
</script>
```

## Variants

### Base

The standard shadcn-style tabs: a muted pill background on the list, the active trigger gets a white card and shadow.

```vue
<GTabsList variant="base">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

### Outline

The list has only a bottom border. The active trigger shows a bottom border in the primary color. Use when the tabs are inside a card or a page section.

```vue
<GTabsList variant="outline">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>

<!-- Triggers stretch to fill the row too -->
<GTabsList variant="outline" align="stretch">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

## Full Width

The `fullWidth` prop makes the `base` tab list expand to fill all available horizontal space, stretching its triggers to match. When omitted (default), the `base` list sizes to its content. It has no effect on `outline`, which is always full-width by design — see [Outline](#outline) for how to stretch its triggers instead.

```vue
<GTabsList variant="base" full-width>
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
<GTabsList variant="outline" align="center">...</GTabsList>
<GTabsList variant="base" align="stretch">...</GTabsList>
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

Focus rings are rendered with `focus-visible` so they only appear during keyboard navigation, not on pointer click.

## GTabsList Props

::docs-props-table
---
items:
  - name: variant
    type: "'base' | 'outline'"
    default: "'base'"
    description: Visual style of the tabs list and triggers.
  - name: align
    type: "'start' | 'center' | 'end' | 'stretch'"
    default: "'start'"
    description: Alignment of the tab triggers. 'stretch' makes each trigger fill equal width and implies fullWidth.
  - name: fullWidth
    type: "boolean"
    default: "false"
    description: When true, the tab list expands to fill all available horizontal space. Has no additional effect on the outline variant, which is always full-width.
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
