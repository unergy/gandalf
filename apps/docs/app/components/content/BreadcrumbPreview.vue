<script setup lang="ts">
import {
  GBreadcrumb,
  GBreadcrumbList,
  GBreadcrumbItem,
  GBreadcrumbLink,
  GBreadcrumbPage,
  GBreadcrumbSeparator,
  GBreadcrumbEllipsis,
} from '@unergy-dev/gandalf'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
    <GBreadcrumb v-for="size in ['md', 'xs'] as const" :key="size" :size="size">
      <GBreadcrumbList>
        <GBreadcrumbItem>
          <GBreadcrumbLink href="#">Proyectos</GBreadcrumbLink>
        </GBreadcrumbItem>
        <GBreadcrumbSeparator />
        <GBreadcrumbItem>
          <GBreadcrumbLink href="#">Level one</GBreadcrumbLink>
        </GBreadcrumbItem>
        <GBreadcrumbSeparator />
        <GBreadcrumbItem>
          <GBreadcrumbPage>Level two</GBreadcrumbPage>
        </GBreadcrumbItem>
      </GBreadcrumbList>
    </GBreadcrumb>
    <GBreadcrumb>
      <GBreadcrumbList>
        <GBreadcrumbItem>
          <GBreadcrumbLink href="#">Proyectos</GBreadcrumbLink>
        </GBreadcrumbItem>
        <GBreadcrumbSeparator />
        <GBreadcrumbItem>
          <GBreadcrumbEllipsis />
        </GBreadcrumbItem>
        <GBreadcrumbSeparator />
        <GBreadcrumbItem>
          <GBreadcrumbPage>Level two</GBreadcrumbPage>
        </GBreadcrumbItem>
      </GBreadcrumbList>
    </GBreadcrumb>
  </div>
</template>
