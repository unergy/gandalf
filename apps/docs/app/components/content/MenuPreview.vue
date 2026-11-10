<script setup lang="ts">
import {
  GButton,
  GMenu,
  GMenuContent,
  GMenuItem,
  GMenuSeparator,
  GMenuTrigger,
} from '@unergy-dev/gandalf'
import { Copy, EllipsisVertical, FileInput, History, LogOut, Map } from 'lucide-vue-next'
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8"
  >
    <GMenu>
      <GMenuTrigger>
        <GButton variant="ghost-primary" size="sm" aria-label="More options">
          <EllipsisVertical />
        </GButton>
      </GMenuTrigger>
      <GMenuContent align="end">
        <GMenuItem><Map />Descargar KMZ</GMenuItem>
        <GMenuItem><Copy />Copiar link</GMenuItem>
        <GMenuItem><History />Historial</GMenuItem>
        <GMenuItem disabled><FileInput />Actualizar KMZ</GMenuItem>
        <GMenuSeparator />
        <GMenuItem variant="destructive"><LogOut />Salir de visor de KMZ</GMenuItem>
      </GMenuContent>
    </GMenu>
  </div>
</template>
