<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/base/avatar'
import type {
  GandalfAvatarSemantic,
  GandalfAvatarSize,
  GandalfAvatarType,
} from '@/components/gandalf/base/avatar'

const props = defineProps<{
  src?: string
  alt?: string
  /** Text shown when there is no image (e.g. initials). */
  fallback?: string
  type?: GandalfAvatarType
  size?: GandalfAvatarSize
  semantic?: GandalfAvatarSemantic
  delayMs?: number
  /** Custom hex background for the fallback, outside the Figma semantics. */
  bg?: `#${string}`
  /** Custom hex text color for the fallback, outside the Figma semantics. */
  color?: `#${string}`
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <GAvatar :type="type" :size="size" :semantic="semantic" :class="props.class">
    <GAvatarImage v-if="src" :src="src" :alt="alt ?? ''" />
    <GAvatarFallback
      :delay-ms="delayMs"
      :style="{
        ...(bg ? { backgroundColor: bg } : {}),
        ...(color ? { color } : {}),
      }"
    >
      {{ fallback }}
    </GAvatarFallback>
  </GAvatar>
</template>
