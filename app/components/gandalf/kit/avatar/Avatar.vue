<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/base/avatar'
import type { GandalfAvatarVariant } from '@/components/gandalf/base/avatar'
import { cn } from '@/lib/utils'

const avatarSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'size-6 text-xs',
      default: 'size-8 text-sm',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type AvatarSizeVariants = VariantProps<typeof avatarSizeVariants>

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fallback?: string
    size?: AvatarSizeVariants['size']
    variant?: GandalfAvatarVariant
    delayMs?: number
    class?: HTMLAttributes['class']
  }>(),
  {
    size: 'default',
    variant: 'rounded',
    src: undefined,
    alt: undefined,
    fallback: undefined,
    delayMs: undefined,
    class: undefined,
  },
)
</script>

<template>
  <GAvatar :variant="variant" :class="cn(avatarSizeVariants({ size }), props.class)">
    <GAvatarImage v-if="src" :src="src" :alt="alt ?? ''" />
    <GAvatarFallback :delay-ms="delayMs">
      {{ fallback }}
    </GAvatarFallback>
  </GAvatar>
</template>
