<script setup lang="ts">
import {
  GKitUserMenu,
  GMenuItem,
  GMenuSeparator,
  GMenuSub,
  GMenuSubContent,
  GMenuSubTrigger,
} from '@unergy-dev/gandalf'
import { KeyRound, Languages, LogOut, Settings2 } from 'lucide-vue-next'
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8"
  >
    <GKitUserMenu name="Ana Valencia" email="ana@unergy.io">
      <GMenuItem><KeyRound />Cambiar contraseña</GMenuItem>
      <GMenuSub>
        <GMenuSubTrigger><Settings2 />Preferencias</GMenuSubTrigger>
        <GMenuSubContent>
          <GMenuItem><Languages />Idioma</GMenuItem>
        </GMenuSubContent>
      </GMenuSub>
      <GMenuSeparator />
      <GMenuItem variant="destructive"><LogOut />Cerrar sesión</GMenuItem>
      <template #footer>
        Versión
        <span>1.0.0</span>
      </template>
    </GKitUserMenu>
  </div>
</template>
