<script setup lang="ts">
import { GTabs, GTabsList, GTabsTrigger, GTabsContent } from '@unergy-dev/gandalf'
import { ChartColumn, ListChecks, Settings } from 'lucide-vue-next'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-8 rounded-lg border p-8">
    <!-- Tabs Toggle Primary -->
    <GTabs default-value="tab2">
      <GTabsList variant="toggle-primary">
        <GTabsTrigger value="tab1">Overview</GTabsTrigger>
        <GTabsTrigger value="tab2">Settings</GTabsTrigger>
        <GTabsTrigger value="tab3">Billing</GTabsTrigger>
        <GTabsTrigger value="tab4" disabled>Disabled</GTabsTrigger>
      </GTabsList>
      <GTabsContent value="tab2">
        <p class="text-muted-foreground pt-2 text-sm">Toggle primary: settings content here.</p>
      </GTabsContent>
    </GTabs>

    <!-- Tabs Toggle Secondary -->
    <GTabs default-value="day">
      <GTabsList variant="toggle-secondary">
        <GTabsTrigger value="day">Día</GTabsTrigger>
        <GTabsTrigger value="week">Semana</GTabsTrigger>
        <GTabsTrigger value="month">Mes</GTabsTrigger>
      </GTabsList>
    </GTabs>

    <!-- Tabs (Tab Item) -->
    <GTabs default-value="tasks">
      <GTabsList variant="tab">
        <GTabsTrigger value="tasks"><ListChecks />Tareas</GTabsTrigger>
        <GTabsTrigger value="reports"><ChartColumn />Reportes</GTabsTrigger>
        <GTabsTrigger value="settings"><Settings />Ajustes</GTabsTrigger>
      </GTabsList>
      <GTabsContent value="tasks">
        <p class="text-muted-foreground pt-2 text-sm">Tab: tasks content here.</p>
      </GTabsContent>
    </GTabs>
  </div>
</template>
