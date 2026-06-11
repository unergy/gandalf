<script setup lang="ts">
import { GTabs, GTabsList, GTabsTrigger, GTabsContent } from '@/components/gandalf/base/tabs'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-8 rounded-lg border p-8">
    <!-- Base: auto-width vs full-width -->
    <div class="grid grid-cols-2 gap-6">
      <GTabs default-value="tab1">
        <GTabsList variant="base">
          <GTabsTrigger value="tab1">Overview</GTabsTrigger>
          <GTabsTrigger value="tab2">Settings</GTabsTrigger>
          <GTabsTrigger value="tab3" disabled>Disabled</GTabsTrigger>
        </GTabsList>
        <GTabsContent value="tab1">
          <p class="text-muted-foreground pt-2 text-sm">Base — overview content here.</p>
        </GTabsContent>
        <GTabsContent value="tab2">
          <p class="text-muted-foreground pt-2 text-sm">Base — settings content here.</p>
        </GTabsContent>
      </GTabs>

      <GTabs default-value="tab1">
        <GTabsList variant="base" full-width>
          <GTabsTrigger value="tab1">Overview</GTabsTrigger>
          <GTabsTrigger value="tab2">Settings</GTabsTrigger>
          <GTabsTrigger value="tab3">Billing</GTabsTrigger>
        </GTabsList>
        <GTabsContent value="tab1">
          <p class="text-muted-foreground pt-2 text-sm">Base full-width — overview content here.</p>
        </GTabsContent>
      </GTabs>
    </div>

    <!-- Outline: auto-width vs full-width -->
    <div class="grid grid-cols-2 gap-6">
      <GTabs default-value="tab1">
        <GTabsList variant="outline">
          <GTabsTrigger value="tab1">Overview</GTabsTrigger>
          <GTabsTrigger value="tab2">Settings</GTabsTrigger>
          <GTabsTrigger value="tab3">Billing</GTabsTrigger>
        </GTabsList>
        <GTabsContent value="tab1">
          <p class="text-muted-foreground pt-2 text-sm">Outline — overview content here.</p>
        </GTabsContent>
      </GTabs>

      <GTabs default-value="tab1">
        <GTabsList variant="outline" full-width>
          <GTabsTrigger value="tab1">Overview</GTabsTrigger>
          <GTabsTrigger value="tab2">Settings</GTabsTrigger>
          <GTabsTrigger value="tab3">Billing</GTabsTrigger>
        </GTabsList>
        <GTabsContent value="tab1">
          <p class="text-muted-foreground pt-2 text-sm">Outline full-width — overview content here.</p>
        </GTabsContent>
      </GTabs>
    </div>
  </div>
</template>
