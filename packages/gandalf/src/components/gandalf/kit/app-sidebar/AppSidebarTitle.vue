<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { GandalfAppSidebarLevel } from './index'
import { cn } from '@/lib/utils'
import {
  gandalfAppSidebarTitleIconClass,
  gandalfAppSidebarTitleTextVariants,
  gandalfAppSidebarTitleVariants,
} from './index'

// Figma: Layouts › Content › Title. First Level Layout: icon, title and description.
// Second Level Layout: a smaller title followed by its state, with selectors on the right.
const props = withDefaults(
  defineProps<{
    title?: string
    /** Brief description under the title (First Level Layout). */
    description?: string
    /** Icon in the 32px square before the title (First Level Layout). */
    icon?: Component
    /** "First Level Layout" or "Second Level Layout" in Figma. */
    level?: GandalfAppSidebarLevel
    class?: HTMLAttributes['class']
  }>(),
  {
    title: undefined,
    description: undefined,
    icon: undefined,
    level: 'first',
    class: undefined,
  },
)
</script>

<template>
  <div
    data-slot="app-sidebar-title"
    :class="cn(gandalfAppSidebarTitleVariants({ level }), props.class)"
  >
    <div class="flex min-w-0 items-center gap-2">
      <span v-if="icon || $slots.icon" :class="gandalfAppSidebarTitleIconClass">
        <slot name="icon">
          <component :is="icon" />
        </slot>
      </span>
      <h1 :class="gandalfAppSidebarTitleTextVariants({ level })">
        <slot name="title">{{ title }}</slot>
      </h1>
      <slot />
      <div v-if="$slots.actions" class="ml-auto flex shrink-0 items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <p
      v-if="description || $slots.description"
      class="text-body-lg text-base-foreground-quiet px-1"
    >
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>
