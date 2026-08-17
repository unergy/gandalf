<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SelectModelValue, SelectOption, SelectOptions, SelectValue } from './types'
import { computed } from 'vue'
import { LoaderCircle, X } from 'lucide-vue-next'
import { GBadge } from '@/components/gandalf/base/badge'
import { GButton } from '@/components/gandalf/base/button'
import {
  GSelect,
  GSelectContent,
  GSelectGroup,
  GSelectItem,
  GSelectLabel,
  GSelectTrigger,
  GSelectValue,
} from '@/components/gandalf/base/select'
import { cn } from '@/lib/utils'
import { flatten, toGroups } from './options'

const props = withDefaults(
  defineProps<{
    /** The list to choose from, flat or grouped. */
    options: SelectOptions
    /** Allows selecting more than one option. `modelValue` becomes an array. */
    multiple?: boolean
    /** Shown on the trigger while nothing is selected. */
    placeholder?: string
    /** Shown in place of the list when `options` is empty. */
    emptyMessage?: string
    /** Blocks the trigger. */
    disabled?: boolean
    /** Adds a clear control to the trigger once something is selected. */
    clearable?: boolean
    /** Accessible label for the clear control. */
    clearLabel?: string
    /** Renders a spinner in place of the list. */
    loading?: boolean
    /** Submits with a surrounding form, as a native hidden select. */
    name?: string
    /** Marks the hidden select required. Only meaningful alongside `name`. */
    required?: boolean
    /** How many badges the trigger shows before collapsing into a counter. `multiple` only. */
    maxDisplay?: number
    /** Trigger height, matching shadcn's select sizes. */
    size?: 'sm' | 'default'
    /** Merged onto the trigger. */
    class?: HTMLAttributes['class']
    /** Merged onto the popover content. */
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    multiple: false,
    placeholder: 'Select an option...',
    emptyMessage: 'No options available.',
    disabled: false,
    clearable: false,
    clearLabel: 'Clear selection',
    loading: false,
    name: undefined,
    required: false,
    maxDisplay: 3,
    size: 'default',
    class: undefined,
    contentClass: undefined,
  },
)

const emit = defineEmits<{
  /** The row the user just picked or unpicked. Never fires on mount or on a programmatic set. */
  select: [option: SelectOption]
}>()

const modelValue = defineModel<SelectModelValue>({ default: undefined })
const open = defineModel<boolean>('open', { default: false })

const groups = computed(() => toGroups(props.options))
const all = computed(() => flatten(props.options))

/** The selection as an array, whether `multiple` or not, so one code path handles both. */
const values = computed<SelectValue[]>(() => {
  const value = modelValue.value
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value : [value]
})

const selected = computed(() => all.value.filter((option) => values.value.includes(option.value)))
const shown = computed(() => selected.value.slice(0, props.maxDisplay))
const overflow = computed(() => Math.max(0, selected.value.length - props.maxDisplay))
const showClear = computed(() => props.clearable && !props.disabled && selected.value.length > 0)

/**
 * Reka has no select event of its own, so the changed row is worked out by diffing. Watching
 * `modelValue` instead would also fire on mount and on every programmatic assignment, announcing
 * a selection nobody made.
 */
function handleUpdate(next: unknown) {
  const before = values.value
  modelValue.value = next as SelectModelValue
  const after = Array.isArray(next) ? next : next === undefined || next === null ? [] : [next]

  const changed =
    after.find((value) => !before.includes(value as SelectValue)) ??
    before.find((value) => !after.includes(value))
  const option = all.value.find((candidate) => candidate.value === changed)
  if (option) emit('select', option)
}

function clear() {
  modelValue.value = props.multiple ? [] : undefined
}
</script>

<template>
  <GSelect
    :model-value="modelValue"
    :open="open"
    :multiple="multiple"
    :disabled="disabled"
    :name="name"
    :required="required"
    @update:model-value="handleUpdate"
    @update:open="open = $event"
  >
    <!--
      The clear control is a sibling of the trigger, not a child of it. Reka's trigger renders a
      `<button>`, and a button nested in a button is invalid HTML — browsers recover by dropping
      one of the two, which is how a clear control ends up unreachable by keyboard.
    -->
    <div class="relative w-full">
      <GSelectTrigger :size="size" :class="cn('h-auto min-h-9 w-full', props.class)">
        <!--
          The label is rendered here rather than left to Reka, which derives it from the selected
          item's text content. An option with a `description` renders two lines, so that default
          would put "BogotáCapital del país" on the trigger. `GSelectValue` is still what wraps it,
          because the trigger's placeholder styling keys off the attribute it sets.
        -->
        <GSelectValue
          as="div"
          :placeholder="placeholder"
          :class="cn('flex min-w-0 flex-1 flex-wrap items-center gap-1', showClear && 'pe-7')"
        >
          <span v-if="selected.length === 0" class="text-muted-foreground truncate">
            {{ placeholder }}
          </span>
          <template v-else-if="multiple">
            <GBadge
              v-for="option in shown"
              :key="option.value"
              variant="outline"
              :color="option.color"
              size="sm"
            >
              {{ option.label }}
            </GBadge>
            <GBadge v-if="overflow > 0" variant="outline" size="sm">+{{ overflow }}</GBadge>
          </template>
          <template v-else>
            <span
              v-if="selected[0]?.color"
              class="size-2 shrink-0 rounded-full"
              :style="{ backgroundColor: selected[0]?.color }"
            />
            <span class="min-w-0 truncate">{{ selected[0]?.label }}</span>
          </template>
        </GSelectValue>
      </GSelectTrigger>

      <GButton
        v-if="showClear"
        type="button"
        variant="ghost"
        size="icon-sm"
        class="absolute inset-y-0 inset-e-8 my-auto size-6"
        :aria-label="clearLabel"
        @click.stop="clear"
      >
        <X class="size-4 opacity-50" />
      </GButton>
    </div>

    <GSelectContent :class="cn(contentClass)">
      <div v-if="loading" class="flex items-center justify-center py-6">
        <slot name="loading">
          <LoaderCircle class="size-4 animate-spin opacity-50" />
        </slot>
      </div>

      <div v-else-if="all.length === 0" class="text-muted-foreground py-6 text-center text-sm">
        <slot name="empty">{{ emptyMessage }}</slot>
      </div>

      <template v-else>
        <GSelectGroup v-for="(group, groupIndex) in groups" :key="group.label ?? groupIndex">
          <GSelectLabel v-if="group.label">{{ group.label }}</GSelectLabel>
          <GSelectItem
            v-for="option in group.options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
          >
            <slot name="option" :option="option" :selected="values.includes(option.value)">
              <span
                v-if="option.color"
                class="size-2 shrink-0 rounded-full"
                :style="{ backgroundColor: option.color }"
              />
              <span v-if="option.description" class="flex min-w-0 flex-col">
                <span class="truncate">{{ option.label }}</span>
                <span class="text-muted-foreground truncate text-xs">{{ option.description }}</span>
              </span>
              <span v-else class="truncate">{{ option.label }}</span>
            </slot>
          </GSelectItem>
        </GSelectGroup>
      </template>
    </GSelectContent>
  </GSelect>
</template>
