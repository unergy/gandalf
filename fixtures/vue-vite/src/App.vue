<script setup lang="ts">
import { ref } from 'vue'
import { GBadge, GKitCombobox, GKitDatePicker } from '@unergy/gandalf'
import type { ComboboxOptions, DatePickerModelValue } from '@unergy/gandalf'
import { Button } from '@unergy/gandalf/ui/button'

const options: ComboboxOptions = [
  { label: 'Solar', value: 'solar' },
  { label: 'Eólica', value: 'wind' },
]
const source = ref<string>()
const issued = ref<DatePickerModelValue>('2026-09-03')
</script>

<template>
  <main>
    <GBadge color="success">Activo</GBadge>
    <GKitCombobox v-model="source" :options="options" placeholder="Fuente" />
    <GKitDatePicker v-model="issued" />
    <Button>Primitiva</Button>
  </main>
</template>
