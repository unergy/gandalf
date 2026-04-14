<script setup lang="ts">
import type { AlertDialogEmits, AlertDialogProps } from 'reka-ui'
import { AlertDialog } from '@/components/ui/alert-dialog'

const props = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()
</script>

<template>
    <AlertDialog v-bind="props" @update:open="emits('update:open', $event)">
        <slot />
    </AlertDialog>
</template>
