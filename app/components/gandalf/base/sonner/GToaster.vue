<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { Toaster } from '@/components/ui/sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Toaster v-bind="props" />
</template>
