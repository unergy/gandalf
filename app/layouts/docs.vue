<script setup lang="ts">
const navSections = [
  {
    title: 'Getting Started',
    items: [{ title: 'Introduction', path: '/docs' }],
  },
  {
    title: 'Components',
    items: [
      { title: 'Badge', path: '/docs/badge' },
      { title: 'Dropdown', path: '/docs/dropdown' },
      { title: 'Tabs', path: '/docs/tabs' },
    ],
  },
]
</script>

<template>
  <div class="bg-background text-foreground flex min-h-screen flex-col">
    <!-- Header -->
    <header
      class="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div class="flex h-14 items-center gap-4 px-6">
        <NuxtLink to="/docs" class="flex items-center gap-2">
          <span class="text-xl">⚡</span>
          <span class="text-base font-bold tracking-tight">Gandalf UI</span>
        </NuxtLink>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside
        class="border-border sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r py-6 pr-4 pl-6 md:block"
      >
        <nav class="space-y-6">
          <div v-for="section in navSections" :key="section.title">
            <h4
              class="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase"
            >
              {{ section.title }}
            </h4>
            <ul class="space-y-0.5">
              <li v-for="item in section.items" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-md px-3 py-1.5 text-sm transition-colors"
                  active-class="bg-muted text-foreground font-medium"
                  exact-active-class="bg-muted text-foreground font-medium"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="min-w-0 flex-1 px-8 py-10">
        <div class="mx-auto max-w-3xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
