<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AlertDialogFooter } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogFooterVariants } from '@/components/gandalf/base/dialog'

// Figma: "Group Button". In "Dialog Notification" both buttons share the width: pass
// `class="[&>*]:flex-1"`.
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <AlertDialogFooter :class="cn(gandalfDialogFooterVariants(), props.class)">
    <slot />
  </AlertDialogFooter>
</template>
