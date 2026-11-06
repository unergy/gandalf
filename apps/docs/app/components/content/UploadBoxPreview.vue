<script setup lang="ts">
import { ref } from 'vue'
import { GUploadBox } from '@unergy-dev/gandalf'

const chosen = ref<string | undefined>(undefined)
const certificate = ref<string | undefined>('Certificado.pdf')

function onFiles(files: File[]) {
  chosen.value = files[0]?.name
}
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
    <GUploadBox
      label="Soportes"
      required
      title="Arrastra tus archivos"
      description="PDF o XLSX, hasta 10 MB"
      accept=".pdf,.xlsx"
      :file-name="chosen"
      @files="onFiles"
      @remove="chosen = undefined"
    />

    <GUploadBox size="sm" label="Certificado de cámara" title="Subir archivo" />

    <GUploadBox
      size="sm"
      label="Certificado bancario"
      required
      :file-name="certificate"
      @remove="certificate = undefined"
    />

    <GUploadBox size="sm" label="Deshabilitado" title="Subir archivo" disabled />
  </div>
</template>
