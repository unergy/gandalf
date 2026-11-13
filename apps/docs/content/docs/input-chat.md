---
title: GInputChat
description: The field to write a chat message, with attachments and a send button.
status: complete
---

# GInputChat

The composer of a chat: a text that grows with its content, buttons to attach a file or an image and the send button. It follows the **Chat → Input Chat** component in Figma and its examples "Files Chat Globe" and "Editing Comment".

## Preview

::input-chat-preview
::

## Usage

```vue
<template>
  <GInputChat
    v-model="text"
    placeholder="Escribe un comentario..."
    @send="send"
    @attach-file="pickFile"
    @attach-image="pickImage"
  >
    <template #attachments>
      <GMiniatures
        v-for="file in files"
        :key="file.name"
        :file-name="file.name"
        file-type="PDF"
        @remove="files.splice(files.indexOf(file), 1)"
      />
    </template>
  </GInputChat>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GInputChat, GMiniatures } from '@unergy-dev/gandalf'

const text = ref('')
const files = ref<{ name: string }[]>([])

function send(value: string) {
  // ...
  text.value = ''
}
</script>
```

### States

| Figma | Code |
|---|---|
| Status=Enabled | 1px `bni/border-loud` border, MD shadow |
| Status=Focused | `:focus-within`: 2px `primary/primary` border; attach buttons in `secondary/foreground` |
| Text configuration=Placeholder | Empty `v-model`: placeholder in `base/foreground-extra-quiet`, send button disabled |
| Text configuration=Input text | Text in `base/foreground`, send button enabled |
| Editing Comment (example) | `editing`: block with "Editando" in Information colors; attach buttons disabled |

Enter sends the message and Shift+Enter adds a line. The text grows up to 160px and then scrolls.

## GInputChat Props

::docs-props-table
---
items:
  - name: modelValue
    type: "string"
    default: "''"
    description: The text (v-model).
  - name: placeholder
    type: "string"
    default: undefined
    description: Shown while the text is empty.
  - name: editing
    type: "string"
    default: undefined
    description: Text of the comment being edited. Shows the "Editando" block and disables the attach buttons.
  - name: editingLabel
    type: "string"
    default: "'Editando'"
    description: Title of the editing block.
  - name: canSend
    type: "boolean"
    default: undefined
    description: Enables the send button. By default it is enabled when there is text.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the text and every button.
  - name: attachFileLabel
    type: "string"
    default: "'Attach file'"
    description: Accessible name of the file button.
  - name: attachImageLabel
    type: "string"
    default: "'Attach image'"
    description: Accessible name of the image button.
  - name: sendLabel
    type: "string"
    default: "'Send'"
    description: Accessible name of the send button.
---
::

## Events

| Event | When |
|---|---|
| `update:modelValue` | The text changes |
| `send` | The send button is clicked or Enter is pressed with sending enabled; receives the text |
| `attach-file` | The file button is clicked |
| `attach-image` | The image button is clicked |

## Slots

| Slot | Content |
|---|---|
| `attachments` | Attachments above the text, 6px apart. |
| `actions` | Replaces the attach buttons. |
