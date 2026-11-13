<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject, provide, toRef } from 'vue'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { avatarGroupKey, avatarSemanticKey, gandalfAvatarVariants } from './index'
import type { GandalfAvatarSemantic, GandalfAvatarSize, GandalfAvatarType } from './index'

const props = withDefaults(
  defineProps<{
    /** Shape ("Type" in Figma). Inside a GKitAvatarGroup, defaults to the group's. */
    type?: GandalfAvatarType
    /** Inside a GKitAvatarGroup, defaults to the group's. */
    size?: GandalfAvatarSize
    semantic?: GandalfAvatarSemantic
    class?: HTMLAttributes['class']
  }>(),
  { type: undefined, size: undefined, semantic: 'default', class: undefined },
)

const group = inject(avatarGroupKey, null)

const type = computed(() => props.type ?? group?.type.value ?? 'circle')
const size = computed(() => props.size ?? group?.size.value ?? 'sm')

provide(
  avatarSemanticKey,
  toRef(() => props.semantic),
)
</script>

<template>
  <Avatar
    :data-type="type"
    :data-size="size"
    :class="cn(gandalfAvatarVariants({ type, size }), props.class)"
  >
    <slot />
  </Avatar>
</template>
