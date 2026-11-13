<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { File, Image, Send } from 'lucide-vue-next'
import { computed } from 'vue'
import { GButton } from '@/components/gandalf/base/button'
import { cn } from '@/lib/utils'
import { gandalfInputChatVariants } from './index'

const props = withDefaults(
  defineProps<{
    /** The text ("Input text" in Figma). */
    modelValue?: string
    placeholder?: string
    /** Text of the comment being edited. Shows the "Editando" block and disables the attach buttons. */
    editing?: string
    editingLabel?: string
    /** Whether the send button is enabled. By default, when there is text. */
    canSend?: boolean
    disabled?: boolean
    attachFileLabel?: string
    attachImageLabel?: string
    sendLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    modelValue: '',
    placeholder: undefined,
    editing: undefined,
    editingLabel: 'Editando',
    canSend: undefined,
    disabled: false,
    attachFileLabel: 'Attach file',
    attachImageLabel: 'Attach image',
    sendLabel: 'Send',
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send', value: string): void
  (e: 'attach-file'): void
  (e: 'attach-image'): void
}>()

const sendEnabled = computed(
  () => !props.disabled && (props.canSend ?? props.modelValue.trim().length > 0),
)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

function send() {
  if (sendEnabled.value) emit('send', props.modelValue)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' || event.shiftKey || event.isComposing) return
  event.preventDefault()
  send()
}
</script>

<template>
  <div data-slot="input-chat" :class="cn(gandalfInputChatVariants(), props.class)">
    <!-- Figma's "Frame 10817": the attachments being sent, as GMiniatures -->
    <div v-if="$slots.attachments" class="flex flex-wrap items-start gap-1.5">
      <slot name="attachments" />
    </div>

    <!-- Figma's "Top" of Editing Comment: the comment being edited, in Information colors -->
    <div
      v-if="editing !== undefined"
      class="bg-information-muted flex w-full flex-col overflow-clip rounded-xl px-3 py-2 text-base leading-normal whitespace-nowrap"
    >
      <span class="text-information-bold truncate font-semibold">{{ editingLabel }}</span>
      <span class="text-base-foreground truncate">{{ editing }}</span>
    </div>

    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      rows="1"
      :class="[
        'text-base-foreground placeholder:text-base-foreground-extra-quiet [field-sizing:content] max-h-40 min-h-9 w-full resize-none bg-transparent py-1.5 text-base leading-normal outline-none disabled:cursor-not-allowed',
        editing !== undefined && 'mt-1.5 min-h-6 py-0',
      ]"
      @input="onInput"
      @keydown="onKeydown"
    />

    <!-- Figma's "Container Action" -->
    <div class="flex items-center justify-between">
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <slot name="actions">
          <!-- Figma switches these to "Ghost secondary" (#314158) while the field has focus -->
          <GButton
            variant="ghost-primary"
            :aria-label="attachFileLabel"
            :disabled="disabled || editing !== undefined"
            class="group-focus-within/input-chat:text-secondary-foreground"
            @click="emit('attach-file')"
          >
            <File class="size-4" />
          </GButton>
          <GButton
            variant="ghost-primary"
            :aria-label="attachImageLabel"
            :disabled="disabled || editing !== undefined"
            class="group-focus-within/input-chat:text-secondary-foreground"
            @click="emit('attach-image')"
          >
            <Image class="size-4" />
          </GButton>
        </slot>
      </div>
      <GButton
        variant="tonal-primary"
        :aria-label="sendLabel"
        :disabled="!sendEnabled"
        @click="send"
      >
        <Send class="size-4" />
      </GButton>
    </div>
  </div>
</template>
