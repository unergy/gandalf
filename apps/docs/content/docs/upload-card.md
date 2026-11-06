---
title: GUploadCard
description: A row for a file being uploaded, with its size, status, type badge and action.
status: complete
---

# GUploadCard

One row of an upload list: the file icon, its name, a meta line with the size and the status, a badge with the file type and a single action. It follows the **Upload & Download → Upload Card** component in Figma; prop names match the design's properties.

## Preview

::upload-card-preview
::

## Usage

```vue
<template>
  <div class="flex flex-col gap-2">
    <GUploadCard
      v-for="file in files"
      :key="file.name"
      :type="file.state"
      :file-name="file.name"
      :file-size="file.size"
      file-type="KML"
      :progress="file.progress"
      @remove="remove(file)"
      @retry="retry(file)"
    />
  </div>
</template>

<script setup lang="ts">
import { GUploadCard } from '@unergy-dev/gandalf'
</script>
```

### Types

| `type` | Figma | Status line | Action |
|---|---|---|---|
| `queue` (default) | Type=Queue | "Queue" in `base/foreground-extra-quiet` | `X`, emits `remove` |
| `in-progress` | Type=In progress | `progress` as "25%" | `X`, emits `remove` |
| `completed` | Type=Completed | "Completed" in `success` | `X`, emits `remove` |
| `error` | Type=Error | "Error" in `destructive` | `RefreshCw`, emits `retry` |

Figma's row has no progress bar: the percentage is the only feedback while a file uploads. Put a `GProgressBar` under the list if the whole upload needs one.

## GUploadCard Props

::docs-props-table
---
items:
  - name: fileName
    type: "string"
    default: "—"
    description: File name, truncated to one line.
  - name: type
    type: "'queue' | 'in-progress' | 'completed' | 'error'"
    default: "'queue'"
    description: Upload state, as the Type property in Figma.
  - name: fileSize
    type: "string"
    default: undefined
    description: Shown as given before the status, e.g. "45 MB".
  - name: progress
    type: "number"
    default: undefined
    description: Percentage of in-progress, rendered as "25%".
  - name: fileType
    type: "string"
    default: undefined
    description: Badge label, e.g. "KML". Hidden when empty.
  - name: statusLabel
    type: "string"
    default: undefined
    description: Replaces the status word at the end of the meta line.
---
::

## Events

| Event | When |
|---|---|
| `remove` | The `X` button is clicked |
| `retry` | The retry button of `type="error"` is clicked |

## Slots

| Slot | Content |
|---|---|
| `icon` | Replaces the file icon. |
| `status` | Replaces the status word of the meta line. |
| `badge` | Replaces the file type badge. |
| `actions` | Replaces the button on the right. |
