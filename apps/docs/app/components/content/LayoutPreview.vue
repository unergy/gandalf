<script setup lang="ts">
import { ref } from 'vue'
import { Bell, CircleHelp, Ellipsis, Filter, History, Settings, SquareCheck, Wrench } from 'lucide-vue-next'
import type { SidebarNavGroup } from '@unergy-dev/gandalf'
import {
  GBadge,
  GBreadcrumb,
  GBreadcrumbItem,
  GBreadcrumbLink,
  GBreadcrumbList,
  GBreadcrumbPage,
  GBreadcrumbSeparator,
  GButton,
  GHeader,
  GKitAvatar,
  GLayout,
  GLayoutBreadcrumbs,
  GLayoutTitle,
  GSearchField,
  GSegment,
  GSegmentedButton,
} from '@unergy-dev/gandalf'

const level = ref('first')
const active = ref('1-0')

const groups: SidebarNavGroup[] = ['First title', 'Second title'].map((label, g) => ({
  label,
  icon: SquareCheck,
  items: ['Item one', 'Item two', 'Item three'].map((title, i) => ({
    value: `${g + 1}-${i}`,
    title,
    icon: SquareCheck,
  })),
}))
</script>

<template>
  <div class="not-prose my-4 flex flex-col gap-3">
    <GSegmentedButton v-model="level" class="self-start">
      <GSegment value="first">First Level</GSegment>
      <GSegment value="second">Second Level</GSegment>
    </GSegmentedButton>

    <div
      class="border-border overflow-hidden rounded-lg border"
      style="transform: translate(0)"
    >
      <GLayout v-model="active" :groups="groups" class="h-[520px]">
        <template #header>
          <GHeader>
            <template #actions>
              <GButton variant="ghost-primary" size="xs" aria-label="Help"><CircleHelp /></GButton>
              <GButton variant="ghost-primary" size="xs" aria-label="Settings"><Settings /></GButton>
              <GButton variant="ghost-primary" size="xs" alert-dot aria-label="Notifications">
                <Bell />
              </GButton>
              <GKitAvatar fallback="AV" />
            </template>
          </GHeader>
        </template>

        <template v-if="level === 'first'">
          <GLayoutTitle
            title="Level one"
            description="Brief description of a Level 1 screen"
            :icon="SquareCheck"
          />
          <div class="flex items-center gap-2 px-6 py-3">
            <GSearchField placeholder="Placeholder..." class="max-w-80" />
            <GButton variant="outline-primary"><Filter />Filters</GButton>
            <GButton class="ml-auto"><Ellipsis />Actions</GButton>
          </div>
        </template>

        <template v-else>
          <GLayoutBreadcrumbs @back="level = 'first'">
            <GBreadcrumb>
              <GBreadcrumbList>
                <GBreadcrumbItem>
                  <GBreadcrumbLink href="#" @click.prevent="level = 'first'">Level one</GBreadcrumbLink>
                </GBreadcrumbItem>
                <GBreadcrumbSeparator />
                <GBreadcrumbItem><GBreadcrumbPage>Level two</GBreadcrumbPage></GBreadcrumbItem>
              </GBreadcrumbList>
            </GBreadcrumb>
            <template #actions>
              <GButton variant="ghost-primary" size="sm" aria-label="History"><History /></GButton>
              <GButton size="sm"><Wrench />Tools</GButton>
            </template>
          </GLayoutBreadcrumbs>
          <GLayoutTitle level="second" title="Level two">
            <GBadge>State</GBadge>
          </GLayoutTitle>
        </template>
      </GLayout>
    </div>
  </div>
</template>
