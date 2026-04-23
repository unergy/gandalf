<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()
const route = useRoute()

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

interface NavItem {
  title: string
  path: string
}
interface NavSection {
  title: string
  folderLabel?: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', path: '/docs' },
      { title: 'Installation', path: '/docs/installation' },
      { title: 'Theming', path: '/docs/theming' },
    ],
  },
  {
    title: 'Tooling',
    items: [
      { title: 'Copilot Skills', path: '/docs/skills' },
      { title: 'MCP', path: '/docs/mcp' },
    ],
  },
  {
    title: 'Project',
    items: [
      { title: 'Roadmap', path: '/docs/roadmap' },
      { title: 'Changelog', path: '/docs/changelog' },
    ],
  },
  {
    title: 'Base',
    folderLabel: 'gandalf/base/',
    items: [
      { title: 'Alert', path: '/docs/alert' },
      { title: 'Alert Dialog', path: '/docs/alert-dialog' },
      { title: 'Avatar', path: '/docs/avatar' },
      { title: 'Badge', path: '/docs/badge' },
      { title: 'Breadcrumb', path: '/docs/breadcrumb' },
      { title: 'Button Group', path: '/docs/button-group' },
      { title: 'Checkbox', path: '/docs/checkbox' },
      { title: 'Combobox', path: '/docs/combobox' },
      { title: 'Dialog', path: '/docs/dialog' },
      { title: 'Dropdown', path: '/docs/dropdown' },
      { title: 'Field', path: '/docs/field' },
      { title: 'Input Group', path: '/docs/input-group' },
      { title: 'Label', path: '/docs/label' },
      { title: 'Pagination', path: '/docs/pagination' },
      { title: 'Skeleton', path: '/docs/skeleton' },
      { title: 'Tabs', path: '/docs/tabs' },
      { title: 'Textarea', path: '/docs/textarea' },
    ],
  },
  {
    title: 'Kit',
    folderLabel: 'gandalf/kit/',
    items: [
      { title: 'Avatar', path: '/docs/kit-avatar' },
      { title: 'Checkbox Card', path: '/docs/checkbox-card' },
    ],
  },
]

const allItems = navSections.flatMap((s) => s.items)
const currentIndex = computed(() => allItems.findIndex((i) => i.path === route.path))
const prevItem = computed(() => (currentIndex.value > 0 ? allItems[currentIndex.value - 1] : null))
const nextItem = computed(() =>
  currentIndex.value < allItems.length - 1 ? allItems[currentIndex.value + 1] : null,
)

interface TocLink {
  id: string
  text: string
  children?: TocLink[]
}
const toc = useState<{ links: TocLink[] } | null>('docsToc', () => null)
</script>

<template>
  <div class="bg-background text-foreground min-h-screen">
    <!-- ── Header ─────────────────────────────────────────────────── -->
    <header
      class="border-border bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
    >
      <div class="flex h-14 items-center gap-3 px-6">
        <NuxtLink to="/docs" class="mr-4 flex items-center gap-2">
          <img src="/gandalf.webp" alt="Gandalf UI" class="size-8 rounded-full object-cover" />
          <span class="font-bold tracking-tight">Gandalf UI</span>
          <span
            class="bg-muted text-muted-foreground hidden rounded px-1.5 py-0.5 font-mono text-[10px] sm:inline"
            >v0.1</span
          >
        </NuxtLink>

        <div class="flex-1" />

        <button
          class="border-border hover:bg-muted text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-md border transition-colors"
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleColorMode"
        >
          <Sun v-if="colorMode.value === 'dark'" class="size-4" />
          <Moon v-else class="size-4" />
        </button>
      </div>
    </header>

    <div class="flex">
      <!-- ── Left Sidebar ───────────────────────────────────────────── -->
      <aside
        class="border-border sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r py-8 pr-4 pl-6 lg:block"
      >
        <nav class="space-y-7">
          <div v-for="section in navSections" :key="section.title">
            <!-- Section header -->
            <div class="mb-2 px-3">
              <p class="text-foreground text-xs font-semibold tracking-widest uppercase">
                {{ section.title }}
              </p>
              <code
                v-if="section.folderLabel"
                class="text-muted-foreground/60 font-mono text-[10px]"
                >{{ section.folderLabel }}</code
              >
            </div>

            <!-- Nav items -->
            <ul class="space-y-0.5">
              <li v-for="item in section.items" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="text-muted-foreground hover:text-foreground flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors"
                  active-class="!text-foreground font-medium bg-muted"
                  exact-active-class="!text-foreground font-medium bg-muted"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- ── Main content + Right ToC ──────────────────────────────── -->
      <div class="flex min-w-0 flex-1">
        <main class="min-w-0 flex-1 px-8 py-10">
          <div class="mx-auto max-w-3xl">
            <slot />

            <!-- Prev / Next navigation -->
            <nav
              v-if="prevItem || nextItem"
              aria-label="Page navigation"
              class="border-border mt-16 flex items-stretch justify-between gap-4 border-t pt-8"
            >
              <NuxtLink
                v-if="prevItem"
                :to="prevItem.path"
                class="border-border hover:border-muted-foreground/30 hover:bg-muted/40 flex flex-1 flex-col gap-0.5 rounded-lg border p-4 transition-all"
              >
                <span class="text-muted-foreground text-xs">← Previous</span>
                <span class="text-foreground text-sm font-medium">{{ prevItem.title }}</span>
              </NuxtLink>
              <div v-else class="flex-1" />

              <NuxtLink
                v-if="nextItem"
                :to="nextItem.path"
                class="border-border hover:border-muted-foreground/30 hover:bg-muted/40 flex flex-1 flex-col items-end gap-0.5 rounded-lg border p-4 transition-all"
              >
                <span class="text-muted-foreground text-xs">Next →</span>
                <span class="text-foreground text-sm font-medium">{{ nextItem.title }}</span>
              </NuxtLink>
            </nav>
          </div>
        </main>

        <!-- Right ToC — only shown when page has headings -->
        <aside
          v-if="toc?.links?.length"
          class="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto py-8 pr-4 pl-4 xl:block"
        >
          <p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
            On this page
          </p>
          <ul class="space-y-0.5">
            <template v-for="link in toc.links" :key="link.id">
              <li>
                <a
                  :href="`#${link.id}`"
                  class="text-muted-foreground hover:text-foreground block py-1 text-sm transition-colors"
                  >{{ link.text }}</a
                >
              </li>
              <template v-if="link.children">
                <li v-for="child in link.children" :key="child.id">
                  <a
                    :href="`#${child.id}`"
                    class="text-muted-foreground/60 hover:text-foreground block py-0.5 pl-3 text-xs transition-colors"
                    >{{ child.text }}</a
                  >
                </li>
              </template>
            </template>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</template>
