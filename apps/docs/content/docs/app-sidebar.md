---
title: App Sidebar
description: The app shell of the Layouts page — header, sidebar and page content — plus the page title blocks.
status: complete
---

# GAppSidebar

The **Layouts** page in Figma draws every screen with the same shell: the **Header** across the
top, the **Sidebar** on the left below it, and the page on the right. `GAppSidebar` is that shell:
you pass the groups of the navigation rail and it draws the Sidebar Titles, the items, the active
state and a tooltip per item while collapsed into the 52px icon rail.
The page itself starts with a **Title**, drawn in two flavours: _First Level Layout_ (icon, title
and description) and _Second Level Layout_ (back button and breadcrumbs, then a smaller title with
its state).

Everything else on those screens (tabs, search, filters, tables, accordions, selectors) is an
existing component: compose it inside the layout.

## Preview

::app-sidebar-preview
::

## Usage

```vue
<script setup lang="ts">
import { NuxtLink } from '#components'
import { Bell, CircleHelp, LogOut, Settings, SquareCheck } from 'lucide-vue-next'
import type { SidebarNavGroup } from '@unergy-dev/gandalf'

const route = useRoute()
const groups: SidebarNavGroup[] = [
  { label: 'First title', icon: SquareCheck, items: [{ value: '/one', title: 'Item one', icon: SquareCheck, to: '/one' }] },
]

const signOut = () => {}
</script>

<template>
  <GAppSidebar :groups="groups" :model-value="route.path" :link-as="NuxtLink">
    <template #header>
      <GHeader logo-to="/" :link-as="NuxtLink">
        <template #actions>
          <GButton variant="ghost-primary" size="xs" aria-label="Help"><CircleHelp /></GButton>
          <GButton variant="ghost-primary" size="xs" aria-label="Settings"><Settings /></GButton>
          <GButton variant="ghost-primary" size="xs" alert-dot aria-label="Notifications"><Bell /></GButton>
          <GKitUserMenu name="Ana Valencia" email="ana@unergy.io">
            <GMenuItem variant="destructive" @select="signOut"><LogOut />Cerrar sesión</GMenuItem>
          </GKitUserMenu>
        </template>
      </GHeader>
    </template>

    <GAppSidebarTitle title="Level one" description="Brief description of a Level 1 screen" :icon="SquareCheck" />
    <!-- tabs, filters, table… with 24px sides (px-6), as in Figma -->
  </GAppSidebar>
</template>
```

`GAppSidebar` fills the viewport (`h-svh`) and only the content scrolls. Pass `class="h-[…]"` to
embed it somewhere smaller. Without `groups` it renders no sidebar; use the `sidebar` slot for a
custom rail (give your `GSidebar` the `gandalfAppSidebarRailClass` so it sits below the header).

The rail knows nothing about routes or permissions: filter the items before passing them, and
compute the active `value` from the route yourself. Without a router, use `v-model` and plain
items (rendered as buttons), or `href` (rendered as `<a>`).

### Items

| Field      | Type        |                                            |
| ---------- | ----------- | ------------------------------------------ |
| `value`    | `string`    | Unique key, compared with `modelValue`     |
| `title`    | `string`    | Label, and tooltip when collapsed          |
| `icon`     | `Component` | Icon; the only thing shown when collapsed  |
| `to`       | `unknown`   | Passed as `to` to `linkAs`                 |
| `href`     | `string`    | Plain link, when there is no `to`          |
| `disabled` | `boolean`   | Shown faded and not clickable              |

Groups take `label`, an optional `icon` and `items`. A group label without an icon is hidden in
the collapsed rail; with one, it stays as an icon. Groups with no items are skipped.

### Second level

```vue
<template>
  <GAppSidebarBreadcrumbs @back="router.back()">
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
  </GAppSidebarBreadcrumbs>

  <GAppSidebarTitle level="second" title="Level two">
    <GBadge>State</GBadge>
    <template #actions>
      <!-- role / sub-level selectors -->
    </template>
  </GAppSidebarTitle>
</template>
```

## GAppSidebar Props

::docs-props-table
---
items:
  - name: groups
    type: "SidebarNavGroup[]"
    default: "[]"
    description: Groups of the navigation rail. Empty means no sidebar (or use the `sidebar` slot).
  - name: modelValue
    type: "string"
    default: "undefined"
    description: "`value` of the active sidebar item (v-model)."
  - name: linkAs
    type: "Component | string"
    default: "undefined"
    description: Component for sidebar items with `to`, such as `NuxtLink`.
  - name: sidebarLabel
    type: "string"
    default: "'Navigation'"
    description: Accessible name of the sidebar's `<nav>` landmark.
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
| `sidebar` | Replaces the whole navigation rail. |
| `sidebar-header` | Content above the groups. |
| `sidebar-footer` | Content below the groups. |
| `item` | `{ item, active }`: replaces the icon and label of each item. |
| default   | The page. |

| Event | Payload | When |
| --- | --- | --- |
| `update:modelValue` | `string` | An item is clicked |
| `update:open` | `boolean` | The sidebar expands or collapses |
| `select` | `SidebarNavItem` | An item is clicked |

## GHeader

The **Header** component (Type=Default): 48px white bar with a bottom border. On the left, the
Unergy logo, a divider and the `GSidebarTrigger` (it needs a `GSidebarProvider` above it; `GAppSidebar`
has one). Slots: `logo` (replaces the logo), default (after the trigger) and `actions` (right side).

::docs-props-table
---
items:
  - name: sidebarTrigger
    type: "boolean"
    default: "true"
    description: Shows the divider and the GSidebarTrigger after the logo.
  - name: logoTo
    type: "string"
    default: "undefined"
    description: Makes the logo a link to this destination (the app's home).
  - name: linkAs
    type: "Component | string"
    default: "undefined"
    description: Component for the logo link, such as `NuxtLink`. Without it, an `<a href>`.
---
::

## GAppSidebarTitle

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

## GAppSidebarBreadcrumbs

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
