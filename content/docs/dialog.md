---
title: GDialog
description: A modal dialog overlay for focused user interactions.
---

# GDialog

A compound dialog built on top of shadcn/ui's `Dialog` primitives. Provides a modal overlay with header, footer, title, description, close button, and a scrollable variant.

## Usage

```vue
<template>
  <GDialog>
    <GDialogTrigger as-child>
      <button>Edit profile</button>
    </GDialogTrigger>
    <GDialogContent>
      <GDialogHeader>
        <GDialogTitle>Edit profile</GDialogTitle>
        <GDialogDescription>
          Make changes to your profile here. Click save when you're done.
        </GDialogDescription>
      </GDialogHeader>
      <!-- form fields here -->
      <GDialogFooter>
        <button>Save changes</button>
      </GDialogFooter>
    </GDialogContent>
  </GDialog>
</template>

<script setup lang="ts">
import {
  GDialog,
  GDialogTrigger,
  GDialogContent,
  GDialogHeader,
  GDialogFooter,
  GDialogTitle,
  GDialogDescription,
} from '@/components/gandalf/dialog'
</script>
```

## Controlled usage

```vue
<template>
  <GDialog v-model:open="open">
    <GDialogContent>
      <GDialogHeader>
        <GDialogTitle>Settings</GDialogTitle>
      </GDialogHeader>
      <!-- content -->
    </GDialogContent>
  </GDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
```

## Scrollable content

Use `GDialogScrollContent` for dialogs with long content that needs to scroll:

```vue
<GDialog>
  <GDialogTrigger as-child>
    <button>Terms</button>
  </GDialogTrigger>
  <GDialogScrollContent>
    <GDialogHeader>
      <GDialogTitle>Terms of Service</GDialogTitle>
    </GDialogHeader>
    <!-- long content -->
  </GDialogScrollContent>
</GDialog>
```

## Hide close button

```vue
<GDialogContent :show-close-button="false">
  <!-- content without the X close button -->
</GDialogContent>
```

## Components

| Component | Description |
|---|---|
| `GDialog` | Root component. Manages open state (`v-model:open`) |
| `GDialogTrigger` | Button that opens the dialog |
| `GDialogContent` | Modal overlay and content container (with close button) |
| `GDialogScrollContent` | Scrollable variant of the content container |
| `GDialogHeader` | Groups title and description |
| `GDialogFooter` | Groups action buttons (supports `showCloseButton`) |
| `GDialogTitle` | Dialog title |
| `GDialogDescription` | Dialog description text |
| `GDialogClose` | Explicit close button/trigger |
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

## GDialogContent Props

::docs-props-table
---
items:
  - name: showCloseButton
    type: "boolean"
    default: "true"
    description: Whether to show the X close button.
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
    description: Whether to show a close button in the footer.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::
