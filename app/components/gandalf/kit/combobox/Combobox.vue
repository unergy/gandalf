<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ComboboxFilter, ComboboxOption, ComboboxOptions, ComboboxValue } from './types'
import { computed, onScopeDispose } from 'vue'
import { Check, ChevronsUpDown, LoaderCircle, X } from 'lucide-vue-next'
import { GBadge } from '@/components/gandalf/base/badge'
import { GButton } from '@/components/gandalf/base/button'
import {
  GCombobox,
  GComboboxAnchor,
  GComboboxEmpty,
  GComboboxGroup,
  GComboboxInput,
  GComboboxItem,
  GComboboxItemIndicator,
  GComboboxList,
  GComboboxTrigger,
  GComboboxViewport,
} from '@/components/gandalf/base/combobox'
import { cn } from '@/lib/utils'
import { flatten, matches, toGroups } from './options'

const props = withDefaults(
  defineProps<{
    /** The list to choose from, flat or grouped. */
    options: ComboboxOptions
    /** Allows selecting more than one option. `modelValue` becomes an array. */
    multiple?: boolean
    /** Shown on the trigger while nothing is selected. */
    placeholder?: string
    /** Shown in the search box. */
    searchPlaceholder?: string
    /** Shown when the search matches nothing. */
    emptyMessage?: string
    /** Blocks the trigger. */
    disabled?: boolean
    /** Adds a clear control to the trigger. */
    clearable?: boolean
    /** Accessible label for the clear control. */
    clearLabel?: string
    /** Renders a loading row in place of the list. Pair with `@search` for server-side search. */
    loading?: boolean
    /** Submits with a surrounding form, as a hidden input. */
    name?: string
    /** Marks the hidden input required. Only meaningful alongside `name`. */
    required?: boolean
    /**
     * Whether to filter on the client. Set `false` when the server already returned a filtered
     * list, so the results are not filtered twice.
     */
    shouldFilter?: boolean
    /**
     * Replaces the built-in matching. Return `true` to keep the option. The default folds accents
     * and case, and matches against the label, the description and any keywords.
     */
    filter?: ComboboxFilter
    /** Milliseconds to wait before the `search` event fires. `0` emits on every keystroke. */
    searchDebounce?: number
    /** How many badges the trigger shows before collapsing into a counter. `multiple` only. */
    maxDisplay?: number
    /** Merged onto the trigger button. */
    class?: HTMLAttributes['class']
    /** Merged onto the popover content. */
    contentClass?: HTMLAttributes['class']
    /** Merged onto the scrolling list. Use it to change the max height. */
    listClass?: HTMLAttributes['class']
  }>(),
  {
    multiple: false,
    placeholder: 'Select an option...',
    searchPlaceholder: 'Search...',
    emptyMessage: 'No results found.',
    disabled: false,
    clearable: false,
    clearLabel: 'Clear selection',
    loading: false,
    name: undefined,
    required: false,
    shouldFilter: true,
    filter: undefined,
    searchDebounce: 0,
    maxDisplay: 3,
    class: undefined,
    contentClass: undefined,
    listClass: undefined,
  },
)

const emit = defineEmits<{
  /** The row the user just picked or unpicked. Never fires on mount or on a programmatic set. */
  select: [option: ComboboxOption]
  /** The search term, debounced by `searchDebounce`. This is the hook for server-side search. */
  search: [term: string]
}>()

const modelValue = defineModel<ComboboxValue | ComboboxValue[] | undefined>({ default: undefined })
const open = defineModel<boolean>('open', { default: false })
const search = defineModel<string>('search', { default: '' })

const groups = computed(() => toGroups(props.options))
const all = computed(() => flatten(props.options))

/** The selection as an array, whether `multiple` or not, so one code path handles both. */
const values = computed<ComboboxValue[]>(() => {
  const value = modelValue.value
  if (value === undefined || value === null) return []
  return Array.isArray(value) ? value : [value]
})

const selected = computed(() => all.value.filter((option) => values.value.includes(option.value)))
const shown = computed(() => selected.value.slice(0, props.maxDisplay))
const overflow = computed(() => Math.max(0, selected.value.length - props.maxDisplay))
const showClear = computed(() => props.clearable && !props.disabled && selected.value.length > 0)

const match = computed<ComboboxFilter>(() => props.filter ?? matches)
const visible = computed(() =>
  props.shouldFilter ? all.value.filter((option) => match.value(option, search.value)) : all.value,
)

/**
 * Filtering happens here and only here: what does not match is not rendered, and Reka is told to
 * `ignore-filter`.
 *
 * The alternative — letting Reka score each item — cannot express this filter, because a caller's
 * `filter` needs the whole option and Reka's scorer only sees the item's text. `GComboboxEmpty`
 * still works: under `ignore-filter` it renders when no items registered at all, which is exactly
 * when this list comes back empty.
 */
const rendered = computed(() => {
  const keep = new Set(visible.value)
  return groups.value
    .map((group) => ({ label: group.label, options: group.options.filter((o) => keep.has(o)) }))
    .filter((group) => group.options.length > 0)
})

/**
 * The debounce is hand-rolled rather than `useDebounceFn` because closing the popover has to
 * cancel a pending call: a term the user can no longer see must not reach the server after the
 * list is gone. `useDebounceFn` returns no handle to cancel with.
 */
