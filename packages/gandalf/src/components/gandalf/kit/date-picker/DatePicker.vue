<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'
import type {
  DatePickerDate,
  DatePickerMatcher,
  DatePickerModelValue,
  DatePickerPreset,
  DatePickerRange,
  DatePickerSelection,
  DatePickerType,
} from './types'
import { computed } from 'vue'
import { CalendarIcon, X } from 'lucide-vue-next'
import { GButton } from '@/components/gandalf/base/button'
import { GCalendar } from '@/components/gandalf/base/calendar'
import { GPopover, GPopoverContent, GPopoverTrigger } from '@/components/gandalf/base/popover'
import { GRangeCalendar } from '@/components/gandalf/base/range-calendar'
import { cn } from '@/lib/utils'
import {
  formatDate,
  formatDateRange,
  isRange,
  toCalendarDate,
  toDateMatcher,
  toISODate,
  toNativeDate,
} from './date'
import { activePreset, resolvePreset } from './presets'

/** The range shape the calendar primitive speaks. Kept structural so `reka-ui` stays in `base/`. */
type CalendarRange = { start: DateValue | undefined; end: DateValue | undefined }

defineOptions({
  // Unrecognised props are the calendar's, not the popover's: `numberOfMonths`, `fixedWeeks`,
  // `weekStartsOn`, `isDateUnavailable`, `layout` and the rest keep working untouched. The
  // popover only ever needs three knobs from a date picker, and those are named props.
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Whether the picker selects one day or a range. Decides the shape of everything else. */
    type?: DatePickerType
    /** Shown on the trigger while nothing is selected. */
    placeholder?: string
    /** Blocks the trigger and the calendar. */
    disabled?: boolean
    /** Adds a clear control to the trigger once something is selected. */
    clearable?: boolean
    /** Accessible label for the clear control. */
    clearLabel?: string
    /** Shortcuts beside the calendar. The row knows which one is active. */
    presets?: DatePickerPreset[]
    /** Earliest date that can be picked. Everything before it is greyed out. */
    min?: DatePickerDate
    /** Latest date that can be picked. Everything after it is greyed out. */
    max?: DatePickerDate
    /** Keeps individual days out of reach — weekends, holidays. Return `true` to disable. */
    isDateDisabled?: DatePickerMatcher
    /** Locale for the calendar's strings and the trigger label. */
    locale?: string
    /** How the trigger prints the selection. Passed straight to `Intl.DateTimeFormat`. */
    format?: Intl.DateTimeFormatOptions
    /** Whether a finished selection closes the popover. A half-picked range never closes it. */
    closeOnSelect?: boolean
    /** Submits with a surrounding form, as a hidden input holding the ISO day. */
    name?: string
    /** Field name for the end of a range. */
    endName?: string
    /** Turns a picked day into the submitted string. */
    serialize?: (value: Date) => string
    /** Put on the trigger, for a `<GLabel for>`. */
    id?: string
    /** Which trigger edge the popover lines up with. */
    align?: 'start' | 'center' | 'end'
    /** Trigger height, matching the button sizes. */
    size?: 'sm' | 'default'
    /** Merged onto the trigger. */
    class?: HTMLAttributes['class']
    /** Merged onto the popover content. */
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    type: 'single',
    placeholder: 'Select a date...',
    disabled: false,
    clearable: false,
    clearLabel: 'Clear date',
    presets: undefined,
    min: undefined,
    max: undefined,
    isDateDisabled: undefined,
    // The platform is Colombian and its users read dates in Spanish. Override per instance for
    // anything that is not.
    locale: 'es-CO',
    format: () => ({ dateStyle: 'medium' }),
    closeOnSelect: true,
    name: undefined,
    endName: undefined,
    serialize: toISODate,
    id: undefined,
    align: 'start',
    size: 'default',
    class: undefined,
    contentClass: undefined,
  },
)

const emit = defineEmits<{
  /**
   * The user picked a day, a preset, or cleared. Never on mount, never when `v-model` is assigned
   * from code, and never for a half-picked range — a caller that fetches on change would
   * otherwise fire a request for a range with no end. Bind `modelValue` for every click.
   */
  change: [value: DatePickerSelection]
}>()

