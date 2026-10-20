<script setup lang="ts">
import { ref } from 'vue'
import { GButton, GKitDatePicker } from '@unergy/gandalf'
import type { DatePickerModelValue, DatePickerPreset } from '@unergy/gandalf'

const issued = ref<DatePickerModelValue>('2026-09-03')
const due = ref<DatePickerModelValue>()
const period = ref<DatePickerModelValue>()
const reported = ref<DatePickerModelValue>()
const birthday = ref<DatePickerModelValue>()

const today = new Date()

/** Saturdays and Sundays are not business days, so an invoice cannot fall on one. */
function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6
}

/** A range ending today and starting `days` back. */
function lastDays(days: number) {
  return () => {
    const start = new Date()
    start.setDate(start.getDate() - (days - 1))
    return { start, end: new Date() }
  }
}

// Relative presets are functions: one computed at module scope is right until midnight, and then
// quietly wrong for everyone who left the tab open.
const presets: DatePickerPreset[] = [
  { label: 'Hoy', value: () => ({ start: new Date(), end: new Date() }) },
  { label: 'Últimos 7 días', value: lastDays(7) },
  { label: 'Últimos 30 días', value: lastDays(30) },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 grid gap-6 rounded-lg border p-8 sm:grid-cols-2"
  >
    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Single, clearable</p>
      <GKitDatePicker v-model="issued" clearable placeholder="Fecha de emisión..." />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Range, two months</p>
      <GKitDatePicker
        v-model="period"
        type="range"
        clearable
        :number-of-months="2"
        placeholder="Periodo..."
      />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Range with presets</p>
      <GKitDatePicker
        v-model="reported"
        type="range"
        :presets="presets"
        clearable
        placeholder="Rango del reporte..."
      />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Business days from today</p>
      <GKitDatePicker
        v-model="due"
        :min="today"
        :is-date-disabled="isWeekend"
        placeholder="Fecha de vencimiento..."
      >
        <template #footer="{ close }">
          <GButton variant="ghost" size="sm" class="w-full" @click="close">Cerrar</GButton>
        </template>
      </GKitDatePicker>
    </div>

    <div class="space-y-2 sm:col-span-2">
      <p class="text-muted-foreground text-xs font-medium">Year dropdown, long format</p>
      <GKitDatePicker
        v-model="birthday"
        layout="month-and-year"
        :max="today"
        :format="{ dateStyle: 'long' }"
        placeholder="Fecha de nacimiento..."
        class="sm:max-w-xs"
      />
    </div>
  </div>
</template>
