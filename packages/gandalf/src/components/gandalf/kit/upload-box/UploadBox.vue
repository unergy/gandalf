<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfUploadBoxSize } from './index'
import { ArrowDown, File, Upload, X } from 'lucide-vue-next'
import { ref, useId } from 'vue'
import { GLabel } from '@/components/gandalf/base/label'
import { cn } from '@/lib/utils'
import { gandalfUploadBoxFileVariants, gandalfUploadBoxVariants } from './index'

const props = withDefaults(
  defineProps<{
    size?: GandalfUploadBoxSize
    /** Figma's Label above the box. Omit it to hide the label. */
    label?: string
    /** Red asterisk after the label. */
    required?: boolean
    /** "Title" in Figma. */
    title?: string
    /** "Description" in Figma, only shown in `md`. */
    description?: string
    /** Title of State=Hovered, shown on hover and while dragging a file over the box. */
    dropTitle?: string
    /** Name of the chosen file. Set it to show State=Activated. */
    fileName?: string
    /** `accept` of the underlying file input. */
    accept?: string
    /** `multiple` of the underlying file input. */
    multiple?: boolean
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    size: 'md',
    label: undefined,
    required: false,
    title: 'Title',
    description: undefined,
    dropTitle: 'Drop your file here',
    fileName: undefined,
    accept: undefined,
    multiple: false,
    disabled: false,
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'files', files: File[]): void
  (e: 'remove'): void
}>()

const inputId = useId()
const inputRef = ref<HTMLInputElement | null>(null)
// dragenter/dragleave also fire for children, so count them instead of using a boolean
const dragDepth = ref(0)

function openPicker() {
  if (!props.disabled) inputRef.value?.click()
}

function emitFiles(files: FileList | null) {
  if (!files || files.length === 0) return
  emit('files', Array.from(files))
}

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  emitFiles(input.files)
  // Let the same file be chosen twice in a row
  input.value = ''
}

function onDragEnter() {
  if (!props.disabled) dragDepth.value += 1
}

function onDragLeave() {
  dragDepth.value = Math.max(0, dragDepth.value - 1)
}

function onDrop(event: DragEvent) {
  dragDepth.value = 0
  if (props.disabled) return
  emitFiles(event.dataTransfer?.files ?? null)
}
</script>

<template>
  <div data-slot="upload-box" :class="cn('flex w-full flex-col gap-1', props.class)">
    <GLabel v-if="label" :for="inputId" :required="required" :disabled="disabled">
      {{ label }}
    </GLabel>

    <input
      :id="inputId"
      ref="inputRef"
      type="file"
      class="hidden"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="onChange"
    />

    <!-- State=Activated: the box becomes the chosen file -->
    <div v-if="fileName" data-slot="upload-box-file" :class="gandalfUploadBoxFileVariants()">
      <span class="flex min-w-0 flex-1 items-center gap-2">
        <span class="shrink-0 [&_svg]:size-4">
          <slot name="file-icon"><File /></slot>
        </span>
        <span class="truncate">{{ fileName }}</span>
      </span>
      <button
        type="button"
        class="focus-visible:ring-ring hover:overlay-dark-8 -mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm outline-none focus-visible:ring-2 [&_svg]:size-4"
        :aria-label="`Remove ${fileName}`"
        @click="emit('remove')"
      >
        <X />
      </button>
    </div>

    <!-- State=Enabled / Hovered -->
    <button
      v-else
      type="button"
      data-slot="upload-box-dropzone"
      :disabled="disabled"
      :data-dragging="dragDepth > 0"
      :class="gandalfUploadBoxVariants({ size })"
      @click="openPicker"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <!-- `contents` keeps the icon and the text as direct children of the box's flex row -->
      <span
        :class="
          disabled ? 'contents' : 'contents group-hover:hidden group-data-[dragging=true]:hidden'
        "
      >
        <span class="shrink-0 [&_svg]:size-[18px]">
          <slot name="icon"><Upload /></slot>
        </span>
        <span v-if="size === 'md'" class="flex w-full flex-col">
          <span class="text-base leading-normal font-semibold">{{ title }}</span>
          <span v-if="description" class="text-base-foreground-quiet text-sm leading-[normal]">
            {{ description }}
          </span>
        </span>
        <span v-else class="text-base leading-normal font-semibold">{{ title }}</span>
      </span>

      <span
        v-if="!disabled"
        class="hidden group-hover:contents group-data-[dragging=true]:contents"
      >
        <span class="shrink-0 [&_svg]:size-[18px]"><ArrowDown /></span>
        <span class="text-base leading-normal font-semibold">{{ dropTitle }}</span>
      </span>
    </button>
  </div>
</template>
