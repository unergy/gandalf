<script setup lang="ts">
import { ref } from 'vue'
import { CalendarDays, ClipboardCheck, LayoutGrid, List, Map, Table } from 'lucide-vue-next'
import { GSegment, GSegmentedButton, GLabel } from '@unergy-dev/gandalf'

const two = ref('all')
const three = ref('day')
const four = ref('grid')
const icons = ref('list')
const multiple = ref(['all'])
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-8 rounded-lg border p-8">
    <!-- Two segments, with the Figma label on top -->
    <div class="flex flex-col gap-1">
      <GLabel required>Label</GLabel>
      <GSegmentedButton v-model="two">
        <GSegment value="all">
          <ClipboardCheck />
          Option
        </GSegment>
        <GSegment value="mine">
          <ClipboardCheck />
          Option
        </GSegment>
      </GSegmentedButton>
    </div>

    <!-- Three and four segments -->
    <GSegmentedButton v-model="three">
      <GSegment value="day">Día</GSegment>
      <GSegment value="week">Semana</GSegment>
      <GSegment value="month">Mes</GSegment>
    </GSegmentedButton>

    <GSegmentedButton v-model="four">
      <GSegment value="grid">Grid</GSegment>
      <GSegment value="list">Lista</GSegment>
      <GSegment value="map">Mapa</GSegment>
      <GSegment value="table" disabled>Tabla</GSegment>
    </GSegmentedButton>

    <!-- Icon only -->
    <GSegmentedButton v-model="icons">
      <GSegment value="list" aria-label="Lista"><List /></GSegment>
      <GSegment value="grid" aria-label="Grid"><LayoutGrid /></GSegment>
      <GSegment value="map" aria-label="Mapa"><Map /></GSegment>
      <GSegment value="calendar" aria-label="Calendario"><CalendarDays /></GSegment>
      <GSegment value="table" aria-label="Tabla"><Table /></GSegment>
    </GSegmentedButton>

    <!-- Multiple selection -->
    <GSegmentedButton v-model="multiple" type="multiple">
      <GSegment value="all">Todos</GSegment>
      <GSegment value="active">Activos</GSegment>
      <GSegment value="archived">Archivados</GSegment>
    </GSegmentedButton>
  </div>
</template>
