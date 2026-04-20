<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ref, computed } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GCheckbox } from '@/components/gandalf/base/checkbox'
import {
  GCombobox,
  GComboboxAnchor,
  GComboboxEmpty,
  GComboboxInput,
  GComboboxItem,
  GComboboxItemIndicator,
  GComboboxList,
  GComboboxTrigger,
  GComboboxViewport,
} from '@/components/gandalf/base/combobox'
import { cn } from '@/lib/utils'

// ─── Public types ────────────────────────────────────────────────────────────

export interface FieldOption {
  /** Text shown to the user */
  label: string
  /** Underlying value */
  value: string
  disabled?: boolean
}

interface SharedProps {
  disabled?: boolean
  class?: HTMLAttributes['class']
}

interface InputFieldProps extends SharedProps {
  type: 'input'
  /** Native HTML input type (text, email, password, number …). Defaults to "text". */
  inputType?: HTMLInputElement['type']
  placeholder?: string
  modelValue?: string | number
}

interface CheckboxFieldProps extends SharedProps {
  type: 'checkbox'
  modelValue?: boolean | 'indeterminate'
}

interface RadioGroupFieldProps extends SharedProps {
  type: 'radiogroup'
  options: FieldOption[]
  modelValue?: string
}

interface SelectFieldProps extends SharedProps {
  type: 'select'
  options: FieldOption[]
  placeholder?: string
  modelValue?: string
}

interface ComboboxFieldProps extends SharedProps {
  type: 'combobox'
  options: FieldOption[]
  placeholder?: string
  /** Message shown when no options match the search. Defaults to "No results found." */
  emptyText?: string
  modelValue?: string
}

export type DynamicFieldProps =
  | InputFieldProps
  | CheckboxFieldProps
  | RadioGroupFieldProps
  | SelectFieldProps
  | ComboboxFieldProps

// ─── Component ───────────────────────────────────────────────────────────────

const props = defineProps<DynamicFieldProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
}>()

// ─── Combobox state ──────────────────────────────────────────────────────────

const comboboxOpen = ref(false)

// ─── Derived helpers (avoid template casting noise) ──────────────────────────

const options = computed((): FieldOption[] => ('options' in props ? (props.options ?? []) : []))

const placeholder = computed((): string | undefined =>
  'placeholder' in props ? props.placeholder : undefined,
)

const inputType = computed((): string =>
  'inputType' in props ? (props.inputType ?? 'text') : 'text',
)

const emptyText = computed((): string =>
  'emptyText' in props ? (props.emptyText ?? 'No results found.') : 'No results found.',
)

const comboboxDisplayValue = computed(() => (val: unknown): string => {
  const match = options.value.find((o) => o.value === val)
  return match?.label ?? ''
})
</script>

<template>
  <!-- INPUT ─────────────────────────────────────────────────────────────── -->
  <Input
    v-if="type === 'input'"
    :type="inputType"
    :placeholder="placeholder"
    :disabled="disabled"
    :model-value="modelValue as string | number | undefined"
    :class="cn(props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  />

  <!-- CHECKBOX ───────────────────────────────────────────────────────────── -->
  <GCheckbox
    v-else-if="type === 'checkbox'"
    :checked="modelValue as boolean | 'indeterminate' | undefined"
    :disabled="disabled"
    :class="cn(props.class)"
    @update:model-value="emit('update:modelValue', $event)"
  />

  <!-- RADIO GROUP ────────────────────────────────────────────────────────── -->
  <RadioGroup
    v-else-if="type === 'radiogroup'"
    :model-value="modelValue as string | undefined"
    :disabled="disabled"
    :class="cn(props.class)"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <div v-for="option in options" :key="option.value" class="flex items-center gap-2">
      <RadioGroupItem
        :id="`radio-${option.value}`"
        :value="option.value"
        :disabled="option.disabled"
      />
      <Label :for="`radio-${option.value}`" class="cursor-pointer font-normal">
        {{ option.label }}
      </Label>
    </div>
  </RadioGroup>

  <!-- SELECT ─────────────────────────────────────────────────────────────── -->
  <Select
    v-else-if="type === 'select'"
    :model-value="modelValue as string | undefined"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <SelectTrigger :class="cn('w-full', props.class)">
      <SelectValue :placeholder="placeholder ?? 'Select an option…'" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>

  <!-- COMBOBOX ───────────────────────────────────────────────────────────── -->
  <GCombobox
    v-else-if="type === 'combobox'"
    :model-value="modelValue as string | undefined"
    :disabled="disabled"
    v-model:open="comboboxOpen"
    :class="cn('w-full', props.class)"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <GComboboxAnchor>
      <GComboboxInput
        :placeholder="placeholder ?? 'Search…'"
        :display-value="comboboxDisplayValue"
      />
      <GComboboxTrigger>
        <ChevronsUpDown class="size-4 shrink-0 opacity-50" />
      </GComboboxTrigger>
    </GComboboxAnchor>
    <GComboboxList>
      <GComboboxViewport>
        <GComboboxEmpty>{{ emptyText }}</GComboboxEmpty>
        <GComboboxItem
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
          <GComboboxItemIndicator>
            <Check class="size-4" />
          </GComboboxItemIndicator>
        </GComboboxItem>
      </GComboboxViewport>
    </GComboboxList>
  </GCombobox>
</template>
