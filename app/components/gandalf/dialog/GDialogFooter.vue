<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes['class']
        showCloseButton?: boolean
    }>(),
    {
        showCloseButton: false,
    },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <DialogFooter v-bind="delegatedProps" :class="cn(props.class)">
        <slot />
    </DialogFooter>
</template>
