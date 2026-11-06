---
title: GSidebar
description: The application navigation rail, expanded or collapsed into icons.
status: complete
---

# GSidebar

The navigation rail of the Figma **Sidebar** page. It has two types: **Expanded** (224px, icon and
label) and **Icon** (52px, only the icon). Inside it, every group is a **Sidebar Title** followed by
a **Menu** of **Sidebar Menu Item** rows.

It wraps shadcn/ui's `Sidebar` primitives, so it keeps their behaviour: the state is remembered in a
cookie, `Ctrl/Cmd + B` toggles it and, on screens narrower than 768px, the rail opens as a sheet.

## Preview

::sidebar-preview
::

## Usage

```vue
<template>
  <GSidebarProvider>
    <GSidebar>
      <GSidebarContent>
        <GSidebarGroup>
          <GSidebarGroupLabel>
            <Folder />
            <span>First title</span>
          </GSidebarGroupLabel>
          <GSidebarMenu>
            <GSidebarMenuItem>
              <GSidebarMenuButton is-active tooltip="Item one">
                <House />
                <span>Item one</span>
              </GSidebarMenuButton>
            </GSidebarMenuItem>
            <GSidebarMenuItem>
              <GSidebarMenuButton tooltip="Item two">
                <ChartLine />
                <span>Item two</span>
              </GSidebarMenuButton>
            </GSidebarMenuItem>
          </GSidebarMenu>
        </GSidebarGroup>
      </GSidebarContent>
    </GSidebar>

    <GSidebarInset>
      <GSidebarTrigger />
      <!-- page content -->
    </GSidebarInset>
  </GSidebarProvider>
</template>

<script setup lang="ts">
import {
  GSidebar,
  GSidebarContent,
  GSidebarGroup,
  GSidebarGroupLabel,
  GSidebarInset,
  GSidebarMenu,
  GSidebarMenuButton,
  GSidebarMenuItem,
  GSidebarProvider,
  GSidebarTrigger,
} from '@unergy-dev/gandalf'
import { ChartLine, Folder, House } from 'lucide-vue-next'
</script>
```

Always wrap the label of a title or an item in a `<span>`: that is what the collapsed rail hides to
leave only the icon, as Figma's `Type=Icon` does.

## Expanded and collapsed

`GSidebar` defaults to `collapsible="icon"`, the two types drawn in Figma. The other values of the
shadcn primitive are still available:

| `collapsible` | Behaviour                                                    |
| ------------- | ------------------------------------------------------------ |
| `icon`        | Default. Collapses to the 52px icon rail (Figma `Type=Icon`). |
| `offcanvas`   | Slides out of the screen.                                    |
| `none`        | Always expanded.                                             |

Control the state from the outside with `v-model:open` on `GSidebarProvider`, or let it keep its own
state with `default-open`.

```vue
<GSidebarProvider v-model:open="open">...</GSidebarProvider>
```

Inside the provider, `useSidebar()` returns `state`, `open`, `setOpen`, `isMobile`, `openMobile`,
`setOpenMobile` and `toggleSidebar`.

## States of a menu item

| Figma               | Code                                       |
| ------------------- | ------------------------------------------ |
| `Status=Enabled`    | Default: 14px text in `sidebar/foreground`. |
| `Status=Hovered`    | `:hover`, fills with `sidebar/accent`.      |
| `Status=Actived`    | `is-active`, fills with `sidebar/primary` and turns the label semibold. |

## Tooltips in the collapsed rail

`GSidebarMenuButton` accepts `tooltip`, shown only while the sidebar is collapsed. It uses the
Gandalf tooltip (`GTooltipContent`), so it matches the Tooltip page of Figma.

## Components

| Component              | Figma                | Description                                                     |
| ---------------------- | -------------------- | --------------------------------------------------------------- |
| `GSidebarProvider`     | —                    | Layout wrapper. Sets the widths (224px / 52px) and the state.   |
| `GSidebar`             | Sidebar              | The panel: `sidebar/sidebar` background and a right border.     |
| `GSidebarHeader`       | —                    | Optional slot above the groups.                                 |
| `GSidebarContent`      | Sidebar              | Scrolling body: 8px of vertical air, 4px between groups.        |
| `GSidebarGroup`        | Sidebar              | A Sidebar Title plus its Menu.                                  |
| `GSidebarGroupLabel`   | Sidebar Title        | 32px row, 12px icon and text.                                   |
| `GSidebarGroupContent` | —                    | Optional wrapper between the group and its menu.                |
| `GSidebarMenu`         | Menu                 | The `<ul>` of items.                                            |
| `GSidebarMenuItem`     | Menu                 | The `<li>` of an item.                                          |
| `GSidebarMenuButton`   | Sidebar Menu Item    | The row itself: icon, label and states.                         |
| `GSidebarFooter`       | —                    | Optional slot below the groups.                                 |
| `GSidebarTrigger`      | —                    | Ghost primary xs button that toggles the rail.                  |
| `GSidebarInset`        | —                    | The `<main>` next to the sidebar.                               |

Anything the Figma page does not draw — rail, separator, menu actions, badges, sub-menus,
skeletons — is still available from the primitive:

```ts
import { SidebarMenuBadge, SidebarMenuSub } from '@unergy-dev/gandalf/ui/sidebar'
```
