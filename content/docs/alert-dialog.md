---
title: GAlertDialog
description: A modal dialog that interrupts the user and expects a confirmation or cancellation.
---

# GAlertDialog

A compound alert dialog built on top of shadcn/ui's `AlertDialog` primitives. It blocks interaction with the rest of the page until the user responds.

## Usage

```vue
<template>
  <GAlertDialog>
    <GAlertDialogTrigger as-child>
      <button>Delete account</button>
    </GAlertDialogTrigger>
    <GAlertDialogContent>
      <GAlertDialogHeader>
        <GAlertDialogTitle>Are you absolutely sure?</GAlertDialogTitle>
        <GAlertDialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </GAlertDialogDescription>
      </GAlertDialogHeader>
      <GAlertDialogFooter>
        <GAlertDialogCancel>Cancel</GAlertDialogCancel>
        <GAlertDialogAction>Continue</GAlertDialogAction>
      </GAlertDialogFooter>
    </GAlertDialogContent>
  </GAlertDialog>
</template>

<script setup lang="ts">
import {
  GAlertDialog,
  GAlertDialogTrigger,
  GAlertDialogContent,
  GAlertDialogHeader,
  GAlertDialogFooter,
  GAlertDialogTitle,
  GAlertDialogDescription,
  GAlertDialogAction,
  GAlertDialogCancel,
} from '@/components/gandalf/alert-dialog'
</script>
```

## Controlled usage

```vue
<template>
  <GAlertDialog v-model:open="open">
    <GAlertDialogContent>
      <GAlertDialogHeader>
        <GAlertDialogTitle>Confirm action</GAlertDialogTitle>
        <GAlertDialogDescription>Do you want to proceed?</GAlertDialogDescription>
      </GAlertDialogHeader>
      <GAlertDialogFooter>
        <GAlertDialogCancel>No</GAlertDialogCancel>
        <GAlertDialogAction>Yes</GAlertDialogAction>
      </GAlertDialogFooter>
    </GAlertDialogContent>
  </GAlertDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
```

## Components

| Component | Description |
|---|---|
| `GAlertDialog` | Root component. Manages open state (`v-model:open`) |
| `GAlertDialogTrigger` | Button that opens the dialog |
| `GAlertDialogContent` | The modal overlay and content container |
| `GAlertDialogHeader` | Groups title and description |
| `GAlertDialogFooter` | Groups action buttons |
| `GAlertDialogTitle` | Dialog title |
| `GAlertDialogDescription` | Dialog description text |
| `GAlertDialogAction` | Confirm button (styled as primary) |
| `GAlertDialogCancel` | Cancel button (styled as outline) |

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