const modelValue = defineModel<DatePickerModelValue>({ default: undefined })
const open = defineModel<boolean>('open', { default: false })
/**
 * The month on screen — the calendar primitive's `placeholder`, renamed because `placeholder` is
 * already the trigger's empty text everywhere else in Gandalf. Two props with one name, one a
 * string and one a date, is a coin flip every caller loses once.
 */
const month = defineModel<DatePickerDate | undefined>('month', { default: undefined })

const isRangeType = computed(() => props.type === 'range')

/** The selection as the calendar reads it. */
const single = computed(() =>
  isRangeType.value ? undefined : toCalendarDate(modelValue.value as DatePickerDate),
)
const range = computed<CalendarRange>(() => {
  const value = modelValue.value
  const parts = isRange(value) ? value : {}
  return { start: toCalendarDate(parts.start), end: toCalendarDate(parts.end) }
})

/** The day the calendar opens on when nothing says otherwise. */
const anchor = computed(() => (isRangeType.value ? range.value.start : single.value))
const monthOnScreen = computed(
  () => toCalendarDate(month.value) ?? anchor.value ?? toCalendarDate(new Date()),
)

const presets = computed(() => props.presets ?? [])
const active = computed(() => activePreset(presets.value, modelValue.value))

const empty = computed(() =>
  isRangeType.value ? range.value.start === undefined : single.value === undefined,
)

const label = computed(() => {
  if (active.value) return active.value.label
  if (isRangeType.value)
    return formatDateRange(asRange(modelValue.value), props.locale, props.format)
  return formatDate(modelValue.value as DatePickerDate, props.locale, props.format)
})

const showClear = computed(() => props.clearable && !props.disabled && !empty.value)

/** The converted conveniences, merged over `$attrs` so a named prop wins over a raw calendar one. */
const calendarProps = computed(() => ({
  ...(props.min !== undefined ? { minValue: toCalendarDate(props.min) } : {}),
  ...(props.max !== undefined ? { maxValue: toCalendarDate(props.max) } : {}),
  ...(props.isDateDisabled ? { isDateDisabled: toDateMatcher(props.isDateDisabled) } : {}),
}))

const startName = computed(() => props.name)
const endFieldName = computed(() => props.endName ?? (props.name ? `${props.name}-end` : undefined))

function asRange(value: DatePickerModelValue): DatePickerRange | undefined {
  return isRange(value) ? value : undefined
}

function serialized(value: DatePickerDate | undefined): string {
  const date = toNativeDate(toCalendarDate(value))
  return date ? props.serialize(date) : ''
}

function commit(value: DatePickerSelection) {
  modelValue.value = value
  emit('change', value)
}

function close() {
  // Focus returns to the trigger on its own: the popover restores it on close.
  open.value = false
}

function handleSingle(next: DateValue | undefined) {
  commit(toNativeDate(next))
  if (props.closeOnSelect && next) close()
}

/**
 * A range is finished only when the second end lands. Until then the value is written through so
 * the calendar and the trigger stay honest about the half state, but `change` stays quiet and the
 * popover stays open — closing on the first click is the classic hand-rolled range picker bug.
 */
function handleRange(next: CalendarRange) {
  const value = { start: toNativeDate(next?.start), end: toNativeDate(next?.end) }
  const complete = value.start !== undefined && value.end !== undefined
  const cleared = value.start === undefined && value.end === undefined

  modelValue.value = value
  if (complete || cleared) emit('change', value)
  if (props.closeOnSelect && complete) close()
}

function applyPreset(preset: DatePickerPreset) {
  const value = resolvePreset(preset)
  if (isRangeType.value) {
    const parts = asRange(value) ?? {}
    commit({
      start: toNativeDate(toCalendarDate(parts.start)),
      end: toNativeDate(toCalendarDate(parts.end)),
    })
  } else {
    commit(toNativeDate(toCalendarDate(value as DatePickerDate)))
  }
  if (props.closeOnSelect) close()
}

