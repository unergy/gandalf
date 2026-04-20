<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/base/avatar'
import { cn } from '@/lib/utils'

const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    size: {
      sm: 'size-6 text-xs',
      default: 'size-8 text-sm',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
    },
    variant: {
      rounded: 'rounded-full',
      square: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'rounded',
  },
})

type AvatarVariants = VariantProps<typeof avatarVariants>

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    fallback?: string
    size?: AvatarVariants['size']
    variant?: AvatarVariants['variant']
    delayMs?: number
    class?: HTMLAttributes['class']
  }>(),
  {
    size: 'default',
    variant: 'rounded',
  },
)
</script>

<template>
  <GAvatar :class="cn(avatarVariants({ size, variant }), props.class)">
    <GAvatarImage v-if="src" :src="src" :alt="alt ?? ''" />
    <GAvatarFallback
      :delay-ms="delayMs"
      :class="variant === 'square' ? 'rounded-md' : 'rounded-full'"
    >
      {{ fallback }}
    </GAvatarFallback>
  </GAvatar>
</template>
