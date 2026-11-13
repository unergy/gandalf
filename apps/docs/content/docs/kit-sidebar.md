---
title: Sidebar
description: A navigation rail built from a list of groups and items, collapsible to an icon rail.
status: in-progress
---

# GKitSidebar

A navigation rail composed from the `GSidebar` parts in `gandalf/base/sidebar`. You pass groups of items and the active `value`; it draws the Sidebar Titles, the Sidebar Menu Items, the active state, and a tooltip per item while collapsed into the 52px icon rail. It is the tool rail first used in unergy-maps.

It knows nothing about routes or permissions: filter the items before passing them, and compute the active `value` from the route yourself.

## Preview

::kit-sidebar-preview
::

## Usage

`GKitSidebar` must sit below a `GSidebarProvider`. Put the provider around the whole shell so a `GSidebarTrigger` in the header (or ⌘B) shares its state.

```vue
<script setup lang="ts">
import { NuxtLink } from '#components'
import { JoystickIcon, LeafIcon, MapIcon } from '@lucide/vue'
import type { SidebarNavGroup } from '@unergy-dev/gandalf'

const route = useRoute()

const groups: SidebarNavGroup[] = [
  {
    label: 'Herramientas',
    items: [
      { value: '/', title: 'Mapa', icon: MapIcon, to: '/' },
      { value: '/tetris', title: 'PV Tetris', icon: JoystickIcon, to: '/tetris' },
      { value: '/geovisor', title: 'Geovisor', icon: LeafIcon, to: '/geovisor' },
    ],
  },
]

// The longest matching route wins, so nested pages keep their tool active.
const active = computed(() =>
  groups
    .flatMap(group => group.items)
    .map(item => item.value)
    .sort((a, b) => b.length - a.length)
    .find(path => (path === '/' ? route.path === '/' : route.path.startsWith(path))),
)
</script>

<template>
  <GSidebarProvider :default-open="false">
    <header><GSidebarTrigger /></header>
    <GKitSidebar :groups="groups" :model-value="active" :link-as="NuxtLink" aria-label="Herramientas" />
    <main><slot /></main>
  </GSidebarProvider>
</template>
```

Without a router, use `v-model` and plain items (rendered as buttons), or `href` (rendered as `<a>`).

### Items

| Field | Type | |
|---|---|---|
| `value` | `string` | Unique key, compared with `modelValue` |
| `title` | `string` | Label, and tooltip when collapsed |
| `icon` | `Component` | Icon; the only thing shown when collapsed |
| `to` | `unknown` | Passed as `to` to `linkAs` |
| `href` | `string` | Plain link, when there is no `to` |
| `disabled` | `boolean` | Shown faded and not clickable |

Groups take `label`, an optional `icon` and `items`. A group label without an icon is hidden in the collapsed rail; with one, it stays as an icon. Groups with no items are skipped.

### Under a header

`GSidebar` is fixed to the viewport. To place it below an app header, give it `class="absolute h-full"` inside a `relative` row; the gap it takes is still reserved next to the content.

## GKitSidebar Props

::docs-props-table
---
items:
  - name: groups
    type: "SidebarNavGroup[]"
    default: "—"
    description: Groups of items, drawn in order.
  - name: modelValue
    type: "string"
    default: "undefined"
    description: "`value` of the active item (v-model)."
  - name: linkAs
    type: "Component | string"
    default: "undefined"
    description: Component for items with `to`, such as `NuxtLink` or `RouterLink`.
  - name: ariaLabel
    type: "string"
    default: "'Navigation'"
    description: Accessible name of the `<nav>`.
  - name: side
    type: "'left' | 'right'"
    default: "'left'"
    description: Side of the screen.
  - name: variant
    type: "'sidebar' | 'floating' | 'inset'"
    default: "'sidebar'"
    description: Passed to `GSidebar`.
  - name: collapsible
    type: "'offcanvas' | 'icon' | 'none'"
    default: "'icon'"
    description: Passed to `GSidebar`.
---
::

## Slots

| Slot | Props | |
|---|---|---|
| `header` | — | Content above the groups (`GSidebarHeader`) |
| `footer` | — | Content below the groups (`GSidebarFooter`) |
| `item` | `{ item, active }` | Replaces the icon and label of each item |

## Events

| Event | Payload | When |
|---|---|---|
| `update:modelValue` | `string` | An item is clicked |
| `select` | `SidebarNavItem` | An item is clicked |
