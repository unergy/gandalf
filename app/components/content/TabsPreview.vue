<script setup lang="ts">
import { GTabs, GTabsList, GTabsTrigger, GTabsContent } from '@/components/gandalf/tabs'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
    <!-- Default variant -->
    <GTabs default-value="tab1">
      <GTabsList variant="default">
        <GTabsTrigger value="tab1">Overview</GTabsTrigger>
        <GTabsTrigger value="tab2">Settings</GTabsTrigger>
        <GTabsTrigger value="tab3" disabled>Disabled</GTabsTrigger>
      </GTabsList>
      <GTabsContent value="tab1">
        <p class="text-muted-foreground pt-2 text-sm">Default variant — overview content here.</p>
      </GTabsContent>
      <GTabsContent value="tab2">
        <p class="text-muted-foreground pt-2 text-sm">Default variant — settings content here.</p>
      </GTabsContent>
    </GTabs>

    <!-- Underline variant -->
    <GTabs default-value="tab1">
      <GTabsList variant="underline">
        <GTabsTrigger value="tab1">Overview</GTabsTrigger>
        <GTabsTrigger value="tab2">Settings</GTabsTrigger>
        <GTabsTrigger value="tab3">Billing</GTabsTrigger>
      </GTabsList>
      <GTabsContent value="tab1">
        <p class="text-muted-foreground pt-2 text-sm">Underline variant — overview content here.</p>
      </GTabsContent>
    </GTabs>

    <!-- Pills variant -->
    <GTabs default-value="tab1">
      <GTabsList variant="pills">
        <GTabsTrigger value="tab1">Overview</GTabsTrigger>
        <GTabsTrigger value="tab2">Settings</GTabsTrigger>
        <GTabsTrigger value="tab3">Billing</GTabsTrigger>
      </GTabsList>
      <GTabsContent value="tab1">
        <p class="text-muted-foreground pt-2 text-sm">Pills variant — overview content here.</p>
      </GTabsContent>
    </GTabs>
  </div>
</template>
