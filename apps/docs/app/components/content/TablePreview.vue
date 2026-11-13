<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  EllipsisVertical,
} from 'lucide-vue-next'
import {
  GAvatar,
  GAvatarFallback,
  GBadge,
  GButton,
  GCheckbox,
  GTable,
  GTableHeader,
  GTableBody,
  GTableRow,
  GTableHead,
  GTableCell,
} from '@unergy-dev/gandalf'

const badges = ['default', 'action', 'information', 'success', 'warning', 'destructive'] as const
const rows = badges.map((color, i) => ({ id: i, color }))
const selected = ref<number[]>([0, 2, 4])

function toggle(id: number, value: boolean | 'indeterminate') {
  selected.value = value === true ? [...selected.value, id] : selected.value.filter((s) => s !== id)
}
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <GTable>
      <GTableHeader>
        <GTableRow>
          <GTableHead class="w-10" />
          <GTableHead>
            COLUMN 1
            <template #action>
              <GButton variant="ghost-primary" size="xs" aria-label="Sort column 1">
                <ChevronDown class="text-base-foreground-extra-quiet" />
              </GButton>
            </template>
          </GTableHead>
          <GTableHead>COLUMN 2</GTableHead>
          <GTableHead>COLUMN 3</GTableHead>
          <GTableHead description="Description">COLUMN 4</GTableHead>
          <GTableHead>COLUMN 5</GTableHead>
          <GTableHead class="w-11" />
        </GTableRow>
      </GTableHeader>
      <GTableBody>
        <GTableRow
          v-for="row in rows"
          :key="row.id"
          :data-state="selected.includes(row.id) ? 'selected' : undefined"
        >
          <GTableCell>
            <GCheckbox
              :model-value="selected.includes(row.id)"
              aria-label="Select row"
              @update:model-value="toggle(row.id, $event)"
            />
          </GTableCell>
          <GTableCell description="Description">Title</GTableCell>
          <GTableCell>
            <GAvatar semantic="action"><GAvatarFallback>AV</GAvatarFallback></GAvatar>
          </GTableCell>
          <GTableCell>
            <span class="flex items-center gap-1">
              <ClipboardCheck class="size-4" />
              Title &amp; Icon
            </span>
          </GTableCell>
          <GTableCell>
            <GBadge size="sm" :color="row.color">Label</GBadge>
          </GTableCell>
          <GTableCell>
            <span class="flex items-center gap-1">
              <span class="flex-1">Label &amp; Button</span>
              <GButton variant="ghost-primary" size="xs" aria-label="Open">
                <ClipboardCheck />
              </GButton>
            </span>
          </GTableCell>
          <GTableCell class="text-center">
            <GButton variant="ghost-primary" size="xs" aria-label="Row actions">
              <EllipsisVertical />
            </GButton>
          </GTableCell>
        </GTableRow>
      </GTableBody>
      <template #footer>
        <p class="min-w-0 flex-1 truncate">
          <span class="text-base-inverse font-semibold">5</span> de
          <span class="text-base-inverse font-semibold">20</span> row(s) displayed
        </p>
        <div class="flex items-center">
          <GButton variant="ghost-primary" size="xs" aria-label="Previous page">
            <ChevronLeft />
          </GButton>
          <GButton variant="ghost-primary" size="xs">1</GButton>
          <GButton variant="ghost-primary" size="xs">2</GButton>
          <GButton variant="ghost-primary" size="xs">...</GButton>
          <GButton variant="ghost-primary" size="xs">4</GButton>
          <GButton variant="ghost-primary" size="xs" aria-label="Next page">
            <ChevronRight />
          </GButton>
        </div>
      </template>
    </GTable>
  </div>
</template>
