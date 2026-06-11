<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/base/avatar'
import type { GandalfAvatarVariant } from '@/components/gandalf/base/avatar'

const props = defineProps<{
  src?: string
  alt?: string
  fallback?: string
  variant?: GandalfAvatarVariant
  delayMs?: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <GAvatar :variant="variant" :class="props.class">
    <GAvatarImage v-if="src" :src="src" :alt="alt ?? ''" />
    <GAvatarFallback :delay-ms="delayMs">
      {{ fallback }}
    </GAvatarFallback>
  </GAvatar>
</template>
