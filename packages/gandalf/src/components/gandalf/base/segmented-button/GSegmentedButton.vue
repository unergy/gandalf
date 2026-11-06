<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { gandalfSegmentedButtonVariants } from './index'

// Figma: Segmented Button. Type=Two…Six is just the number of segments, so it is not a prop:
// render as many GSegment as you need.
const props = withDefaults(
  defineProps<ToggleGroupRootProps & { class?: HTMLAttributes['class'] }>(),
  { type: 'single' },
)

const emits = defineEmits<ToggleGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToggleGroup
    v-slot="slotProps"
    v-bind="delegatedProps"
    data-slot="segmented-button"
    :class="cn(gandalfSegmentedButtonVariants(), props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroup>
</template>
