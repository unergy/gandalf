<script setup lang="ts">
import { ref } from 'vue'
import { GUploadCard } from '@unergy/gandalf'

const files = ref([
  { name: 'KML COLCEST 234.kml', size: '45 MB', type: 'KML', state: 'completed' as const },
  { name: 'KML COLCEST 235.kml', size: '45 MB', type: 'KML', state: 'error' as const },
  { name: 'KML COLCEST 236.kml', size: '45 MB', type: 'KML', state: 'in-progress' as const },
  { name: 'KML COLCEST 237.kml', size: '45 MB', type: 'KML', state: 'queue' as const },
])
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-2 rounded-lg border p-8">
    <GUploadCard
      v-for="file in files"
      :key="file.name"
      :type="file.state"
      :file-name="file.name"
      :file-size="file.size"
      :file-type="file.type"
      :progress="25"
      @remove="files = files.filter((f) => f.name !== file.name)"
    />
  </div>
</template>
