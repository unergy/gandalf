<script setup lang="ts">
import type { ImgHTMLAttributes } from 'vue'
import { AvatarImage } from '@/components/ui/avatar'

defineProps<{
  src: string
  referrerPolicy?: ImgHTMLAttributes['referrerpolicy']
  crossOrigin?: ImgHTMLAttributes['crossorigin']
}>()
</script>

<template>
  <AvatarImage :src="src" :referrer-policy="referrerPolicy" :cross-origin="crossOrigin" />
</template>
