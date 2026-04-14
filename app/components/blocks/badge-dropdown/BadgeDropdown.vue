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
    label?: string
    disabled?: boolean
    // Badge props
    text: string
    variant?: GandalfBadgeVariants['variant']
    color?: GandalfBadgeColor
    shape?: GandalfBadgeVariants['shape']
    size?: GandalfBadgeVariants['size']
    class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
    select: [option: Option]
}>()
</script>

<template>
    <Dropdown :options="options" :label="label" :disabled="disabled" @select="emit('select', $event)">
        <template #default="{ open }">
            <GBadge :variant="variant" :color="color" :shape="shape" :size="size" :disabled="disabled"
                :class="props.class" class="cursor-pointer gap-1">
                {{ text }}
                <ChevronDown class="size-3 shrink-0 transition-transform duration-200"
                    :class="{ 'rotate-180': open }" />
            </GBadge>
        </template>
    </Dropdown>
</template>
