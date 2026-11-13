---
title: GDialog
description: A modal dialog overlay for focused user interactions.
status: complete
---

# GDialog

A compound modal dialog built on top of shadcn/ui's `Dialog` primitives, styled from the Figma page **Dialogs**.

## Preview

::dialog-preview
::

## Anatomy

Built from the Figma page **Dialogs**. The card is `card/card` with a 24px radius and the `LG` elevation, 416px wide by default. It has no padding of its own: every band brings it.

- **`GDialogHeader`** is Figma's *Dialog Header*: 72px tall, title in Heading/md (24px semibold). `type="left"` (default) shows an optional icon (`#icon` slot, 24px) and a Ghost primary close button; `type="center"` shows only the centred title.
- **`GDialogBody`** is a content band (24px on the sides, 12px top and bottom, 20px between fields). Stack several, as in Figma's *Dialog Form*: one for the description, one for the form.
- **`GDialogFooter`** is Figma's *Group Button*: 24px padding, 8px between buttons, aligned to the right.

## Usage

```vue
<template>
  <GDialog>
    <GDialogTrigger as-child>
      <GButton variant="outline-primary">Edit profile</GButton>
    </GDialogTrigger>
    <GDialogContent>
      <GDialogHeader>
        <GDialogTitle>Edit profile</GDialogTitle>
      </GDialogHeader>
      <GDialogBody>
        <GDialogDescription>
          Make changes to your profile here. Click save when you're done.
        </GDialogDescription>
      </GDialogBody>
      <GDialogBody>
        <!-- form fields here -->
      </GDialogBody>
      <GDialogFooter>
        <GDialogClose as-child>
          <GButton variant="outline-primary">Cancel</GButton>
        </GDialogClose>
        <GButton>Save changes</GButton>
      </GDialogFooter>
    </GDialogContent>
  </GDialog>
</template>

<script setup lang="ts">
import {
  GButton,
  GDialog,
  GDialogBody,
  GDialogClose,
  GDialogContent,
  GDialogDescription,
  GDialogFooter,
  GDialogHeader,
  GDialogTitle,
  GDialogTrigger,
} from '@unergy-dev/gandalf'
</script>
```

## Header with icon or centred

```vue
<GDialogHeader>
  <template #icon><ClipboardCheck /></template>
  <GDialogTitle>Title</GDialogTitle>
</GDialogHeader>

<GDialogHeader type="center">
  <GDialogTitle>Title</GDialogTitle>
</GDialogHeader>
```

Use `:show-close-button="false"` on a left header to hide the X.

## Wider dialogs

Figma's *Steps Form* and *Dual* examples are wider. Pass the width to the content:

```vue
<GDialogContent class="sm:max-w-[851px]">
  <!-- ... -->
</GDialogContent>
```

## Controlled usage

```vue
<template>
  <GDialog v-model:open="open">
    <GDialogContent>
      <GDialogHeader>
        <GDialogTitle>Settings</GDialogTitle>
      </GDialogHeader>
      <GDialogBody>
        <!-- content -->
      </GDialogBody>
    </GDialogContent>
  </GDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
```

## Scrollable content

Use `GDialogScrollContent` for dialogs with long content: the whole dialog scrolls inside the overlay.

```vue
<GDialog>
  <GDialogTrigger as-child>
    <GButton variant="outline-primary">Terms</GButton>
  </GDialogTrigger>
  <GDialogScrollContent>
    <GDialogHeader>
      <GDialogTitle>Terms of Service</GDialogTitle>
    </GDialogHeader>
    <GDialogBody><!-- long content --></GDialogBody>
  </GDialogScrollContent>
</GDialog>
```

## Components

| Component | Description |
|---|---|
| `GDialog` | Root component. Manages open state (`v-model:open`) |
| `GDialogTrigger` | Element that opens the dialog |
| `GDialogContent` | Overlay and card |
| `GDialogScrollContent` | Same card, scrolling inside the overlay |
| `GDialogHeader` | Figma's Dialog Header: icon, title and close button (`type` left / center) |
| `GDialogBody` | Content band between header and footer |
| `GDialogFooter` | Figma's Group Button (supports `showCloseButton`) |
| `GDialogTitle` | Dialog title (Heading/md) |
| `GDialogDescription` | Description text (Body/md) |
| `GDialogClose` | Closes the dialog; use `as-child` around a `GButton` |
| `GDialogOverlay` | The backdrop overlay |

## GDialog Props

`GDialog` extends all props from Reka UI's [`DialogRoot`](https://reka-ui.com/docs/components/dialog).

::docs-props-table
---
items:
  - name: open
    type: "boolean"
    default: undefined
    description: Controlled open state (v-model:open).
  - name: defaultOpen
    type: "boolean"
    default: undefined
    description: Default open state (uncontrolled).
  - name: modal
    type: "boolean"
    default: "true"
    description: Whether the dialog is modal.
---
::

## GDialogHeader Props

::docs-props-table
---
items:
  - name: type
    type: "'left' | 'center'"
    default: "'left'"
    description: Figma's Type. Left shows the icon slot and the close button; Center only the centred title.
  - name: showCloseButton
    type: "boolean"
    default: "true"
    description: Shows the Ghost primary close button (left only).
  - name: closeLabel
    type: "string"
    default: "'Close'"
    description: Accessible label of the close button.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::

## GDialogFooter Props

::docs-props-table
---
items:
  - name: showCloseButton
    type: "boolean"
    default: "false"
    description: Adds an Outline primary button that closes the dialog.
  - name: closeLabel
    type: "string"
    default: "'Close'"
    description: Text of that button.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::
