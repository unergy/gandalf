<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  gandalfDetailsPanelSectionTitleVariants,
  gandalfDetailsPanelSectionVariants,
} from './index'

// Figma: Detail Panel → Content → "Visualization Panel". A base/base card that groups fields under
// a title. Figma types the titles in capitals; the text is passed as-is, with no `uppercase`.
const props = withDefaults(
  defineProps<{
    title?: string
    class?: HTMLAttributes['class']
    titleClass?: HTMLAttributes['class']
  }>(),
  { title: undefined, class: undefined, titleClass: undefined },
)
</script>

<template>
  <section
    data-slot="details-panel-section"
    :class="cn(gandalfDetailsPanelSectionVariants(), props.class)"
  >
    <div
      v-if="title || $slots.title"
      data-slot="details-panel-section-title"
      :class="cn(gandalfDetailsPanelSectionTitleVariants(), props.titleClass)"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
  </section>
</template>
