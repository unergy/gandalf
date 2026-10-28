<script setup lang="ts">
import { ref } from 'vue'
import { GKitDatePicker } from '@unergy/gandalf'
import type { DatePickerModelValue } from '@unergy/gandalf'

const issued = ref<DatePickerModelValue>('2026-09-03')
</script>

<template>
  <main>
    <!-- Auto-imported by the module -->
    <GBadge color="success">Activo</GBadge>
    <!-- Imported explicitly -->
    <GKitDatePicker v-model="issued" />
  </main>
</template>
