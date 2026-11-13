<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide, toRef } from 'vue'
import { GAvatar, GAvatarFallback, avatarGroupKey } from '@/components/gandalf/base/avatar'
import type { GandalfAvatarSize, GandalfAvatarType } from '@/components/gandalf/base/avatar'
import { cn } from '@/lib/utils'
import { gandalfAvatarGroupVariants } from './index'

const props = withDefaults(
  defineProps<{
    /** Shape of every avatar in the group, unless an avatar sets its own. */
    type?: GandalfAvatarType
    /** Size of every avatar in the group, unless an avatar sets its own. */
    size?: GandalfAvatarSize
    /** Hidden avatars: adds a last "+N" avatar (Type=+3 in Figma). */
    more?: number
    class?: HTMLAttributes['class']
  }>(),
  { type: 'circle', size: 'sm', more: undefined, class: undefined },
)

provide(avatarGroupKey, {
  type: toRef(() => props.type),
  size: toRef(() => props.size),
})
</script>

<template>
  <div data-slot="avatar-group" :class="cn(gandalfAvatarGroupVariants({ size }), props.class)">
    <slot />
    <GAvatar v-if="more" semantic="default">
      <GAvatarFallback>+{{ more }}</GAvatarFallback>
    </GAvatar>
  </div>
</template>
