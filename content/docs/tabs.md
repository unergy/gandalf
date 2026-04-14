---
title: GTabs
description: A tabs component with default, underline, and pills variants.
---

# GTabs

A tabs component built on top of shadcn/ui's `Tabs` primitives (Reka UI under the hood), exposing three visual variants and four alignment options. The `variant` and `align` props are set once on `GTabsList` and propagated automatically to each `GTabsTrigger` via `provide`/`inject` — no need to repeat them.

## Preview

::tabs-preview
::

## Usage

```vue
<template>
  <GTabs default-value="overview">
    <GTabsList variant="underline" align="start">
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

### Default

The standard shadcn-style tabs: a muted pill background on the list, the active trigger gets a white card and shadow.

```vue
<GTabsList variant="default">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

### Underline

The list has only a bottom border. The active trigger shows a 2px bottom border in the foreground color. Use when the tabs are inside a card or a page section.

```vue
<GTabsList variant="underline">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

### Pills

Each trigger is a standalone pill. The active trigger gets a primary background. Use for filter-style tabs.

```vue
<GTabsList variant="pills">
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
<GTabsList variant="underline" align="center">...</GTabsList>
<GTabsList variant="default" align="stretch">...</GTabsList>
```

## GTabsList Props

::docs-props-table
---
items:
  - name: variant
    type: "'default' | 'underline' | 'pills'"
    default: "'default'"
    description: Visual style of the tabs list and triggers.
  - name: align
    type: "'start' | 'center' | 'end' | 'stretch'"
    default: "'start'"
    description: Alignment of the tab triggers. 'stretch' makes each trigger fill equal width.
---
::

## GTabs Props

`GTabs` extends all props from Reka UI's [`TabsRoot`](https://reka-ui.com/docs/components/tabs).

| Prop | Type | Description |
|---|---|---|
| `defaultValue` | `string` | The default active tab value (uncontrolled) |
| `modelValue` | `string` | The active tab value (controlled, use with `v-model`) |

