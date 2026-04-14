<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui'
import { Dialog } from '@/components/ui/dialog'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()
</script>

<template>
    <Dialog v-bind="props" @update:open="emits('update:open', $event)">
        <slot />
    </Dialog>
</template>
