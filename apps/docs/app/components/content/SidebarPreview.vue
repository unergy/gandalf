<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import {
  ChartLine,
  ChevronRight,
  DollarSign,
  FileText,
  Folder,
  House,
  Landmark,
  Settings,
  Users,
  Zap,
} from 'lucide-vue-next'
import {
  GSidebar,
  GSidebarCollapsible,
  GSidebarCollapsibleContent,
  GSidebarCollapsibleTrigger,
  GSidebarContent,
  GSidebarGroup,
  GSidebarGroupContent,
  GSidebarGroupLabel,
  GSidebarMenu,
  GSidebarMenuButton,
  GSidebarMenuItem,
  GSidebarMenuSub,
  GSidebarMenuSubButton,
  GSidebarMenuSubItem,
  GSidebarProvider,
  GSidebarTrigger,
} from '@unergy-dev/gandalf'

interface Item {
  label: string
  icon: Component
  children?: string[]
}

const open = ref(true)
const active = ref('Facturación de energía')

const groups: { title: string; icon: Component; items: Item[] }[] = [
  {
    title: 'General',
    icon: Folder,
    items: [
      { label: 'Dashboard', icon: House },
      { label: 'Reportes', icon: ChartLine },
    ],
  },
  {
    title: 'Finanzas',
    icon: Landmark,
    items: [
      {
        label: 'Liquidaciones',
        icon: DollarSign,
        children: [
          'Facturación de energía',
          'IDs proyectos',
          'Contratos de energía',
          'Despachos liquidados',
          'Costos comercialización',
        ],
      },
      { label: 'Documentos', icon: FileText },
    ],
  },
  {
    title: 'Operación',
    icon: Zap,
    items: [
      { label: 'Plantas', icon: Zap },
      { label: 'Equipo', icon: Users },
      { label: 'Preferencias', icon: Settings },
    ],
  },
]

const hasActiveChild = (item: Item) => item.children?.includes(active.value) ?? false
const mode = computed(() => (open.value ? 'Type=Expanded' : 'Type=Icon'))
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 overflow-hidden rounded-lg border"
    style="transform: translate(0)"
  >
    <div class="relative h-[520px]">
      <GSidebarProvider v-model:open="open" class="h-full min-h-full">
        <GSidebar>
          <GSidebarContent>
            <GSidebarGroup v-for="group in groups" :key="group.title">
              <GSidebarGroupLabel>
                <component :is="group.icon" />
                <span>{{ group.title }}</span>
              </GSidebarGroupLabel>
              <GSidebarGroupContent>
                <GSidebarMenu>
                  <template v-for="item in group.items" :key="item.label">
                    <GSidebarCollapsible
                      v-if="item.children"
                      default-open
                      :active="hasActiveChild(item)"
                    >
                      <GSidebarCollapsibleTrigger>
                        <GSidebarMenuButton :tooltip="item.label">
                          <component :is="item.icon" />
                          <span>{{ item.label }}</span>
                          <ChevronRight />
                        </GSidebarMenuButton>
                      </GSidebarCollapsibleTrigger>
                      <GSidebarCollapsibleContent :label="item.label">
                        <GSidebarMenuSub>
                          <GSidebarMenuSubItem v-for="child in item.children" :key="child">
                            <GSidebarMenuSubButton
                              as="button"
                              class="w-full"
                              :is-active="active === child"
                              @click="active = child"
                            >
                              <span>{{ child }}</span>
                            </GSidebarMenuSubButton>
                          </GSidebarMenuSubItem>
                        </GSidebarMenuSub>
                      </GSidebarCollapsibleContent>
                    </GSidebarCollapsible>

                    <GSidebarMenuItem v-else>
                      <GSidebarMenuButton
                        :is-active="active === item.label"
                        :tooltip="item.label"
                        @click="active = item.label"
                      >
                        <component :is="item.icon" />
                        <span>{{ item.label }}</span>
                      </GSidebarMenuButton>
                    </GSidebarMenuItem>
                  </template>
                </GSidebarMenu>
              </GSidebarGroupContent>
            </GSidebarGroup>
          </GSidebarContent>
        </GSidebar>

        <main class="bg-base-base flex flex-1 flex-col gap-2 p-4">
          <GSidebarTrigger />
          <p class="text-body-sm text-base-foreground-quiet">
            <code>{{ mode }}</code> · current page: <strong>{{ active }}</strong>. Collapse the rail
            and click the <code>$</code> icon to open Liquidaciones as a floating menu.
          </p>
        </main>
      </GSidebarProvider>
    </div>
  </div>
</template>
