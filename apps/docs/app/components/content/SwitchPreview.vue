<script setup lang="ts">
import { ref } from 'vue'
import { GLabel } from '@/components/gandalf/base/label'
import { GSwitch } from '@/components/gandalf/base/switch'

const off = ref(false)
const on = ref(true)
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-center justify-center gap-8 rounded-lg border p-8">
    <GLabel for="switch-preview-off" class="gap-3">
      Label
      <GSwitch id="switch-preview-off" v-model="off" />
    </GLabel>
    <GLabel for="switch-preview-on" class="gap-3">
      Label
      <GSwitch id="switch-preview-on" v-model="on" />
    </GLabel>
  </div>
</template>
