<script setup lang="ts">
import { computed } from 'vue'
import { GCheckbox } from '@/components/gandalf/base/checkbox'
import { GLabel } from '@/components/gandalf/base/label'

const props = defineProps<{
  id: string
  label: string
  description?: string
  checked?: boolean | 'indeterminate'
  defaultChecked?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:checked', value: boolean | 'indeterminate'): void
}>()

const checkboxId = computed(() => props.id)
</script>

<template>
  <GLabel
    :for="checkboxId"
    class="hover:bg-accent/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-aria-checked:border-action has-aria-checked:bg-action-muted dark:has-aria-checked:border-action-bold dark:has-aria-checked:bg-action-muted"
  >
    <GCheckbox
      :id="checkboxId"
      :checked="checked"
      :default-checked="defaultChecked"
      :disabled="disabled"
      class="data-[state=checked]:border-action data-[state=checked]:bg-action data-[state=checked]:text-white dark:data-[state=checked]:border-action-bold dark:data-[state=checked]:bg-action-bold"
      @update:model-value="emit('update:checked', $event)"
    />
    <div class="grid gap-1.5 font-normal">
      <slot name="label">
        <p class="text-sm leading-none font-medium">{{ label }}</p>
      </slot>
      <slot name="description">
        <p v-if="description" class="text-muted-foreground text-sm">{{ description }}</p>
      </slot>
    </div>
  </GLabel>
</template>
