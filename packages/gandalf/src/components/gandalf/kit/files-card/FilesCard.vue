<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfFilesCardType } from './index'
import { FileSpreadsheet, Folder } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { gandalfFilesCardVariants } from './index'

const props = withDefaults(
  defineProps<{
    title: string
    type?: GandalfFilesCardType
    /** Second line of a folder, e.g. "12 files". */
    fileCount?: string | number
    /** File type shown in the preview of a file, e.g. "xlsx". */
    extension?: string
    /** Activated state ("State=Activated" in Figma). */
    modelValue?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    type: 'folder',
    fileCount: undefined,
    extension: undefined,
    modelValue: false,
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <!-- A div with the button role: the card holds its own action button, and buttons cannot nest -->
  <div
    role="button"
    tabindex="0"
    data-slot="files-card"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-pressed="modelValue"
    :class="cn(gandalfFilesCardVariants({ type }), props.class)"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <!-- Figma's "Opacity" layer: darkens the whole surface on hover and press -->
    <div
      v-if="type === 'folder'"
      class="group-hover:bg-alpha-dark-5 group-active:bg-alpha-dark-8 flex h-full min-w-0 flex-1 items-center gap-4 px-5"
    >
      <span class="text-base-foreground shrink-0 [&_svg]:size-6">
        <slot name="icon"><Folder /></slot>
      </span>
      <span class="flex min-w-0 flex-1 flex-col gap-0.5 pb-0.5">
        <span class="text-base-foreground truncate text-base leading-normal font-semibold">{{
          title
        }}</span>
        <span
          v-if="fileCount !== undefined"
          class="text-base-foreground-quiet text-sm leading-[normal]"
        >
          {{ fileCount }}
        </span>
      </span>
      <span v-if="$slots.actions" class="shrink-0" @click.stop @keydown.stop>
        <slot name="actions" />
      </span>
    </div>

    <div
      v-else
      class="group-hover:bg-alpha-dark-5 group-active:bg-alpha-dark-8 flex min-h-0 flex-1 flex-col gap-2 p-2"
    >
      <div class="flex items-center gap-2 pl-1">
        <span v-if="$slots.icon" class="text-base-foreground shrink-0 [&_svg]:size-4">
          <slot name="icon" />
        </span>
        <span
          class="text-base-foreground min-w-0 flex-1 truncate text-base leading-normal font-semibold"
        >
          {{ title }}
        </span>
        <span v-if="$slots.actions" class="shrink-0" @click.stop @keydown.stop>
          <slot name="actions" />
        </span>
      </div>
      <div
        class="bg-card flex min-h-0 flex-1 flex-col items-center justify-center gap-1.5 overflow-clip rounded-xl"
      >
        <slot name="preview">
          <span class="text-base-foreground [&_svg]:size-6"><FileSpreadsheet /></span>
          <span
            v-if="extension"
            class="text-base-foreground-quiet text-base leading-normal font-semibold uppercase"
          >
            {{ extension }}
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
