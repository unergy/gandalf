<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { GCalendar } from '@unergy/gandalf'

const day = ref<DateValue>()
const birthday = ref<DateValue>()
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-start gap-6 rounded-lg border p-8"
  >
    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Default</p>
      <GCalendar
        v-model="day"
        locale="es-CO"
        :week-starts-on="1"
        class="bg-background rounded-md border"
      />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Month and year dropdowns</p>
      <GCalendar
        v-model="birthday"
        locale="es-CO"
        :week-starts-on="1"
        layout="month-and-year"
        class="bg-background rounded-md border"
      />
    </div>
  </div>
</template>
