<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { Toaster } from '@/components/ui/sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <!-- Figma: toasts are 404px wide; sonner sizes its list with --width (356px by default). -->
  <Toaster v-bind="props" :style="{ '--width': '404px', ...props.style }" />
</template>