let searchTimer: ReturnType<typeof setTimeout> | undefined
let lastEmitted = ''

function emitSearch(term: string) {
  lastEmitted = term
  emit('search', term)
}

function handleSearch(term: string) {
  search.value = term
  clearTimeout(searchTimer)
  if (props.searchDebounce <= 0) {
    emitSearch(term)
    return
  }
  searchTimer = setTimeout(() => emitSearch(term), props.searchDebounce)
}

// A pending debounce outliving the component would emit for a screen that is gone.
onScopeDispose(() => clearTimeout(searchTimer))

/** A term left behind would filter the list before the user has typed anything next time. */
function handleOpenChange(next: boolean) {
  open.value = next
  if (next) return

  clearTimeout(searchTimer)
  search.value = ''
  // The caller hears about the reset too, undebounced. When the server owns the search, clearing
  // only this side leaves an empty search box above a list still filtered by an invisible term.
  if (lastEmitted !== '') emitSearch('')
}

function clear() {
  modelValue.value = props.multiple ? [] : undefined
}

/**
 * Reka owns the value: it toggles for `multiple`, replaces otherwise, and closes the popover on a
 * single pick. This only announces which row changed — deriving that from a `watch` on
 * `modelValue` would also fire on mount and on every programmatic set, announcing a selection
 * nobody made.
 */
function handleSelect(option: ComboboxOption) {
  if (option.disabled) return
  emit('select', option)
}
</script>

<template>
  <GCombobox
    v-slot="{ open: isOpen }"
    v-model="modelValue"
    :open="open"
    :multiple="multiple"
    :disabled="disabled"
    :name="name"
    :required="required"
    ignore-filter
    :reset-search-term-on-select="!multiple"
    @update:open="handleOpenChange"
  >
    <!--
      The clear control is a sibling of the trigger, not a child of it. Reka's trigger renders a
      `<button>`, and a button nested in a button is invalid HTML — browsers recover by dropping
      one of the two, which is how a clear control ends up unreachable by keyboard.
    -->
    <GComboboxAnchor class="relative w-full">
      <slot name="trigger" :open="isOpen" :selected="selected" :disabled="disabled" :clear="clear">
        <GComboboxTrigger as-child :disabled="disabled">
          <GButton
            variant="outline"
            :class="cn('h-auto min-h-9 w-full justify-between gap-2 font-normal', props.class)"
          >
            <!--
              The label reserves room for the clear control rather than the button padding doing
              it: padding would push the chevron inwards too, leaving the clear control stranded
              to the right of it.
            -->
            <span
              :class="
                cn(
                  'flex min-w-0 flex-1 flex-wrap items-center gap-1 text-start',
                  showClear && 'pe-7',
                )
              "
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
              <span v-else class="min-w-0 truncate">{{ selected[0]?.label }}</span>
            </span>
            <ChevronsUpDown class="size-4 shrink-0 opacity-50" />
          </GButton>
        </GComboboxTrigger>
      </slot>

      <GButton
        v-if="showClear"
        type="button"
        variant="ghost"
        size="icon-sm"
        class="absolute inset-y-0 end-8 my-auto size-6"
        :aria-label="clearLabel"
        @click.stop="clear"
      >
        <X class="size-4 opacity-50" />
      </GButton>
    </GComboboxAnchor>

    <GComboboxList :class="cn('w-(--reka-combobox-trigger-width) p-0', contentClass)">
      <GComboboxInput
        :model-value="search"
        :placeholder="searchPlaceholder"
        @update:model-value="handleSearch"
      />

      <div v-if="loading" class="flex items-center justify-center py-6">
        <slot name="loading">
          <LoaderCircle class="size-4 animate-spin opacity-50" />
        </slot>
      </div>

      <GComboboxViewport v-else :class="cn('p-1', listClass)">
        <GComboboxEmpty class="text-muted-foreground py-6 text-center text-sm">
          <slot name="empty">{{ emptyMessage }}</slot>
        </GComboboxEmpty>

        <GComboboxGroup
          v-for="(group, groupIndex) in rendered"
          :key="group.label ?? groupIndex"
          :heading="group.label"
          class="p-0"
        >
          <GComboboxItem
            v-for="option in group.options"
            :key="option.value"
            :value="option.value"
            :disabled="option.disabled"
            class="cursor-pointer"
            @select="handleSelect(option)"
          >
            <slot name="option" :option="option" :selected="values.includes(option.value)">
              <span
                v-if="option.color"
                class="size-2 shrink-0 rounded-full"
                :style="{ backgroundColor: option.color }"
              />
              <span v-if="option.description" class="flex min-w-0 flex-col">
                <span class="truncate">{{ option.label }}</span>
                <span class="text-muted-foreground truncate text-xs">
                  {{ option.description }}
                </span>
              </span>
              <span v-else class="truncate">{{ option.label }}</span>
            </slot>
            <GComboboxItemIndicator>
              <Check class="size-4" />
            </GComboboxItemIndicator>
          </GComboboxItem>
        </GComboboxGroup>
      </GComboboxViewport>

      <div v-if="$slots.footer" class="border-t p-1">
        <slot name="footer" :selected="selected" :visible="visible" :clear="clear" />
      </div>
    </GComboboxList>
  </GCombobox>
</template>
