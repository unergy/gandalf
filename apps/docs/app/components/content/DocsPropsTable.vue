<script setup lang="ts">
defineProps<{
  items: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
}>()
</script>

<template>
  <div class="not-prose border-border my-6 overflow-hidden rounded-lg border">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-border bg-muted/50 border-b">
          <th class="text-foreground px-4 py-3 text-left font-medium">Prop</th>
          <th class="text-foreground px-4 py-3 text-left font-medium">Type</th>
          <th class="text-foreground px-4 py-3 text-left font-medium">Default</th>
          <th class="text-foreground px-4 py-3 text-left font-medium">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in items"
          :key="item.name"
          :class="i % 2 === 0 ? 'bg-background' : 'bg-muted/20'"
          class="border-border border-b last:border-0"
        >
          <td class="text-foreground px-4 py-3 font-mono text-xs">{{ item.name }}</td>
          <td class="text-muted-foreground px-4 py-3 font-mono text-xs">{{ item.type }}</td>
          <td class="text-muted-foreground px-4 py-3 font-mono text-xs">{{ item.default }}</td>
          <td class="text-muted-foreground px-4 py-3">{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
