<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Option } from '@/components/gandalf/base/types'
import type { GandalfMessageCardColor } from './index'
import { EllipsisVertical } from 'lucide-vue-next'
import { GAvatar, GAvatarFallback } from '@/components/gandalf/base/avatar'
import { GButton } from '@/components/gandalf/base/button'
import { GDropdown } from '@/components/gandalf/base/dropdown'
import { cn } from '@/lib/utils'
import { gandalfMessageCardVariants } from './index'

const props = withDefaults(
  defineProps<{
    /** "Commenter Name" in Figma. */
    commenterName: string
    /** Initials of the "Avatar Item" ("CN" in Figma). */
    initials?: string
    /** Color of the "Avatar Item". */
    color?: GandalfMessageCardColor
    /** The comment ("Chat summary" in Figma). The default slot replaces it. */
    comment?: string
    /** "DD/MM/YYYY" in Figma, shown as given. */
    date?: string
    /** Options of the menu behind the ⋮ button. Without them, the button is not shown. */
    options?: Option[]
    actionsLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    initials: undefined,
    color: 'default',
    comment: undefined,
    date: undefined,
    options: undefined,
    actionsLabel: 'Message options',
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'select', option: Option): void
}>()
</script>

<template>
  <article data-slot="message-card" :class="cn(gandalfMessageCardVariants(), props.class)">
    <!-- Figma's "Corner": a 24px square turned 45° and clipped by the card, so only a triangle shows -->
    <span
      aria-hidden="true"
      class="bg-default pointer-events-none absolute -top-3 -left-3 size-6 rotate-45"
    />

    <header class="flex items-center justify-between py-3 pr-3 pl-4">
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <GAvatar type="circle" size="sm" :semantic="color" class="shrink-0">
          <slot name="avatar">
            <GAvatarFallback :class="color === 'default' && 'bg-card'">{{
              initials
            }}</GAvatarFallback>
          </slot>
        </GAvatar>
        <span class="text-base-foreground-loud truncate text-base leading-normal font-semibold">
          {{ commenterName }}
        </span>
      </div>

      <slot name="actions">
        <GDropdown v-if="options?.length" :options="options" @select="emit('select', $event)">
          <GButton variant="ghost-primary" size="md" :aria-label="actionsLabel">
            <EllipsisVertical class="size-4" />
          </GButton>
        </GDropdown>
      </slot>
    </header>

    <!-- Figma's "Frame 10807": an image above the comment -->
    <div
      v-if="$slots.media"
      class="flex items-center px-4 pb-3 [&_img]:rounded-lg [&_img]:object-cover"
    >
      <slot name="media" />
    </div>

    <!-- Figma's "Chat Globe" -->
    <div
      class="flex max-w-[708px] flex-col justify-center gap-2 px-4 pb-3 drop-shadow-[0_1px_0_rgb(0_0_0/0.05)]"
    >
      <div v-if="$slots.attachments" class="flex w-full flex-wrap items-start gap-1">
        <slot name="attachments" />
      </div>
      <p class="text-base-foreground-quiet w-full text-lg leading-[1.3] break-words">
        <slot>{{ comment }}</slot>
      </p>
      <p
        v-if="date"
        class="text-base-foreground-extra-quiet w-full truncate text-right text-base leading-normal"
      >
        {{ date }}
      </p>
    </div>
  </article>
</template>
