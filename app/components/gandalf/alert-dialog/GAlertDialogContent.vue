<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogContent } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<AlertDialogContentEmits>()
</script>

<template>
    <AlertDialogContent v-bind="{ ...$attrs, ...reactiveOmit(props, 'class') }" :class="cn(props.class)"
        @close-auto-focus="emits('closeAutoFocus', $event)" @escape-key-down="emits('escapeKeyDown', $event)"
        @focus-outside="emits('focusOutside', $event)" @interact-outside="emits('interactOutside', $event)"
        @open-auto-focus="emits('openAutoFocus', $event)" @pointer-down-outside="emits('pointerDownOutside', $event)">
        <slot />
    </AlertDialogContent>
</template>
