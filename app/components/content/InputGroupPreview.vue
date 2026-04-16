<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import {
    GInputGroup,
    GInputGroupAddon,
    GInputGroupInput,
    GInputGroupButton,
    GInputGroupText,
} from '@/components/gandalf/base/input-group'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <GInputGroup>
            <GInputGroupAddon align="inline-start">
                <Search class="size-4 text-muted-foreground" />
            </GInputGroupAddon>
            <GInputGroupInput />
        </GInputGroup>
        <GInputGroup>
            <GInputGroupText>https://</GInputGroupText>
            <GInputGroupInput />
        </GInputGroup>
        <GInputGroup>
            <GInputGroupInput />
            <GInputGroupButton variant="ghost" size="xs">
                <X class="size-4" />
            </GInputGroupButton>
        </GInputGroup>
    </div>
</template>
