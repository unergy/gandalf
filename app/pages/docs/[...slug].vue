<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const rawSlug = route.params.slug
const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : (rawSlug ?? '')
const contentPath = slug ? `/docs/${slug}` : '/docs'

const { data: page } = await useAsyncData(contentPath, () =>
  queryCollection('docs').path(contentPath).first(),
)

// Share table of contents with the layout
const toc = useState<unknown>('docsToc', () => null)
watch(
  page,
  (p) => {
    toc.value = p?.body?.toc ?? null
  },
  { immediate: true },
)

const statusConfig = {
  complete: { label: 'Complete', color: 'success' as const },
  'in-progress': { label: 'In Progress', color: 'warning' as const },
  pending: { label: 'Pending', color: 'default' as const },
}

// SEO
useHead({
  title: () => (page.value?.title ? `${page.value.title} — Gandalf UI` : 'Gandalf UI'),
  meta: [{ name: 'description', content: () => page.value?.description ?? '' }],
})
</script>

<template>
  <div v-if="page">
    <!-- Page header from frontmatter -->
    <div class="border-border mb-8 border-b pb-8">
      <p class="text-muted-foreground mb-2 font-mono text-xs font-medium tracking-wider uppercase">
        Component
      </p>
      <div class="mb-2 flex items-center gap-3">
        <h1 class="text-foreground text-3xl font-bold tracking-tight">{{ page.title }}</h1>
        <GBadge
          v-if="page.status"
          variant="outline"
          shape="square"
          :color="statusConfig[page.status as keyof typeof statusConfig]?.color ?? 'default'"
        >
          {{ statusConfig[page.status as keyof typeof statusConfig]?.label ?? page.status }}
        </GBadge>
      </div>
      <p v-if="page.description" class="text-muted-foreground text-lg leading-relaxed">
        {{ page.description }}
      </p>
    </div>

    <div
      class="prose prose-zinc prose-pre:p-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none dark:prose-invert max-w-none"
    >
      <ContentRenderer :value="page" />
    </div>
  </div>
  <div v-else class="text-muted-foreground py-16 text-center">Page not found.</div>
</template>
