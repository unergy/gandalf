<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import type { HTMLAttributes } from 'vue'
import type { Option } from '@/components/gandalf/types'
import type { GandalfBadgeColor, GandalfBadgeVariants } from '@/components/gandalf/badge'
import GBadge from '@/components/gandalf/badge/GBadge.vue'
import Dropdown from '@/components/blocks/dropdown/Dropdown.vue'

const props = defineProps<{
    // Dropdown props
    options: Option[]
    modelValue?: string | number
    label?: string
    disabled?: boolean
    // Badge props
    placeholder?: string
    variant?: GandalfBadgeVariants['variant']
    color?: GandalfBadgeColor
    shape?: GandalfBadgeVariants['shape']
    size?: GandalfBadgeVariants['size']
    class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
    select: [option: Option]
}>()
</script>

<template>
    <Dropdown :options="options" :model-value="modelValue" :label="label" :disabled="disabled"
        @update:model-value="emit('update:modelValue', $event)" @select="emit('select', $event)">
        <template #default="{ open, selectedOption }">
            <GBadge :variant="variant" :color="color" :shape="shape" :size="size" :disabled="disabled"
                :class="props.class" class="cursor-pointer gap-1">
                {{ selectedOption?.label ?? placeholder ?? 'Seleccionar' }}
                <ChevronDown class="size-3 shrink-0 transition-transform duration-200"
                    :class="{ 'rotate-180': open }" />
            </GBadge>
        </template>
    </Dropdown>
</template>
