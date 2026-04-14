<template>
  <div class="flex items-center justify-center gap-4 p-44">

    <div v-for="variant in badgeVariants" :key="variant" class="flex flex-col items-center gap-4">
      <Badge v-for="color in badgeColors" :key="color" :variant="variant" :color="color">
        <Book></Book>
        {{ color }}
        <ChevronDown></ChevronDown>
      </Badge>
    </div>

    <div v-for="variant in badgeVariants" :key="variant" class="flex flex-col items-center gap-4">
      <Badge v-for="color in badgeColors" :key="color" :variant="variant" :color="color" shape="square">
        {{ color }}
      </Badge>
    </div>

    <div v-for="variant in badgeVariants" :key="variant" class="flex flex-col items-center gap-4">
      <Badge v-for="color in badgeColors" :key="color" :variant="variant" :color="color" size="icon">
        <Sun></Sun>
      </Badge>
    </div>


    <GDropdown v-model="selectedDropdown" :options="dropdownOptions" label="Opciones">
      <template #default="{ open, selectedOption }">
        <Badge class="cursor-pointer gap-1">
          <span v-if="selectedOption?.color" class="size-2 rounded-full"
            :style="{ backgroundColor: selectedOption.color }" />
          {{ selectedOption?.label ?? 'Seleccionar' }}
          <ChevronDown class="size-3 transition-transform duration-200" :class="{ 'rotate-180': open }" />
        </Badge>
      </template>
    </GDropdown>

    <GDropdown v-model="selectedBadge" :options="dropdownOptions" label="Estado">
      <template #default="{ open, selectedOption }">
        <Badge color="success" class="cursor-pointer gap-1">
          <span v-if="selectedOption?.color" class="size-2 rounded-full"
            :style="{ backgroundColor: selectedOption.color }" />
          {{ selectedOption?.label ?? 'Estado' }}
          <ChevronDown class="size-3 transition-transform duration-200" :class="{ 'rotate-180': open }" />
        </Badge>
      </template>
    </GDropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Book, ChevronDown, Sun } from 'lucide-vue-next'
import { GBadge as Badge } from './components/gandalf/badge'
import { GDropdown } from './components/gandalf/dropdown'
import type { Option } from './components/gandalf/types'

const badgeVariants = ['default', 'outline'] as const
const badgeColors = [
  'default',
  'action',
  'information',
  'success',
  'warning',
  'destructive',
] as const

const dropdownOptions: Option[] = [
  { label: 'Activo', value: 'active', color: '#22c55e' },
  { label: 'Pausado', value: 'paused', color: '#f59e0b', disabled: true },
  { label: 'Sin color', value: 'none' },
  { label: 'Inactivo', value: 'inactive', color: '#ef4444' },
]

const selectedDropdown = ref<string | number>()
const selectedBadge = ref<string | number>()
</script>
