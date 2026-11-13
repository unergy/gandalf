<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { avatarSemanticKey, gandalfAvatarFallbackVariants } from './index'

const props = defineProps<{
  /** Milliseconds to wait before showing the fallback (avoids a flash while the image loads). */
  delayMs?: number
  class?: HTMLAttributes['class']
}>()

const injected = inject(avatarSemanticKey, undefined)
const semantic = computed(() => injected?.value)
</script>

<template>
  <AvatarFallback
    :delay-ms="delayMs"
    :class="cn(gandalfAvatarFallbackVariants({ semantic }), props.class)"
  >
    <slot />
  </AvatarFallback>
</template>
