---
title: GTabs
description: A tabs component with default, underline, and pills style variants.
---

# GTabs

A tabs component built on top of Reka UI's `Tabs` primitive, exposing three visual variants (`default`, `underline`, `pills`) and four alignment options.

## Preview

::tabs-preview
::

## Usage

```vue
<template>
  <GTabs default-value="overview">
    <GTabsList variant="underline">
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

```vue
<GTabsList variant="default">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

### Underline

```vue
<GTabsList variant="underline">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

### Pills

```vue
<GTabsList variant="pills">
  <GTabsTrigger value="tab1">Tab 1</GTabsTrigger>
</GTabsList>
```

## Alignment

The `align` prop on `GTabsList` controls the distribution of triggers:

```vue
<GTabsList variant="pills" align="center">...</GTabsList>
<GTabsList variant="default" align="stretch">...</GTabsList>
```

## GTabsList Props

::docs-props-table
---
items:
  - name: variant
    type: "'default' | 'underline' | 'pills'"
    default: "'default'"
    description: Visual style of the tabs list.
  - name: align
    type: "'start' | 'center' | 'end' | 'stretch'"
    default: "'start'"
    description: Alignment of the tab triggers. 'stretch' makes each trigger fill equal width.
---
::

## GTabs Props

`GTabs` extends all props from Reka UI's [`TabsRoot`](https://reka-ui.com/docs/components/tabs).

| Prop           | Type     | Description                                           |
| -------------- | -------- | ----------------------------------------------------- |
| `defaultValue` | `string` | The default active tab value (uncontrolled)           |
| `modelValue`   | `string` | The active tab value (controlled, use with `v-model`) |
