<script setup lang="ts">
import type { AlertDialogTriggerProps } from 'reka-ui'
import { AlertDialogTrigger } from '@/components/ui/alert-dialog'

const props = defineProps<AlertDialogTriggerProps>()
</script>

<template>
    <AlertDialogTrigger v-bind="props">
        <slot />
    </AlertDialogTrigger>
</template>
