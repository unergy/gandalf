<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

defineOptions({
    inheritAttrs: false,
})

const props = withDefaults(
    defineProps<
        DialogContentProps & { class?: HTMLAttributes['class']; showCloseButton?: boolean }
    >(),
    {
        showCloseButton: true,
    },
)
const emits = defineEmits<DialogContentEmits>()
</script>

<template>
    <DialogContent v-bind="{ ...$attrs, ...reactiveOmit(props, 'class') }" :class="cn(props.class)"
        @close-auto-focus="emits('closeAutoFocus', $event)" @escape-key-down="emits('escapeKeyDown', $event)"
        @focus-outside="emits('focusOutside', $event)" @interact-outside="emits('interactOutside', $event)"
        @open-auto-focus="emits('openAutoFocus', $event)" @pointer-down-outside="emits('pointerDownOutside', $event)">
        <slot />
    </DialogContent>
</template>
