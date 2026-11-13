---
title: GAlertDialog
description: A modal dialog that interrupts the user and expects a confirmation or cancellation.
status: complete
---

# GAlertDialog

A compound alert dialog built on top of shadcn/ui's `AlertDialog` primitives, styled from Figma's *Dialog Notification*. It blocks interaction with the rest of the page until the user responds.

## Preview

::alert-dialog-preview
::

## Anatomy

Same card, bands and styles as [`GDialog`](/docs/dialog), following Figma's *Dialog Notification*: the header is centred by default (`type="center"`) and has no close button, since the user must answer with one of the actions. `GAlertDialogCancel` is an Outline primary button and `GAlertDialogAction` a Tonal primary one; both take `variant` and `size` like `GButton`.

## Usage

```vue
<template>
  <GAlertDialog>
    <GAlertDialogTrigger as-child>
      <GButton variant="outline-destructive">Delete account</GButton>
    </GAlertDialogTrigger>
    <GAlertDialogContent>
      <GAlertDialogHeader>
        <GAlertDialogTitle>Are you absolutely sure?</GAlertDialogTitle>
      </GAlertDialogHeader>
      <GAlertDialogBody>
        <GAlertDialogDescription class="text-center">
          This action cannot be undone.
        </GAlertDialogDescription>
      </GAlertDialogBody>
      <!-- Figma's Notification gives both buttons the same width -->
      <GAlertDialogFooter class="[&>*]:flex-1">
        <GAlertDialogCancel>Cancel</GAlertDialogCancel>
        <GAlertDialogAction variant="tonal-destructive">Delete</GAlertDialogAction>
      </GAlertDialogFooter>
    </GAlertDialogContent>
  </GAlertDialog>
</template>

<script setup lang="ts">
import {
  GAlertDialog,
  GAlertDialogAction,
  GAlertDialogBody,
  GAlertDialogCancel,
  GAlertDialogContent,
  GAlertDialogDescription,
  GAlertDialogFooter,
  GAlertDialogHeader,
  GAlertDialogTitle,
  GAlertDialogTrigger,
  GButton,
} from '@unergy-dev/gandalf'
</script>
```

## Components

| Component | Description |
|---|---|
| `GAlertDialog` | Root component. Manages open state (`v-model:open`) |
| `GAlertDialogTrigger` | Element that opens the dialog |
| `GAlertDialogContent` | Overlay and card |
| `GAlertDialogHeader` | Figma's Dialog Header (`type` center / left, `#icon` slot with left) |
| `GAlertDialogBody` | Content band between header and footer |
| `GAlertDialogFooter` | Figma's Group Button |
| `GAlertDialogTitle` | Dialog title (Heading/md) |
| `GAlertDialogDescription` | Description text (Body/md) |
| `GAlertDialogAction` | Confirm button (Tonal primary by default) |
| `GAlertDialogCancel` | Cancel button (Outline primary by default) |

## GAlertDialog Props

`GAlertDialog` extends all props from Reka UI's [`AlertDialogRoot`](https://reka-ui.com/docs/components/alert-dialog).

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
---
::

## GAlertDialogHeader Props

::docs-props-table
---
items:
  - name: type
    type: "'center' | 'left'"
    default: "'center'"
    description: Figma's Type. Left shows the icon slot.
---
::

## GAlertDialogAction / GAlertDialogCancel Props

::docs-props-table
---
items:
  - name: variant
    type: "GandalfButtonVariant"
    default: "'tonal-primary' / 'outline-primary'"
    description: Button type, as in GButton.
  - name: size
    type: "'md' | 'sm' | 'xs'"
    default: "'md'"
    description: Button size, as in GButton.
---
::
