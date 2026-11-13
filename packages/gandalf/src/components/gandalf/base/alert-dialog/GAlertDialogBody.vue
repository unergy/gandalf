<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfDialogBodyVariants } from '@/components/gandalf/base/dialog'

// Figma: the band between Dialog Header and "Group Button" in "Dialog Notification".
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div data-slot="alert-dialog-body" :class="cn(gandalfDialogBodyVariants(), props.class)">
    <slot />
  </div>
</template>
