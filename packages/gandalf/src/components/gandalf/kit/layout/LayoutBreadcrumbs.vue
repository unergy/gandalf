<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { GButton } from '@/components/gandalf/base/button'
import { cn } from '@/lib/utils'
import { gandalfLayoutBreadcrumbsVariants } from './index'

// Figma: Second Level Layout › Title (top row) — a back button, the breadcrumbs and the page
// tools on the right (history, Tools…).
const props = withDefaults(
  defineProps<{
    /** Shows the back button (Ghost primary sm with `arrow-left`). */
    back?: boolean
    /** Accessible name of the back button. */
    backLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    back: true,
    backLabel: 'Back',
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'back', event: MouseEvent): void
}>()
</script>

<template>
  <div data-slot="layout-breadcrumbs" :class="cn(gandalfLayoutBreadcrumbsVariants(), props.class)">
    <GButton
      v-if="back"
      variant="ghost-primary"
      size="sm"
      :aria-label="backLabel"
      @click="(event: MouseEvent) => emit('back', event)"
    >
      <ArrowLeft />
    </GButton>
    <div class="flex min-w-0 flex-1 items-center">
      <slot />
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
