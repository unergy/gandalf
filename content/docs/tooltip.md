---
title: GTooltip
description: A short informational message displayed on hover.
status: in-progress
---

# GTooltip

A wrapper around shadcn/ui's `Tooltip`, built on top of Reka UI's `Tooltip` primitive. Displays a short label when hovering over an interactive element. Requires `GTooltipProvider` at the app root (or around the section that uses tooltips).

This first iteration only wraps the shadcn primitives — no visual variants yet. Those will land once a design reference is available.

## Preview

::tooltip-preview
::

## Usage

```vue
<template>
  <GTooltipProvider>
    <GTooltip>
      <GTooltipTrigger as-child>
        <Button variant="outline">Hover me</Button>
      </GTooltipTrigger>
      <GTooltipContent>
        <p>Add to library</p>
      </GTooltipContent>
    </GTooltip>
  </GTooltipProvider>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { GTooltip, GTooltipProvider, GTooltipTrigger, GTooltipContent } from '@/components/gandalf/base/tooltip'
</script>
```

## Components

| Component | Description |
|---|---|
| `GTooltipProvider` | Shares delay/timing configuration across all tooltips inside it |
| `GTooltip` | Root component. Manages open state (`v-model:open`) |
| `GTooltipTrigger` | The element that toggles the tooltip on hover/focus. Use `as-child` to render your own element |
| `GTooltipContent` | The floating label shown when the tooltip is open |

## GTooltip Props

`GTooltip` extends all props from Reka UI's [`TooltipRoot`](https://reka-ui.com/docs/components/tooltip).

::docs-props-table
---
items:
  - name: defaultOpen
    type: "boolean"
    default: undefined
    description: The default open state (uncontrolled).
  - name: open
    type: "boolean"
    default: undefined
    description: The open state (controlled, use with v-model:open).
  - name: delayDuration
    type: "number"
    default: "700"
    description: Override the Provider's open delay for this tooltip.
  - name: disabled
    type: "boolean"
    default: "false"
    description: When true, disables the tooltip.
---
::

## GTooltipProvider Props

`GTooltipProvider` extends all props from Reka UI's [`TooltipProvider`](https://reka-ui.com/docs/components/tooltip).

::docs-props-table
---
items:
  - name: delayDuration
    type: "number"
    default: "0"
    description: Duration from pointer-enter to tooltip open, for all tooltips inside.
  - name: skipDelayDuration
    type: "number"
    default: "300"
    description: Time a user has to move to another trigger without incurring the delay again.
  - name: disableHoverableContent
    type: "boolean"
    default: "false"
    description: When true, hovering the content does not keep the tooltip open.
---
::
