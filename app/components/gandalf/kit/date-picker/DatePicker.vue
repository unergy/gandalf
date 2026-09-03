<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'
import type { GandalfCalendarLayout } from '@/components/gandalf/base/calendar'
import type { DatePickerMatcher, DatePickerModelValue, DatePickerWeekStart } from './types'
import { computed } from 'vue'
import { CalendarIcon, X } from 'lucide-vue-next'
import { GButton } from '@/components/gandalf/base/button'
import { GCalendar } from '@/components/gandalf/base/calendar'
import { GPopover, GPopoverContent, GPopoverTrigger } from '@/components/gandalf/base/popover'
import { cn } from '@/lib/utils'
import { formatDate, toCalendarDate, toDateMatcher, toISODate, toNativeDate } from './date'

const props = withDefaults(
  defineProps<{
    /** Shown on the trigger while nothing is picked. */
    placeholder?: string
    /** Blocks the trigger. */
    disabled?: boolean
    /** Adds a clear control to the trigger once a date is picked. */
    clearable?: boolean
    /** Accessible label for the clear control. */
    clearLabel?: string
    /** Earliest date that can be picked. Everything before it is greyed out. */
    min?: Date | string
    /** Latest date that can be picked. Everything after it is greyed out. */
    max?: Date | string
    /** Keeps individual days out of reach — weekends, holidays. Return `true` to disable. */
    isDateDisabled?: DatePickerMatcher
    /** Locale for the month names, the weekday headers and the trigger label. */
    locale?: string
    /** How the picked date reads on the trigger. Any `Intl.DateTimeFormat` options. */
    format?: Intl.DateTimeFormatOptions
    /** First column of the week. `1` is Monday, which is how a Colombian calendar reads. */
    weekStartsOn?: DatePickerWeekStart
    /** Swaps the static heading for month and/or year dropdowns, for jumping across years. */
    layout?: GandalfCalendarLayout
    /** Whether picking a date closes the popover. */
    closeOnSelect?: boolean
    /** Submits with a surrounding form, as a hidden input carrying the `YYYY-MM-DD` value. */
    name?: string
    /** Trigger height, matching the button sizes. */
    size?: 'sm' | 'default'
    /** Merged onto the trigger. */
    class?: HTMLAttributes['class']
    /** Merged onto the popover content. */
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    placeholder: 'Select a date...',
    disabled: false,
    clearable: false,
    clearLabel: 'Clear date',
    min: undefined,
    max: undefined,
    isDateDisabled: undefined,
    // The platform is Colombian and its users read dates in Spanish. Override per instance for
    // anything that is not.
    locale: 'es-CO',
    format: () => ({ dateStyle: 'medium' }),
    weekStartsOn: 1,
    layout: undefined,
    closeOnSelect: true,
    name: undefined,
    size: 'default',
    class: undefined,
    contentClass: undefined,
  },
)

const modelValue = defineModel<DatePickerModelValue>({ default: undefined })
const open = defineModel<boolean>('open', { default: false })

/** What the calendar reads: the model value as a day, whichever shape it arrived in. */
const value = computed(() => toCalendarDate(modelValue.value))
/** What everything outside the calendar reads, including the slots. */
const selected = computed(() => toNativeDate(value.value))

const label = computed(() =>
  selected.value ? formatDate(selected.value, props.locale, props.format) : '',
)
const isoValue = computed(() => toISODate(modelValue.value))

const minValue = computed(() => toCalendarDate(props.min))
const maxValue = computed(() => toCalendarDate(props.max))
const matcher = computed(() => toDateMatcher(props.isDateDisabled))

const showClear = computed(() => props.clearable && !props.disabled && selected.value !== undefined)

/**
 * The calendar owns the value; this only converts it back. Reka emits `undefined` when the picked
 * day is clicked again, which is a deselection — the popover stays open then, so the user can pick
 * another day instead of being thrown out of a calendar they did not mean to leave.
 */
function handleSelect(next: DateValue | undefined) {
  modelValue.value = toNativeDate(next)
  if (props.closeOnSelect && next) open.value = false
}

/** Sets the value from outside the calendar — what a `footer` shortcut like "Hoy" calls. */
function select(date: Date | string) {
  modelValue.value = toNativeDate(toCalendarDate(date))
  if (props.closeOnSelect) open.value = false
}

function clear() {
  modelValue.value = undefined
}
</script>

<template>
  <GPopover v-model:open="open">
    <!--
      The clear control is a sibling of the trigger, not a child of it. The trigger renders a
      `<button>`, and a button nested in a button is invalid HTML — browsers recover by dropping
      one of the two, which is how a clear control ends up unreachable by keyboard.
    -->
    <div class="relative w-full">
      <slot
        name="trigger"
        :open="open"
        :value="selected"
        :label="label"
        :disabled="disabled"
        :clear="clear"
      >
        <GPopoverTrigger as-child>
          <GButton
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
                  !selected && 'text-muted-foreground',
                  showClear && 'pe-7',
                )
              "
            >
              {{ label || placeholder }}
            </span>
            <CalendarIcon class="size-4 shrink-0 opacity-50" />
          </GButton>
        </GPopoverTrigger>
      </slot>

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
        A hidden input rather than a `required` prop: hidden inputs are barred from constraint
        validation, so a `required` here would look like it guards the field and never fire.
      -->
      <input v-if="name" type="hidden" :name="name" :value="isoValue" />
    </div>

    <GPopoverContent align="start" :class="cn('w-auto p-0', contentClass)">
      <!--
        `defaultPlaceholder` is what makes the calendar open on the month of the selected date.
        The primitive seeds its own placeholder from today and never looks at `modelValue`, so
        without this a date from another year opens on the current month. It is read on mount,
        which is enough because the popover unmounts its content on close.
      -->
      <GCalendar
        :model-value="value"
        :default-placeholder="value"
        :locale="locale"
        :min-value="minValue"
        :max-value="maxValue"
        :is-date-disabled="matcher"
        :week-starts-on="weekStartsOn"
        :layout="layout"
        initial-focus
        @update:model-value="handleSelect"
      />

      <div v-if="$slots.footer" class="border-t p-2">
        <slot name="footer" :value="selected" :select="select" :clear="clear" />
      </div>
    </GPopoverContent>
  </GPopover>
</template>
