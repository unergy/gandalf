<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { GRangeCalendar } from '@/components/gandalf/base/range-calendar'

const period = ref<{ start: DateValue | undefined, end: DateValue | undefined }>()
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <GRangeCalendar
      v-model="period"
      locale="es-CO"
      :week-starts-on="1"
      :number-of-months="2"
      class="bg-background w-fit rounded-md border"
    />
  </div>
</template>
