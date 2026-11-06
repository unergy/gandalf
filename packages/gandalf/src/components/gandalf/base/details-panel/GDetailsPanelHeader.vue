<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from 'lucide-vue-next'
import { SheetHeader } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { GButton } from '@/components/gandalf/base/button'
import GDetailsPanelClose from './GDetailsPanelClose.vue'
import { gandalfDetailsPanelHeaderVariants } from './index'

// Figma: Detail Panel → Header. Title on the left, Ghost primary md button with an X on the right.
const props = withDefaults(
  defineProps<{
    /** Figma always draws the close button; set to false to supply your own action. */
    showCloseButton?: boolean
    closeLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    showCloseButton: true,
    closeLabel: 'Close',
    class: undefined,
  },
)
</script>

<template>
  <SheetHeader :class="cn(gandalfDetailsPanelHeaderVariants(), props.class)">
    <slot />
    <GDetailsPanelClose v-if="showCloseButton" as-child>
      <GButton variant="ghost-primary" size="md" class="shrink-0" :aria-label="closeLabel">
        <X />
      </GButton>
    </GDetailsPanelClose>
  </SheetHeader>
</template>
