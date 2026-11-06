---
title: GUploadBox
description: A dashed drop zone that opens the file picker and shows the chosen file.
status: in-progress
---

# GUploadBox

The dashed box that starts an upload. It opens the file picker on click, accepts files dropped on it, and turns into a blue summary of the chosen file. It follows the **Upload & Download → Upload Box** component in Figma; prop names match the design's properties.

## Preview

::upload-box-preview
::

## Usage

```vue
<template>
  <GUploadBox
    label="Soportes"
    required
    title="Arrastra tus archivos"
    description="PDF o XLSX, hasta 10 MB"
    accept=".pdf,.xlsx"
    :file-name="fileName"
    @files="onFiles"
    @remove="fileName = undefined"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GUploadBox } from '@unergy/gandalf'

const fileName = ref<string | undefined>(undefined)

function onFiles(files: File[]) {
  fileName.value = files[0]?.name
}
</script>
```

### Sizes and states

| Figma | Code |
|---|---|
| Size=md | `size="md"` (default): 112px box, icon over a title and a description |
| Size=sm | `size="sm"`: 56px box, icon and title on one row |
| State=Enabled | Resting: `base/base` fill, dashed `bni/border-loud` border and an upload icon |
| State=Hovered | `:hover` and drag-over: `blue/50` fill, `action` text, down arrow and `dropTitle` |
| State=Activated | `fileName` is set: `action/object` fill, `action/objectFg` border, file name and a clear button |

The box never stores the file itself: `files` hands over the `File[]` and the parent decides what to show in `fileName`.

## GUploadBox Props

::docs-props-table
---
items:
  - name: size
    type: "'md' | 'sm'"
    default: "'md'"
    description: Box height and layout, as the Size property in Figma.
  - name: label
    type: "string"
    default: undefined
    description: Label above the box. Omit it to hide the label.
  - name: required
    type: "boolean"
    default: "false"
    description: Red asterisk after the label.
  - name: title
    type: "string"
    default: "'Title'"
    description: Main line inside the box.
  - name: description
    type: "string"
    default: undefined
    description: Second line, only shown in md.
  - name: dropTitle
    type: "string"
    default: "'Drop your file here'"
    description: Title of the hovered and drag-over state.
  - name: fileName
    type: "string"
    default: undefined
    description: Name of the chosen file. Set it to render State=Activated.
  - name: accept
    type: "string"
    default: undefined
    description: accept of the underlying file input.
  - name: multiple
    type: "boolean"
    default: "false"
    description: multiple of the underlying file input.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Blocks the picker and drops, and greys the box out.
---
::

## Events

| Event | Payload | When |
|---|---|---|
| `files` | `File[]` | A file is chosen in the picker or dropped on the box |
| `remove` | — | The clear button of the activated state is clicked |

## Slots

| Slot | Content |
|---|---|
| `icon` | Replaces the upload icon of the resting state. |
| `file-icon` | Replaces the file icon of the activated state. |
