<script setup lang="ts">
import { ref } from 'vue'
import { GInputChat, GMiniatures } from '@unergy-dev/gandalf'

const text = ref('')
const withFiles = ref('Creating a comment with files, images and text')
const files = ref(['File name', 'Other file'])
const edited = ref(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non leo consequat eros varius dignissim.',
)
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
    <GInputChat v-model="text" class="max-w-[392px]" placeholder="Placeholder..." @send="text = ''" />
    <GInputChat v-model="withFiles" class="max-w-[392px]">
      <template #attachments>
        <GMiniatures
          v-for="(file, index) in files"
          :key="file"
          :file-name="file"
          file-type="PDF"
          @remove="files.splice(index, 1)"
        />
        <GMiniatures type="variant2" src="/gandalf.webp" alt="Gandalf" />
      </template>
    </GInputChat>
    <GInputChat
      v-model="edited"
      class="max-w-[392px]"
      editing="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non leo consequat eros varius dignissim. In maximus porttitor urna."
    />
  </div>
</template>
