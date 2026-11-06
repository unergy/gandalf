<script setup lang="ts">
import { GButton, GStepper, GStepperItem } from '@unergy-dev/gandalf'

const steps = ['Datos del terreno', 'Documentos', 'Visita', 'Revisión']
const step = ref(2)
</script>

<template>
  <div class="flex items-start gap-12">
    <GStepper v-model="step">
      <GStepperItem v-for="(title, index) in steps" :key="title" :step="index + 1" :title="title" />
    </GStepper>
    <div class="flex gap-2">
      <GButton variant="outline-primary" size="sm" :disabled="step <= 1" @click="step--">
        Back
      </GButton>
      <GButton size="sm" :disabled="step >= steps.length" @click="step++">Next</GButton>
    </div>
  </div>
</template>
