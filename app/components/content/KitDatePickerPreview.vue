<script setup lang="ts">
import { ref } from 'vue'
import { GButton } from '@/components/gandalf/base/button'
import { GKitDatePicker } from '@/components/gandalf/kit/date-picker'
import type { DatePickerModelValue } from '@/components/gandalf/kit/date-picker'

const issued = ref<DatePickerModelValue>('2026-09-03')
const due = ref<DatePickerModelValue>()
const birthday = ref<DatePickerModelValue>()

const today = new Date()

/** Saturdays and Sundays are not business days, so an invoice cannot fall on one. */
function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6
}
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 grid gap-6 rounded-lg border p-8 sm:grid-cols-3"
  >
    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Clearable</p>
      <GKitDatePicker v-model="issued" clearable placeholder="Fecha de emisión..." />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Business days from today</p>
      <GKitDatePicker
        v-model="due"
        :min="today"
        :is-date-disabled="isWeekend"
        placeholder="Fecha de vencimiento..."
      >
        <template #footer="{ select }">
          <GButton variant="ghost" size="sm" class="w-full" @click="select(today)">Hoy</GButton>
        </template>
      </GKitDatePicker>
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Year dropdown, long format</p>
      <GKitDatePicker
        v-model="birthday"
        layout="month-and-year"
        :max="today"
        :format="{ dateStyle: 'long' }"
        placeholder="Fecha de nacimiento..."
      />
    </div>
  </div>
</template>
