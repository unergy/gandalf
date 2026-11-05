<script setup lang="ts">
import { ChevronDown, FileCheck, Plus } from 'lucide-vue-next'
import { GButton } from '@unergy/gandalf'
import type { GandalfButtonSize, GandalfButtonVariant } from '@unergy/gandalf'

const variants: GandalfButtonVariant[] = [
    'tonal-primary',
    'tonal-action',
    'tonal-destructive',
    'outline-primary',
    'outline-destructive',
    'ghost-primary',
    'ghost-action',
    'ghost-danger',
]
const sizes: GandalfButtonSize[] = ['md', 'sm', 'xs']
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
        <div v-for="size in sizes" :key="size" class="flex flex-wrap items-center gap-3">
            <GButton v-for="variant in variants" :key="variant" :variant="variant" :size="size">
                <FileCheck /> Action <ChevronDown />
            </GButton>
        </div>
        <div class="flex flex-wrap items-center gap-3">
            <GButton v-for="variant in variants" :key="variant" :variant="variant" disabled>
                <FileCheck /> Action
            </GButton>
        </div>
        <div class="flex flex-wrap items-center gap-3">
            <GButton aria-label="Add"><Plus /></GButton>
            <GButton variant="outline-primary" size="sm" aria-label="Add"><Plus /></GButton>
            <GButton variant="ghost-primary" size="xs" aria-label="Add"><Plus /></GButton>
            <GButton variant="outline-primary" alert-dot>Notifications</GButton>
        </div>
    </div>
</template>
