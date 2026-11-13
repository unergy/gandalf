<script setup lang="ts">
import { ref } from 'vue'
import { GAvatarReport, GCircleReport, GPickerItem, GPin } from '@unergy-dev/gandalf'

const circleTypes = [
  'access',
  'boundary',
  'pole',
  'road',
  'soil',
  'fustal',
  'latizal',
  'agua',
  'otro',
  'observacion',
] as const
const avatarTypes = [
  'access',
  'boundary',
  'pole',
  'road',
  'soil',
  'fustal',
  'latizal',
  'agua',
  'otro',
  'poligono',
] as const
const icons = ['pin', 'tree', 'door', 'pole'] as const
const thicknesses = [1, 2, 3, 4] as const

const icon = ref<(typeof icons)[number]>('tree')
const thickness = ref<(typeof thicknesses)[number]>(3)
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-8 rounded-lg border p-8"
  >
    <div class="flex flex-wrap gap-3">
      <GCircleReport v-for="type in circleTypes" :key="type" :type="type" :label="type" />
    </div>
    <div class="flex flex-wrap gap-3">
      <GAvatarReport v-for="type in avatarTypes" :key="type" :type="type" :label="type" />
    </div>
    <div class="flex flex-wrap items-end gap-8">
      <GPin />
      <GPin layer-name="Pozo 3" report="agua" />
      <GPin report="fustal" :show-layer-name="false" />
    </div>
    <div class="flex flex-wrap gap-1">
      <GPickerItem
        v-for="item in icons"
        :key="item"
        :icon="item"
        :aria-label="item"
        :model-value="icon === item"
        @update:model-value="icon = item"
      />
    </div>
    <div class="flex flex-wrap gap-1">
      <GPickerItem
        v-for="item in thicknesses"
        :key="item"
        type="label"
        :label="`${item}px`"
        :thickness="item"
        :show-opacity="false"
        :model-value="thickness === item"
        @update:model-value="thickness = item"
      />
    </div>
  </div>
</template>
