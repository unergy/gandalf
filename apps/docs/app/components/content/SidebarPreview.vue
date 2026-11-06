<script setup lang="ts">
import { ref } from 'vue'
import { ChartLine, FileText, Folder, House, Settings, Users, Zap } from 'lucide-vue-next'
import {
  GSidebar,
  GSidebarContent,
  GSidebarGroup,
  GSidebarGroupLabel,
  GSidebarMenu,
  GSidebarMenuButton,
  GSidebarMenuItem,
  GSidebarProvider,
  GSidebarTrigger,
} from '@unergy/gandalf'

const open = ref(true)
const active = ref('Dashboard')

const groups = [
  {
    title: 'General',
    icon: Folder,
    items: [
      { label: 'Dashboard', icon: House },
      { label: 'Reports', icon: ChartLine },
    ],
  },
  {
    title: 'Operation',
    icon: Zap,
    items: [
      { label: 'Plants', icon: Zap },
      { label: 'Documents', icon: FileText },
    ],
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [
      { label: 'Team', icon: Users },
      { label: 'Preferences', icon: Settings },
    ],
  },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 overflow-hidden rounded-lg border"
    style="transform: translate(0)"
  >
    <div class="relative h-[420px]">
      <GSidebarProvider v-model:open="open" class="h-full min-h-full">
        <GSidebar>
          <GSidebarContent>
            <GSidebarGroup v-for="group in groups" :key="group.title">
              <GSidebarGroupLabel>
                <component :is="group.icon" />
                <span>{{ group.title }}</span>
              </GSidebarGroupLabel>
              <GSidebarMenu>
                <GSidebarMenuItem v-for="item in group.items" :key="item.label">
                  <GSidebarMenuButton
                    :is-active="active === item.label"
                    :tooltip="item.label"
                    @click="active = item.label"
                  >
                    <component :is="item.icon" />
                    <span>{{ item.label }}</span>
                  </GSidebarMenuButton>
                </GSidebarMenuItem>
              </GSidebarMenu>
            </GSidebarGroup>
          </GSidebarContent>
        </GSidebar>

        <main class="bg-base-base flex flex-1 flex-col gap-2 p-4">
          <GSidebarTrigger />
          <p class="text-body-sm text-base-foreground-quiet">
            Toggle the rail to switch between Figma's <code>Type=Expanded</code> and
            <code>Type=Icon</code>.
          </p>
        </main>
      </GSidebarProvider>
    </div>
  </div>
</template>
