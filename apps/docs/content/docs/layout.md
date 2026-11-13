---
title: GLayout
description: The app shell of the Layouts page — header, sidebar and page content — plus the page title blocks.
status: complete
---

# GLayout

The **Layouts** page in Figma draws every screen with the same shell: the **Header** across the
top, the **Sidebar** on the left below it, and the page on the right. `GLayout` is that shell.
The page itself starts with a **Title**, drawn in two flavours: _First Level Layout_ (icon, title
and description) and _Second Level Layout_ (back button and breadcrumbs, then a smaller title with
its state).

Everything else on those screens (tabs, search, filters, tables, accordions, selectors) is an
existing component: compose it inside the layout.

## Preview

::layout-preview
::

## Usage

```vue
<script setup lang="ts">
import { NuxtLink } from '#components'
import { Bell, CircleHelp, Settings, SquareCheck } from 'lucide-vue-next'
import type { SidebarNavGroup } from '@unergy-dev/gandalf'

const route = useRoute()
const groups: SidebarNavGroup[] = [
  { label: 'First title', icon: SquareCheck, items: [{ value: '/one', title: 'Item one', icon: SquareCheck, to: '/one' }] },
]
</script>

<template>
  <GLayout :groups="groups" :model-value="route.path" :link-as="NuxtLink">
    <template #header>
      <GHeader>
        <template #actions>
          <GButton variant="ghost-primary" size="xs" aria-label="Help"><CircleHelp /></GButton>
          <GButton variant="ghost-primary" size="xs" aria-label="Settings"><Settings /></GButton>
          <GButton variant="ghost-primary" size="xs" alert-dot aria-label="Notifications"><Bell /></GButton>
          <GKitAvatar fallback="AV" />
        </template>
      </GHeader>
    </template>

    <GLayoutTitle title="Level one" description="Brief description of a Level 1 screen" :icon="SquareCheck" />
    <!-- tabs, filters, table… with 24px sides (px-6), as in Figma -->
  </GLayout>
</template>
```

`GLayout` fills the viewport (`h-svh`) and only the content scrolls. Pass `class="h-[…]"` to
embed it somewhere smaller. Without `groups` it renders no sidebar; use the `sidebar` slot for a
custom rail (give your `GSidebar` the `gandalfLayoutSidebarClass` so it sits below the header).

### Second level

```vue
<template>
  <GLayoutBreadcrumbs @back="router.back()">
    <GBreadcrumb>
      <GBreadcrumbList>
        <GBreadcrumbItem><GBreadcrumbLink href="/one">Level one</GBreadcrumbLink></GBreadcrumbItem>
        <GBreadcrumbSeparator />
        <GBreadcrumbItem><GBreadcrumbPage>Level two</GBreadcrumbPage></GBreadcrumbItem>
      </GBreadcrumbList>
    </GBreadcrumb>
    <template #actions>
      <GButton size="sm">Tools</GButton>
    </template>
  </GLayoutBreadcrumbs>

  <GLayoutTitle level="second" title="Level two">
    <GBadge>State</GBadge>
    <template #actions>
      <!-- role / sub-level selectors -->
    </template>
  </GLayoutTitle>
</template>
```

## GLayout Props

::docs-props-table
---
items:
  - name: groups
    type: "SidebarNavGroup[]"
    default: "[]"
    description: Groups of the GKitSidebar. Empty means no sidebar (or use the `sidebar` slot).
  - name: modelValue
    type: "string"
    default: "undefined"
    description: "`value` of the active sidebar item (v-model)."
  - name: linkAs
    type: "Component | string"
    default: "undefined"
    description: Component for sidebar items with `to`, such as `NuxtLink`.
  - name: open
    type: "boolean"
    default: "undefined"
    description: Expanded or collapsed sidebar (v-model:open).
  - name: defaultOpen
    type: "boolean"
    default: "true"
    description: Initial state when `open` is not controlled.
  - name: contentClass
    type: "string"
    default: "undefined"
    description: Classes for the `<main>` that holds the page.
---
::

| Slot      | |
| --------- | --- |
| `header`  | The app bar. Defaults to a bare `GHeader`. |
| `sidebar` | Replaces the GKitSidebar. |
| default   | The page. |

## GHeader

The **Header** component (Type=Default): 48px white bar with a bottom border. On the left, the
Unergy logo, a divider and the `GSidebarTrigger` (it needs a `GSidebarProvider` above it; `GLayout`
has one). Slots: `logo` (replaces the logo), default (after the trigger) and `actions` (right side).

::docs-props-table
---
items:
  - name: sidebarTrigger
    type: "boolean"
    default: "true"
    description: Shows the divider and the GSidebarTrigger after the logo.
---
::

## GLayoutTitle

::docs-props-table
---
items:
  - name: level
    type: "'first' | 'second'"
    default: "'first'"
    description: "First Level Layout (30px title, icon, description) or Second Level Layout (24px title)."
  - name: title
    type: "string"
    default: "undefined"
    description: Title text (or the `title` slot).
  - name: description
    type: "string"
    default: "undefined"
    description: Text under the title (or the `description` slot).
  - name: icon
    type: "Component"
    default: "undefined"
    description: Icon in the 32px square before the title (or the `icon` slot).
---
::

The default slot goes right after the title (the state badge); `actions` is pushed to the right.

## GLayoutBreadcrumbs

The top row of the Second Level Layout: back button, breadcrumbs (default slot) and tools
(`actions` slot).

::docs-props-table
---
items:
  - name: back
    type: "boolean"
    default: "true"
    description: Shows the back button. It emits `back` on click.
  - name: backLabel
    type: "string"
    default: "'Back'"
    description: Accessible name of the back button.
---
::
