<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Option } from '@/components/gandalf/types'

const props = defineProps<{
    options: Option[]
    label?: string
    disabled?: boolean
}>()

const emit = defineEmits<{
    select: [option: Option]
}>()

function handleSelect(option: Option) {
    if (option.disabled) return
    emit('select', option)
}
</script>

<template>
    <DropdownMenu v-slot="{ open }">
        <DropdownMenuTrigger :as-child="true" :disabled="disabled">
            <slot :open="open" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <template v-if="label">
                <DropdownMenuLabel>{{ label }}</DropdownMenuLabel>
                <DropdownMenuSeparator />
            </template>
            <DropdownMenuItem v-for="option in options" :key="option.value" :disabled="option.disabled"
                @click="handleSelect(option)">
                {{ option.label }}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
