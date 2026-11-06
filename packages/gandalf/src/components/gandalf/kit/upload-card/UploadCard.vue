<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfUploadCardType } from './index'
import { Dot, File, RefreshCw, X } from 'lucide-vue-next'
import { computed } from 'vue'
import { GBadge } from '@/components/gandalf/base/badge'
import { GButton } from '@/components/gandalf/base/button'
import { cn } from '@/lib/utils'
import { gandalfUploadCardStatusVariants, gandalfUploadCardVariants } from './index'

const props = withDefaults(
  defineProps<{
    /** "File name" in Figma, truncated to one line. */
    fileName: string
    type?: GandalfUploadCardType
    /** "# MB" in Figma, shown as given. */
    fileSize?: string
    /** Percentage of `in-progress`, rendered as "25%". */
    progress?: number
    /** Badge label, e.g. "KML" ("TYPE" in Figma). */
    fileType?: string
    /** Replaces the status word at the end of the meta line. */
    statusLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    type: 'queue',
    fileSize: undefined,
    progress: undefined,
    fileType: undefined,
    statusLabel: undefined,
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'retry'): void
}>()

const defaultStatus: Record<GandalfUploadCardType, string> = {
  queue: 'Queue',
  'in-progress': 'In progress',
  completed: 'Completed',
  error: 'Error',
}

const status = computed(() => {
  if (props.statusLabel !== undefined) return props.statusLabel
  if (props.type === 'in-progress' && props.progress !== undefined) return `${props.progress}%`
  return defaultStatus[props.type]
})
</script>

<template>
  <div data-slot="upload-card" :class="cn(gandalfUploadCardVariants({ type }), props.class)">
    <span class="text-base-foreground shrink-0 [&_svg]:size-[18px]">
      <slot name="icon"><File /></slot>
    </span>

    <div class="flex min-w-0 flex-1 items-center gap-1">
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="text-base-foreground truncate text-sm leading-[normal] font-semibold">
          {{ fileName }}
        </span>
        <span
          class="text-base-foreground-extra-quiet flex h-[17px] items-center gap-0.5 text-sm leading-[normal]"
        >
          <span v-if="fileSize" class="shrink-0">{{ fileSize }}</span>
          <Dot v-if="fileSize" class="size-3.5 shrink-0" aria-hidden="true" />
          <span :class="gandalfUploadCardStatusVariants({ type })">
            <slot name="status">{{ status }}</slot>
          </span>
        </span>
      </div>

      <slot name="badge">
        <GBadge v-if="fileType" color="action" shape="square" size="xs">{{ fileType }}</GBadge>
      </slot>

      <slot name="actions">
        <GButton
          v-if="type === 'error'"
          variant="ghost-primary"
          size="md"
          aria-label="Retry upload"
          @click="emit('retry')"
        >
          <RefreshCw />
        </GButton>
        <GButton
          v-else
          variant="ghost-primary"
          size="md"
          aria-label="Remove file"
          @click="emit('remove')"
        >
          <X />
        </GButton>
      </slot>
    </div>
  </div>
</template>
