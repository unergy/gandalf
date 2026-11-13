<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GAvatar } from '@/components/gandalf/base/avatar'
import { cn } from '@/lib/utils'
import { avatarReportIcons, gandalfAvatarReportVariants } from './index'
import type { GandalfAvatarReportType } from './index'

const props = withDefaults(
  defineProps<{
    type?: GandalfAvatarReportType
    /** Accessible name; without it the avatar is decorative. */
    label?: string
    class?: HTMLAttributes['class']
  }>(),
  { type: 'access', label: undefined, class: undefined },
)
</script>

<template>
  <!-- Figma: an Avatar Item (Type=Square, 24px) with the report icon instead of initials -->
  <GAvatar
    type="square"
    size="xs"
    data-slot="avatar-report"
    :data-type="type"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :class="cn(gandalfAvatarReportVariants({ type }), props.class)"
  >
    <component :is="avatarReportIcons[type]" />
  </GAvatar>
</template>
