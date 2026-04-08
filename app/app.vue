<template>
  <div class="flex items-center justify-center gap-4 p-44">
    <Badge variant="default"> Default </Badge>
    <Badge variant="outline" color="action">Action</Badge>
    <Badge variant="outline" color="information">Info</Badge>
    <Badge color="information">Info</Badge>
  </div>
</template>

<script lang="ts" setup>
import Badge from './components/gandalf/badge/Badge.vue'
</script>
