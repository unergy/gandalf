---
title: GAlert
description: An alert component for displaying important messages with variant support.
---

# GAlert

An alert component built on top of `Alert` from shadcn/ui. Use it to display contextual feedback messages — informational or destructive.

## Usage

```vue
<template>
  <GAlert>
    <Terminal class="size-4" />
    <GAlertTitle>Heads up!</GAlertTitle>
    <GAlertDescription>
      You can add components to your app using the CLI.
    </GAlertDescription>
  </GAlert>
</template>

<script setup lang="ts">
import { GAlert, GAlertTitle, GAlertDescription } from '@/components/gandalf/alert'
import { Terminal } from 'lucide-vue-next'
</script>
```

## Variants

### Default

```vue
<GAlert>
  <Terminal class="size-4" />
  <GAlertTitle>Heads up!</GAlertTitle>
  <GAlertDescription>You can add components to your app using the CLI.</GAlertDescription>
</GAlert>
```

### Destructive

```vue
<GAlert variant="destructive">
  <AlertCircle class="size-4" />
  <GAlertTitle>Error</GAlertTitle>
  <GAlertDescription>Your session has expired. Please log in again.</GAlertDescription>
</GAlert>
```

## Sub-components

| Component | Description |
|---|---|
| `GAlert` | Root container with `role="alert"` |
| `GAlertTitle` | Title text inside the alert |
| `GAlertDescription` | Description text inside the alert |

## GAlert Props

::docs-props-table
---
items:
  - name: variant
    type: "'default' | 'destructive'"
    default: "'default'"
    description: Visual style of the alert.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes to apply.
---
::