function clear() {
  commit(isRangeType.value ? { start: undefined, end: undefined } : undefined)
}

function handleOpenChange(next: boolean) {
  open.value = next
  // The month is derived from the selection again on the next open, so a picker whose value
  // changed while it was closed does not reopen on the month someone last paged to.
  if (!next) month.value = undefined
}

function handleMonthChange(next: DateValue) {
  month.value = toNativeDate(next)
}
</script>

<template>
  <GPopover :open="open" @update:open="handleOpenChange">
    <!--
      The clear control is a sibling of the trigger, not a child of it. The trigger renders a
      `<button>`, and a button nested in a button is invalid HTML — browsers recover by dropping
      one of the two, which is how a clear control ends up unreachable by keyboard.
    -->
    <div class="relative w-full">
      <!--
        The slot sits inside the trigger rather than replacing it, so a custom trigger is one
        element and never has to know the popover exists. It must render exactly one element.
      -->
      <GPopoverTrigger as-child>
        <slot
          name="trigger"
          :value="modelValue"
          :label="label"
          :empty="empty"
          :open="open"
          :disabled="disabled"
          :clear="clear"
        >
          <GButton
            :id="id"
            variant="outline"
            :size="size"
            :disabled="disabled"
            :class="cn('w-full justify-between gap-2 font-normal', props.class)"
          >
            <!--
              The label reserves room for the clear control rather than the button padding doing
              it: padding would push the calendar icon inwards too, leaving the clear control
              stranded to the right of it.
            -->
            <span
              :class="
                cn(
                  'min-w-0 truncate text-start',
                  empty && 'text-muted-foreground',
                  showClear && 'pe-7',
                )
              "
            >
              {{ label || placeholder }}
            </span>
            <CalendarIcon class="size-4 shrink-0 opacity-50" />
          </GButton>
        </slot>
      </GPopoverTrigger>

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

      <!--
        Hidden inputs rather than a `required` prop: hidden inputs are barred from constraint
        validation, so a `required` here would look like it guards the field and never fire.
      -->
      <template v-if="name">
        <input
          type="hidden"
          :name="startName"
          :value="
            serialized(isRangeType ? asRange(modelValue)?.start : (modelValue as DatePickerDate))
          "
        />
        <input
          v-if="isRangeType"
          type="hidden"
          :name="endFieldName"
          :value="serialized(asRange(modelValue)?.end)"
        />
      </template>
    </div>

    <GPopoverContent :align="align" :class="cn('w-auto p-0', contentClass)">
      <div class="flex flex-col sm:flex-row">
        <div
          v-if="presets.length"
          class="border-border flex gap-1 overflow-x-auto border-b p-2 sm:w-40 sm:shrink-0 sm:flex-col sm:overflow-visible sm:border-e sm:border-b-0"
        >
          <GButton
            v-for="preset in presets"
            :key="preset.label"
            type="button"
            variant="ghost"
            size="sm"
            :disabled="disabled"
            :data-active="active === preset"
            class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground shrink-0 justify-start font-normal"
            @click="applyPreset(preset)"
          >
            {{ preset.label }}
          </GButton>
        </div>

        <GRangeCalendar
          v-if="isRangeType"
          v-bind="{ ...$attrs, ...calendarProps }"
          :model-value="range"
          :placeholder="monthOnScreen"
          :locale="locale"
          :disabled="disabled"
          initial-focus
          @update:model-value="handleRange"
          @update:placeholder="handleMonthChange"
        />
        <GCalendar
          v-else
          v-bind="{ ...$attrs, ...calendarProps }"
          :model-value="single"
          :placeholder="monthOnScreen"
          :locale="locale"
          :disabled="disabled"
          initial-focus
          @update:model-value="handleSingle"
          @update:placeholder="handleMonthChange"
        />
      </div>

      <div v-if="$slots.footer" class="border-border border-t p-2">
        <slot name="footer" :value="modelValue" :clear="clear" :close="close" />
      </div>
    </GPopoverContent>
  </GPopover>
</template>
