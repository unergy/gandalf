<script setup lang="ts">
import type { DropdownMenuSubEmits, DropdownMenuSubProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenuSub } from '@/components/ui/dropdown-menu'

// A nested menu: a `GMenuSubTrigger` row that opens a `GMenuSubContent` to its side.
const props = defineProps<DropdownMenuSubProps>()
const emits = defineEmits<DropdownMenuSubEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuSub v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </DropdownMenuSub>
</template>
