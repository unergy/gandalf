<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroup } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <InputGroup :class="cn(props.class)">
    <slot />
  </InputGroup>
</template>
