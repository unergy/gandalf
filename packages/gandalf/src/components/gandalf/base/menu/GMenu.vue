<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

// Figma: Dropdown menu with free content. `GDropdown` renders a list of `options`; this one takes
// `GMenuItem`, `GMenuLabel` and `GMenuSeparator` as children, for icons, groups and red items.
const props = defineProps<DropdownMenuRootProps>()
const emits = defineEmits<DropdownMenuRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenu v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DropdownMenu>
</template>
