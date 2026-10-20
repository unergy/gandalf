---
title: GPopover
description: A floating panel anchored to a trigger — filters, mini forms, anything that should not take over the screen.
status: complete
---

## Preview

::popover-preview
::

## Usage

```vue
<script setup lang="ts">
import { GButton } from '@/components/gandalf/base/button'
import { GPopover, GPopoverContent, GPopoverTrigger } from '@/components/gandalf/base/popover'
</script>

<template>
  <GPopover>
    <GPopoverTrigger as-child>
      <GButton variant="outline">Open</GButton>
    </GPopoverTrigger>
    <GPopoverContent class="w-72">Anything you like.</GPopoverContent>
  </GPopover>
</template>
```

## Popover or Dialog?

A popover is **non-modal**: the page behind it stays live, and it is anchored to the control that
opened it. Reach for `GDialog` when the task must be finished or abandoned before anything else
happens, and for a popover when the panel is an extension of the control next to it.

## Controlling the open state

`v-model:open` on the root. Useful when something other than the trigger has to close the panel —
a save that succeeded, a route change.

```vue
<GPopover v-model:open="open">
  <!-- ... -->
</GPopover>
```

## Placement

`GPopoverContent` takes the positioning props of the underlying primitive: `side`, `sideOffset`,
`align`, `alignOffset`, `avoidCollisions`. Defaults are `side="bottom"`, `align="center"`,
`sideOffset="4"`.

```vue
<GPopoverContent side="right" align="start" :side-offset="8" />
```

## Anchoring somewhere else

By default the panel is anchored to the trigger. `GPopoverAnchor` moves that anchor to any other
element, for the case where the control that opens the panel is not the one it should hang off —
a small button inside a wide row that the panel should align with.

```vue
<GPopover>
  <GPopoverAnchor class="w-full">
    <div class="flex items-center justify-between">
      Row
      <GPopoverTrigger as-child><GButton size="icon-sm">···</GButton></GPopoverTrigger>
    </div>
  </GPopoverAnchor>
  <GPopoverContent>Aligned to the row, not the button.</GPopoverContent>
</GPopover>
```

## Source

Lives in `gandalf/base/` — a drop-in wrapper over shadcn's `Popover`. It adds no variants of its
own: a panel's look is the caller's business, so pass `class` rather than reaching for a variant.

## Components

| Component | Description |
|---|---|
| `GPopover` | The root. Owns the open state, exposes `{ open }` on its default slot. |
| `GPopoverTrigger` | The control that opens the panel. Use `as-child` to keep your own element. |
| `GPopoverAnchor` | Optional. The element the panel is positioned against, when it is not the trigger. |
| `GPopoverContent` | The floating panel itself. Rendered in a portal. |

## Props

### GPopover

::docs-props-table
---
items:
  - name: open
    type: boolean
    default: "undefined"
    description: "The open state. Use with `v-model:open`."
  - name: defaultOpen
    type: boolean
    default: "false"
    description: "Open state on first render, for when it does not need to be controlled."
  - name: modal
    type: boolean
    default: "false"
    description: "Blocks interaction with the rest of the page and hides it from screen readers while open."
---
::

### GPopoverContent

::docs-props-table
---
items:
  - name: side
    type: "'top' | 'right' | 'bottom' | 'left'"
    default: "'bottom'"
    description: "Which side of the anchor the panel prefers."
  - name: sideOffset
    type: number
    default: "4"
    description: "Distance in pixels from the anchor."
  - name: align
    type: "'start' | 'center' | 'end'"
    default: "'center'"
    description: "Alignment against the anchor."
  - name: alignOffset
    type: number
    default: "0"
    description: "Offset from the alignment edge, in pixels."
  - name: avoidCollisions
    type: boolean
    default: "true"
    description: "Flips or shifts the panel to keep it inside the viewport."
  - name: forceMount
    type: boolean
    default: "false"
    description: "Keeps the panel mounted while closed. For animating it yourself."
  - name: class
    type: string
    default: "undefined"
    description: "Merged onto the panel."
---
::

## Events

| Event | Payload | Description |
|---|---|---|
| `update:open` | `boolean` | Emitted when the panel opens or closes. |
| `escapeKeyDown` | `KeyboardEvent` | Escape was pressed. Call `preventDefault()` to keep the panel open. |
| `pointerDownOutside` | `PointerDownOutsideEvent` | A pointer went down outside the panel. |
| `focusOutside` | `FocusOutsideEvent` | Focus moved outside the panel. |
| `interactOutside` | `PointerDownOutsideEvent \| FocusOutsideEvent` | Either of the two above. |
| `openAutoFocus` | `Event` | Focus is about to move into the panel. |
| `closeAutoFocus` | `Event` | Focus is about to return to the trigger. |
