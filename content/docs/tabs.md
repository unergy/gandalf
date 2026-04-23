---
title: GTabs
description: A tabs component with base and outline variants.
status: complete
---

# GTabs

A tabs component built on top of shadcn/ui's `Tabs` primitives (Reka UI under the hood), exposing two visual variants and four alignment options. The `variant` and `align` props are set once on `GTabsList` and propagated automatically to each `GTabsTrigger` via `provide`/`inject` — no need to repeat them.

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
import { GTabs, GTabsList, GTabsTrigger, GTabsContent } from '@/components/gandalf/tabs'
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
```

## Alignment

The `align` prop on `GTabsList` controls how triggers are distributed:

| Value | Behavior |
|---|---|
| `start` | Triggers are left-aligned (default) |
| `center` | Triggers are centered |
| `end` | Triggers are right-aligned |
| `stretch` | Each trigger fills equal available width |

```vue
<GTabsList variant="outline" align="center">...</GTabsList>
<GTabsList variant="base" align="stretch">...</GTabsList>
```

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
    description: Alignment of the tab triggers. 'stretch' makes each trigger fill equal width.
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

