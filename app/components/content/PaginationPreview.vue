<script setup lang="ts">
import {
    GPagination,
    GPaginationContent,
    GPaginationItem,
    GPaginationEllipsis,
    GPaginationFirst,
    GPaginationLast,
    GPaginationNext,
    GPaginationPrevious,
} from '@/components/gandalf/base/pagination'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8">
        <GPagination v-slot="{ page }" :total="100" :items-per-page="10" :sibling-count="1" show-edges :default-page="3">
            <GPaginationContent v-slot="{ items }">
                <GPaginationFirst />
                <GPaginationPrevious />
                <template v-for="(item, index) in items" :key="index">
                    <GPaginationItem v-if="item.type === 'page'" :value="item.value"
                        :is-active="item.value === page">
                        {{ item.value }}
                    </GPaginationItem>
                    <GPaginationEllipsis v-else :index="index" />
                </template>
                <GPaginationNext />
                <GPaginationLast />
            </GPaginationContent>
        </GPagination>
    </div>
</template>
