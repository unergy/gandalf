<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const props = defineProps<CheckboxRootProps & {
    class?: HTMLAttributes['class']
}>()

const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <Checkbox v-bind="delegatedProps" :class="cn(props.class)" @update:checked="emits('update:checked', $event)">
        <template #default="slotProps">
            <slot v-bind="slotProps" />
        </template>
    </Checkbox>
</template>
