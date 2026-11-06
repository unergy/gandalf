<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfSearchFieldSize } from './index'
import { Search, X } from 'lucide-vue-next'
import { gandalfFieldWithinClass } from '@/components/gandalf/base/input'
import { cn } from '@/lib/utils'
import { gandalfSearchFieldVariants } from './index'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    size?: GandalfSearchFieldSize
    disabled?: boolean
    /** Accessible name of the clear button. */
    clearLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    modelValue: '',
    placeholder: 'Search',
    size: 'md',
    disabled: false,
    clearLabel: 'Clear search',
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()

function clear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <!-- Native attributes (id, name, aria-*) go to the <input>, not the wrapper -->
  <div
    data-slot="search-field"
    :class="cn(gandalfFieldWithinClass, gandalfSearchFieldVariants({ size }), props.class)"
  >
    <Search class="shrink-0" aria-hidden="true" />
    <input
      v-bind="$attrs"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="placeholder:text-base-foreground-extra-quiet min-w-0 flex-1 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue && !disabled"
      type="button"
      class="focus-visible:ring-ring shrink-0 cursor-pointer rounded-sm outline-none focus-visible:ring-2"
      :aria-label="clearLabel"
      @click="clear"
    >
      <X />
    </button>
  </div>
</template>
