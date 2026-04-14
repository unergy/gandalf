<template>
  <div class="flex items-center justify-center gap-4 p-44">

    <div v-for="variant in badgeVariants" :key="variant" class="flex flex-col items-center gap-4">
      <Badge v-for="color in badgeColors" :key="color" :variant="variant" :color="color">
        {{ color }}
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
  </div>
</template>

<script lang="ts" setup>
import { Sun } from 'lucide-vue-next'
import { GBadge as Badge } from './components/gandalf/badge'

const badgeVariants = ['default', 'outline'] as const
const badgeColors = [
  'default',
  'action',
  'information',
  'success',
  'warning',
  'destructive',
] as const
</script>
