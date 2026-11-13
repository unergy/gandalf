<script setup lang="ts">
import { GAvatarRol, GKitAvatar, GKitAvatarGroup } from '@unergy-dev/gandalf'

const roles = ['legal', 'ambiental', 'forestal', 'civil', 'electrico'] as const
</script>

<template>
  <div class="not-prose border-border my-4 flex flex-col items-center gap-8 rounded-lg border p-8">
    <div class="flex flex-wrap items-center justify-center gap-6">
      <GKitAvatar fallback="AV" size="xs" />
      <GKitAvatar fallback="AV" semantic="action" />
      <GKitAvatar fallback="AV" semantic="success" size="md" type="square" />
      <GKitAvatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="lg" />
      <GKitAvatar fallback="XY" bg="#1e293b" color="#f8fafc" />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-6">
      <GKitAvatarGroup>
        <GKitAvatar fallback="AV" semantic="action" />
      </GKitAvatarGroup>
      <GKitAvatarGroup>
        <GKitAvatar fallback="AV" semantic="action" />
        <GKitAvatar fallback="AV" semantic="information" />
      </GKitAvatarGroup>
      <GKitAvatarGroup>
        <GKitAvatar fallback="AV" semantic="action" />
        <GKitAvatar fallback="AV" semantic="information" />
        <GKitAvatar fallback="AV" semantic="warning" />
      </GKitAvatarGroup>
      <GKitAvatarGroup :more="3">
        <GKitAvatar fallback="AV" semantic="action" />
        <GKitAvatar fallback="AV" semantic="information" />
        <GKitAvatar fallback="AV" semantic="warning" />
      </GKitAvatarGroup>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-6 pb-2">
      <GAvatarRol v-for="role in roles" :key="role" :type="role" />
    </div>
  </div>
</template>
