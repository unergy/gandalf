<script setup lang="ts">
import { ref } from 'vue'
import { ChartLine, FileText, House, Joystick, Leaf, Map, Settings } from 'lucide-vue-next'
import type { SidebarNavGroup } from '@unergy-dev/gandalf'
import { GKitSidebar, GSidebarProvider, GSidebarTrigger } from '@unergy-dev/gandalf'

const open = ref(true)
const active = ref('map')

const groups: SidebarNavGroup[] = [
  {
    label: 'Herramientas',
    items: [
      { value: 'map', title: 'Mapa', icon: Map },
      { value: 'tetris', title: 'PV Tetris', icon: Joystick },
      { value: 'geovisor', title: 'Geovisor', icon: Leaf },
    ],
  },
  {
    label: 'General',
    items: [
      { value: 'home', title: 'Inicio', icon: House },
      { value: 'reports', title: 'Reportes', icon: ChartLine },
      { value: 'docs', title: 'Documentos', icon: FileText, disabled: true },
      { value: 'settings', title: 'Ajustes', icon: Settings },
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
        <GKitSidebar v-model="active" :groups="groups" aria-label="Herramientas" />

        <main class="bg-base-base flex flex-1 flex-col gap-2 p-4">
          <GSidebarTrigger />
          <p class="text-body-sm text-base-foreground-quiet">
            Active: <code>{{ active }}</code>. Collapse the rail to see the icons and tooltips.
          </p>
        </main>
      </GSidebarProvider>
    </div>
  </div>
</template>
