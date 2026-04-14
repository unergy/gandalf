<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const rawSlug = route.params.slug
const slug = Array.isArray(rawSlug) ? rawSlug.join('/') : (rawSlug ?? '')
const contentPath = slug ? `/docs/${slug}` : '/docs'

const { data: page } = await useAsyncData(contentPath, () =>
  queryCollection('docs').path(contentPath).first(),
)
</script>

<template>
  <div v-if="page">
    <div class="prose prose-zinc dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </div>
  </div>
  <div v-else class="text-muted-foreground py-16 text-center">Page not found.</div>
</template>
