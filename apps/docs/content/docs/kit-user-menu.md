---
title: User Menu
description: The avatar at the right of the Header and the menu it opens, with the signed-in user on top.
status: in-progress
---

# User Menu

`GKitUserMenu` is the avatar that closes the **Header** actions and the menu it opens. The menu
starts with the signed-in user (avatar, name and email), then the app's own items, and can end
with a footer row (the app version, for example).

It knows nothing about sessions or permissions: the app passes the user and its items, sign-out
included. The items are the regular `GMenu` pieces (`GMenuItem`, `GMenuSeparator`, `GMenuSub`…).

## Preview

::kit-user-menu-preview
::

## Usage

```vue
<template>
  <GHeader>
    <template #actions>
      <GKitUserMenu :name="user.name" :email="user.email" :src="user.avatar">
        <GMenuItem @select="changePassword"><KeyRound />Cambiar contraseña</GMenuItem>
        <GMenuSub>
          <GMenuSubTrigger><Settings2 />Preferencias</GMenuSubTrigger>
          <GMenuSubContent>
            <!-- settings -->
          </GMenuSubContent>
        </GMenuSub>
        <GMenuSeparator />
        <GMenuItem variant="destructive" @select="signOut"><LogOut />Cerrar sesión</GMenuItem>
        <template #footer>
          Versión
          <span>{{ version }}</span>
        </template>
      </GKitUserMenu>
    </template>
  </GHeader>
</template>
```

## Props

::docs-props-table
---
items:
  - name: name
    type: "string"
    default: "—"
    description: Name shown on top of the menu. Its initials are the avatar fallback.
  - name: email
    type: "string"
    default: "undefined"
    description: Second line under the name.
  - name: src
    type: "string"
    default: "undefined"
    description: Avatar image.
  - name: fallback
    type: "string"
    default: "initials of name"
    description: Text of the avatar without image.
  - name: label
    type: "string"
    default: "name"
    description: Accessible name of the trigger.
  - name: class
    type: "string"
    default: "undefined"
    description: Classes for the avatar button. Other attributes (`id`, `data-*`…) go there too.
  - name: contentClass
    type: "string"
    default: "undefined"
    description: Classes for the menu content (e.g. a wider `min-w-*`).
---
::

| Slot     |                                                              |
| -------- | ------------------------------------------------------------ |
| default  | The menu items.                                              |
| `footer` | A muted row after a separator, at the bottom of the menu.    |
