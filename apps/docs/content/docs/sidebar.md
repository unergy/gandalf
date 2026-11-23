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
          <GSidebarGroupContent>
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
          </GSidebarGroupContent>
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
  GSidebarGroupContent,
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

## Nested menus

A menu item can hold a nested menu, like a group inside a group. Use `GSidebarCollapsible` in place
of `GSidebarMenuItem` (it renders the `<li>`), make its button the `GSidebarCollapsibleTrigger`, and
put the rows in a `GSidebarMenuSub` inside `GSidebarCollapsibleContent`.

It adapts to the state of the rail:

| Rail                 | Behaviour                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Expanded (and mobile) | The rows unfold below the item with a height animation, behind a 1px `sidebar/border` rule under the icon. Their text lines up with the parent's label. |
| Collapsed (`Type=Icon`) | Clicking the icon opens the rows as a Gandalf **Menu** to its right, titled with `label`. Selecting a row closes it. |

A trailing icon in the parent's button is treated as its chevron: it is pushed to the right, rotates
from right to down while open, and is hidden in the collapsed rail. Pass `active` to the
`GSidebarCollapsible` while one of its rows is the current page: the parent turns semibold and, in the
collapsed rail, its icon takes the Actived fill, so the current section is still visible.

```vue
<GSidebarMenu>
  <GSidebarCollapsible default-open :active="isSettlement(route)">
    <GSidebarCollapsibleTrigger>
      <GSidebarMenuButton tooltip="Liquidaciones">
        <DollarSign />
        <span>Liquidaciones</span>
        <ChevronRight />
      </GSidebarMenuButton>
    </GSidebarCollapsibleTrigger>
    <GSidebarCollapsibleContent label="Liquidaciones">
      <GSidebarMenuSub>
        <GSidebarMenuSubItem>
          <GSidebarMenuSubButton as-child is-active>
            <NuxtLink to="/billing"><span>Facturación de energía</span></NuxtLink>
          </GSidebarMenuSubButton>
        </GSidebarMenuSubItem>
        <GSidebarMenuSubItem>
          <GSidebarMenuSubButton as-child>
            <NuxtLink to="/projects"><span>IDs proyectos</span></NuxtLink>
          </GSidebarMenuSubButton>
        </GSidebarMenuSubItem>
      </GSidebarMenuSub>
    </GSidebarCollapsibleContent>
  </GSidebarCollapsible>
</GSidebarMenu>
```

Wrap a row's label in a `<span>` so a long one is truncated with an ellipsis.

With `GAppSidebar`, give an item `children` instead: it renders all of the above, opens the parent
whose child is the current page, and marks it `active`.

```ts
{
  value: 'settlements',
  title: 'Liquidaciones',
  icon: DollarSign,
  children: [
    { value: 'billing', title: 'Facturación de energía', to: '/billing' },
    { value: 'projects', title: 'IDs proyectos', to: '/projects' },
  ],
}
```

## Tooltips in the collapsed rail

`GSidebarMenuButton` accepts `tooltip`, shown only while the sidebar is collapsed. It uses the
Gandalf tooltip (`GTooltipContent`), so it matches the Tooltip page of Figma.

## Components

| Component              | Figma                | Description                                                     |
| ---------------------- | -------------------- | --------------------------------------------------------------- |
| `GSidebarProvider`     | —                    | Layout wrapper. Sets the widths (224px / 52px) and the state.   |
| `GSidebar`             | Sidebar              | The panel: `sidebar/sidebar` background and a right border.     |
| `GSidebarHeader`       | —                    | Optional slot above the groups.                                 |
| `GSidebarContent`      | Sidebar              | Scrolling body: 8px of vertical air, 16px between groups.       |
| `GSidebarGroup`        | Sidebar              | A Sidebar Title plus its Menu.                                  |
| `GSidebarGroupLabel`   | Sidebar Title        | 32px row, 12px icon and text.                                   |
| `GSidebarGroupContent` | —                    | Wrapper between the title and its menu. Used in the examples.   |
| `GSidebarMenu`         | Menu                 | The `<ul>` of items.                                            |
| `GSidebarMenuItem`     | Menu                 | The `<li>` of an item.                                          |
| `GSidebarMenuButton`   | Sidebar Menu Item    | The row itself: icon, label and states.                         |
| `GSidebarCollapsible`  | —                    | Menu item with a nested menu. Inline when expanded, floating Menu when collapsed. |
| `GSidebarCollapsibleTrigger` | —              | The button that toggles it (use `as-child`).                    |
| `GSidebarCollapsibleContent` | —              | The part that unfolds, or the floating Menu (`label` is its title). |
| `GSidebarMenuSub`      | —                    | The nested `<ul>`, with a rule on its left.                     |
| `GSidebarMenuSubItem`  | —                    | The `<li>` of a nested row.                                     |
| `GSidebarMenuSubButton`| —                    | The nested row: text only, same states as an item; a Menu Item when collapsed. |
| `GSidebarFooter`       | —                    | Optional slot below the groups.                                 |
| `GSidebarTrigger`      | —                    | Ghost primary xs button that toggles the rail.                  |
| `GSidebarInset`        | —                    | The `<main>` next to the sidebar.                               |

Anything the Figma page does not draw — rail, separator, menu actions, badges, sub-menus,
skeletons — is still available from the primitive:

```ts
import { SidebarMenuBadge, SidebarMenuSub } from '@unergy-dev/gandalf/ui/sidebar'
```
