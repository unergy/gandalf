<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfMiniaturesType } from './index'
import { File, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { gandalfMiniaturesVariants } from './index'

const props = withDefaults(
  defineProps<{
    type?: GandalfMiniaturesType
    /** "File name" in Figma, truncated to one line. */
    fileName?: string
    /** File type under the name ("PDF" in Figma). */
    fileType?: string
    /** Image of `variant2`, cropped to fill the square. */
    src?: string
    alt?: string
    /** Shows the remove button of the corner. */
    removable?: boolean
    removeLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    type: 'default',
    fileName: undefined,
    fileType: undefined,
    src: undefined,
    alt: '',
    removable: true,
    removeLabel: 'Remove',
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>

<template>
  <div
    data-slot="miniatures"
    :data-type="type"
    :class="cn(gandalfMiniaturesVariants({ type }), props.class)"
  >
    <img
      v-if="type === 'variant2' && src"
      :src="src"
      :alt="alt"
      class="pointer-events-none absolute inset-0 size-full rounded-xl object-cover"
    />

    <div
      v-if="type === 'default'"
      class="flex h-full min-w-0 flex-1 items-center gap-2 px-1 whitespace-nowrap"
    >
      <span class="text-base-foreground shrink-0 [&_svg]:size-[18px]">
        <slot name="icon"><File /></slot>
      </span>
      <span class="flex min-w-0 flex-1 flex-col leading-[normal]">
        <span class="text-base-foreground truncate text-sm font-semibold">{{ fileName }}</span>
        <span v-if="fileType" class="text-base-foreground-extra-quiet truncate text-xs">
          {{ fileType }}
        </span>
      </span>
    </div>

    <!-- Figma's "Small button": a 16px dark circle with a 12px cross -->
    <button
      v-if="removable"
      type="button"
      :aria-label="removeLabel"
      class="bg-base-inverse text-base-base hover:overlay-light-8 active:overlay-light-12 focus-visible:ring-ring relative flex shrink-0 cursor-pointer items-center justify-center rounded-full p-0.5 outline-none focus-visible:ring-2"
      @click="emit('remove')"
    >
      <X class="size-3" aria-hidden="true" />
    </button>
  </div>
</template>
