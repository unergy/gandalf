<script setup lang="ts">
import { GMessageCard, GMiniatures } from '@unergy-dev/gandalf'
import type { Option } from '@unergy-dev/gandalf'

const options: Option[] = [
  { label: 'Editar', value: 'edit' },
  { label: 'Eliminar', value: 'delete' },
]
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-start gap-6 rounded-lg border p-8">
    <div class="flex w-[358px] flex-col gap-6">
      <GMessageCard
        commenter-name="Commenter Name"
        initials="CN"
        date="DD/MM/YYYY"
        :options="options"
        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <GMessageCard
        commenter-name="Commenter"
        initials="CN"
        date="DD/MM/YYYY"
        :options="options"
        comment="Comment with a files attached"
      >
        <template #attachments>
          <GMiniatures file-name="File 1 name" file-type="PDF" />
          <GMiniatures file-name="File 2 name" file-type="PDF" />
        </template>
      </GMessageCard>
    </div>
    <GMessageCard
      class="w-[358px]"
      commenter-name="Commenter"
      initials="CN"
      color="information"
      date="DD/MM/YYYY"
      :options="options"
      comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
    >
      <template #media>
        <img src="/gandalf.webp" alt="" class="h-[218px] w-[151px]" />
      </template>
    </GMessageCard>
  </div>
</template>
