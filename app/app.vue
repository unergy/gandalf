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


    <Dropdown :options="dropdownOptions" label="Mi cuenta" @select="(opt) => console.log(opt)">
      <Badge variant="outline" color="action">
        Dropdown
        <ChevronDown class="ml-2" />
      </Badge>
    </Dropdown>

    <BadgeDropdown text="Estado" color="success" :options="dropdownOptions" label="Cambiar estado"
      @select="(opt) => console.log(opt)" />
  </div>
</template>

<script lang="ts" setup>
import { Book, ChevronDown, Sun } from 'lucide-vue-next'
import { GBadge as Badge } from './components/gandalf/badge'
import Dropdown from './components/blocks/dropdown/Dropdown.vue'
import BadgeDropdown from './components/blocks/badge-dropdown/BadgeDropdown.vue'

const badgeVariants = ['default', 'outline'] as const
const badgeColors = [
  'default',
  'action',
  'information',
  'success',
  'warning',
  'destructive',
] as const

const dropdownOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Option 3', value: 'option3' },
]
</script>
