<script setup lang="ts">
import { ref } from 'vue'
import { ClipboardCheck } from 'lucide-vue-next'
import {
  GButton,
  GDialog,
  GDialogBody,
  GDialogClose,
  GDialogContent,
  GDialogDescription,
  GDialogFooter,
  GDialogHeader,
  GDialogTitle,
  GDialogTrigger,
  GKitSelect,
  GLabel,
} from '@unergy-dev/gandalf'
import type { SelectOptions } from '@unergy-dev/gandalf'

const props = withDefaults(defineProps<{ defaultOpen?: boolean }>(), { defaultOpen: false })
const open = ref(props.defaultOpen)

const mandatory = ref<string | undefined>()
const optional = ref<string | undefined>()
const supporting = ref<string | undefined>()

const options: SelectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-center justify-center gap-3 rounded-lg border p-8"
  >
    <GDialog v-model:open="open">
      <GDialogTrigger as-child>
        <GButton variant="outline-primary">Single form</GButton>
      </GDialogTrigger>
      <GDialogContent>
        <GDialogHeader>
          <GDialogTitle>Title</GDialogTitle>
        </GDialogHeader>
        <GDialogBody>
          <GDialogDescription>
            Description of the notification Description of the notification
          </GDialogDescription>
        </GDialogBody>
        <GDialogBody>
          <div class="flex flex-col gap-1">
            <GLabel for="dialog-mandatory" required>Mandatory Form Option</GLabel>
            <GKitSelect
              id="dialog-mandatory"
              v-model="mandatory"
              :options="options"
              placeholder="Placeholder"
            />
          </div>
          <div class="flex flex-col gap-1">
            <GLabel for="dialog-optional">Optional Form Option</GLabel>
            <GKitSelect
              id="dialog-optional"
              v-model="optional"
              :options="options"
              placeholder="Placeholder"
            />
          </div>
          <div class="flex flex-col gap-1">
            <GLabel for="dialog-supporting">Form Option &amp; Supporting Text</GLabel>
            <GKitSelect
              id="dialog-supporting"
              v-model="supporting"
              :options="options"
              placeholder="Placeholder"
            />
            <p class="text-base-foreground-extra-quiet text-xs leading-[normal]">
              Supporting text
            </p>
          </div>
        </GDialogBody>
        <GDialogFooter>
          <GDialogClose as-child>
            <GButton variant="outline-primary">Action 2</GButton>
          </GDialogClose>
          <GButton>Action 1</GButton>
        </GDialogFooter>
      </GDialogContent>
    </GDialog>

    <GDialog>
      <GDialogTrigger as-child>
        <GButton variant="outline-primary">With icon</GButton>
      </GDialogTrigger>
      <GDialogContent>
        <GDialogHeader>
          <template #icon><ClipboardCheck /></template>
          <GDialogTitle>Title</GDialogTitle>
        </GDialogHeader>
        <GDialogBody>
          <GDialogDescription>
            Description of the notification Description of the notification
          </GDialogDescription>
        </GDialogBody>
        <GDialogFooter show-close-button close-label="Action 2">
          <GButton>Action 1</GButton>
        </GDialogFooter>
      </GDialogContent>
    </GDialog>
  </div>
</template>
