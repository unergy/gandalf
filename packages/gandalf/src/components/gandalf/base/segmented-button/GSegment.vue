<script setup lang="ts">
import type { ToggleGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { gandalfSegmentVariants } from './index'

// Figma: Segment. State=Enabled / Hovered / Pressed / Activeded ("Activated") map to the
// rest, hover, active and data-state=on styles of the toggle item.
const props = defineProps<ToggleGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToggleGroupItem
    v-bind="delegatedProps"
    data-slot="segment"
    :class="cn(gandalfSegmentVariants(), props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
