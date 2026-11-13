<script setup lang="ts">
import { ref } from 'vue'
import {
  GAlertDialog,
  GAlertDialogAction,
  GAlertDialogBody,
  GAlertDialogCancel,
  GAlertDialogContent,
  GAlertDialogDescription,
  GAlertDialogFooter,
  GAlertDialogHeader,
  GAlertDialogTitle,
  GAlertDialogTrigger,
  GButton,
} from '@unergy-dev/gandalf'

const props = withDefaults(defineProps<{ defaultOpen?: boolean }>(), { defaultOpen: false })
const open = ref(props.defaultOpen)
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8"
  >
    <GAlertDialog v-model:open="open">
      <GAlertDialogTrigger as-child>
        <GButton variant="outline-primary">Notification</GButton>
      </GAlertDialogTrigger>
      <GAlertDialogContent>
        <GAlertDialogHeader>
          <GAlertDialogTitle>Title</GAlertDialogTitle>
        </GAlertDialogHeader>
        <GAlertDialogBody>
          <GAlertDialogDescription class="text-center">
            Description of the notification Description of the notification
          </GAlertDialogDescription>
        </GAlertDialogBody>
        <GAlertDialogFooter class="[&>*]:flex-1">
          <GAlertDialogCancel>Action 2</GAlertDialogCancel>
          <GAlertDialogAction>Action 1</GAlertDialogAction>
        </GAlertDialogFooter>
      </GAlertDialogContent>
    </GAlertDialog>
  </div>
</template>
