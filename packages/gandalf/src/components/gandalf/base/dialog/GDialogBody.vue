<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfDialogBodyVariants } from './index'

// Figma: the content bands between Dialog Header and "Group Button". Stack several to separate the
// description from a form, as in "Dialog Form".
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div data-slot="dialog-body" :class="cn(gandalfDialogBodyVariants(), props.class)">
    <slot />
  </div>
</template>
