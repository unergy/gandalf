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
    <div
      class="prose prose-zinc prose-pre:p-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none max-w-none"
    >
      <ContentRenderer :value="page" />
    </div>
  </div>
  <div v-else class="text-muted-foreground py-16 text-center">Page not found.</div>
</template>
