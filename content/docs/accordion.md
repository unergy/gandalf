---
title: GAccordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
status: in-progress
---

# GAccordion

A wrapper around shadcn/ui's `Accordion`, built on top of Reka UI's `Accordion` primitive. Useful for collapsible FAQ sections, settings panels, and content trees.

## Preview

::accordion-preview
::

## Usage

```vue
<template>
  <GAccordion type="single" collapsible default-value="item-1">
    <GAccordionItem value="item-1">
      <GAccordionTrigger>Is it accessible?</GAccordionTrigger>
      <GAccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</GAccordionContent>
    </GAccordionItem>
  </GAccordion>
</template>

<script setup lang="ts">
import {
  GAccordion,
  GAccordionContent,
  GAccordionItem,
  GAccordionTrigger,
} from '@/components/gandalf/base/accordion'
</script>
```

## Components

| Component | Description |
|---|---|
| `GAccordion` | Root component. Set `type="single"` or `type="multiple"` and `v-model` to control open items |
| `GAccordionItem` | A single collapsible section. Requires a unique `value` |
| `GAccordionTrigger` | The heading that toggles its item. Use the `icon` slot to replace the default chevron |
| `GAccordionContent` | The collapsible content, animated on open/close |

## GAccordion Props

`GAccordion` extends all props from Reka UI's [`Accordion`](https://reka-ui.com/docs/components/accordion).

::docs-props-table
---
items:
  - name: type
    type: "'single' | 'multiple'"
    default: "'single'"
    description: Whether one or multiple items can be open at the same time.
  - name: collapsible
    type: "boolean"
    default: "false"
    description: When type is single, allows closing the open item by clicking it again.
  - name: modelValue
    type: "string | string[]"
    default: undefined
    description: The controlled value of the open item(s). Use with v-model.
  - name: defaultValue
    type: "string | string[]"
    default: undefined
    description: The default open item(s) when uncontrolled.
  - name: disabled
    type: "boolean"
    default: "false"
    description: When true, disables the whole accordion.
---
::
