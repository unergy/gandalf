<script setup lang="ts">
import { ref } from 'vue'
import { GMiniatures } from '@unergy-dev/gandalf'

const files = ref(['File name', 'Other file'])
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-start gap-2 rounded-lg border p-8">
    <GMiniatures
      v-for="(file, index) in files"
      :key="file"
      :file-name="file"
      file-type="PDF"
      @remove="files.splice(index, 1)"
    />
    <GMiniatures type="variant2" src="/gandalf.webp" alt="Gandalf" />
  </div>
</template>
