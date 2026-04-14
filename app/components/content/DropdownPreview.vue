<script setup lang="ts">
import { ref } from 'vue'
import { GBadge } from '@/components/gandalf/badge'
import { GDropdown } from '@/components/gandalf/dropdown'
import { ChevronDown } from 'lucide-vue-next'
import type { Option } from '@/components/gandalf/types'

const selected = ref<string | number>('active')

const options: Option[] = [
  { label: 'Active', value: 'active', color: '#22c55e' },
  { label: 'Paused', value: 'paused', color: '#f59e0b' },
  { label: 'Inactive', value: 'inactive', color: '#ef4444' },
  { label: 'Archived', value: 'archived', color: '#6b7280', disabled: true },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-center justify-center gap-4 rounded-lg border p-8"
  >
    <GDropdown v-model="selected" :options="options" label="Status">
      <template #default="{ open, selectedOption }">
        <GBadge class="cursor-pointer gap-1">
          <span
            v-if="selectedOption?.color"
            class="size-2 rounded-full"
            :style="{ backgroundColor: selectedOption.color }"
          />
          {{ selectedOption?.label ?? 'Select status' }}
          <ChevronDown
            class="size-3 transition-transform duration-200"
            :class="{ 'rotate-180': open }"
          />
        </GBadge>
      </template>
    </GDropdown>

    <GDropdown v-model="selected" :options="options" label="Status">
      <template #default="{ open, selectedOption }">
        <GBadge variant="outline" color="action" class="cursor-pointer gap-1">
          <span
            v-if="selectedOption?.color"
            class="size-2 rounded-full"
            :style="{ backgroundColor: selectedOption.color }"
          />
          {{ selectedOption?.label ?? 'Select status' }}
          <ChevronDown
            class="size-3 transition-transform duration-200"
            :class="{ 'rotate-180': open }"
          />
        </GBadge>
      </template>
    </GDropdown>
  </div>
</template>
