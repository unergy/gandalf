<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import {
  GMenu,
  GMenuContent,
  GMenuLabel,
  GMenuSeparator,
  GMenuTrigger,
} from '@/components/gandalf/base/menu'
import { GKitAvatar } from '@/components/gandalf/kit/avatar'
import { cn } from '@/lib/utils'
import {
  gandalfUserMenuContentClass,
  gandalfUserMenuFooterClass,
  gandalfUserMenuHeaderClass,
  gandalfUserMenuTriggerClass,
} from './index'

// The avatar at the right of the Header and the menu it opens: who is signed in on top, then the
// app's items (GMenuItem, GMenuSub…) and an optional footer. It knows nothing about sessions: the
// app passes the user and its own items, sign-out included.
// The root is GMenu, which renders no element: attributes and `class` go to the avatar button.
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    name: string
    email?: string
    /** Avatar image. Without it, the avatar shows `fallback`. */
    src?: string
    /** Text of the avatar without image. Defaults to the initials of `name`. */
    fallback?: string
    /** Accessible name of the trigger. Defaults to `name`. */
    label?: string
    /** Classes for the avatar button. */
    class?: HTMLAttributes['class']
    /** Classes for the menu content (e.g. a wider `min-w-*`). */
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    email: undefined,
    src: undefined,
    fallback: undefined,
    label: undefined,
    class: undefined,
    contentClass: undefined,
  },
)

const initials = computed(
  () =>
    props.fallback ??
    props.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]!.toUpperCase())
      .join(''),
)
</script>

<template>
  <GMenu>
    <GMenuTrigger
      v-bind="$attrs"
      :as-child="false"
      :class="cn(gandalfUserMenuTriggerClass, props.class)"
      :aria-label="label ?? name"
    >
      <GKitAvatar :src="src" :alt="name" :fallback="initials" />
    </GMenuTrigger>
    <GMenuContent align="end" :class="cn(gandalfUserMenuContentClass, contentClass)">
      <GMenuLabel :class="gandalfUserMenuHeaderClass">
        <GKitAvatar type="square" :src="src" :alt="name" :fallback="initials" />
        <span class="flex min-w-0 flex-col">
          <span class="text-base-foreground truncate text-base font-semibold">{{ name }}</span>
          <span v-if="email" class="truncate">{{ email }}</span>
        </span>
      </GMenuLabel>
      <GMenuSeparator />
      <slot />
      <template v-if="$slots.footer">
        <GMenuSeparator />
        <div :class="gandalfUserMenuFooterClass">
          <slot name="footer" />
        </div>
      </template>
    </GMenuContent>
  </GMenu>
</template>
