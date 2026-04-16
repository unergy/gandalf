<script setup lang="ts">
import {
    GBreadcrumb,
    GBreadcrumbList,
    GBreadcrumbItem,
    GBreadcrumbLink,
    GBreadcrumbPage,
    GBreadcrumbSeparator,
    GBreadcrumbEllipsis,
} from '@/components/gandalf/breadcrumb'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <GBreadcrumb>
            <GBreadcrumbList>
                <GBreadcrumbItem>
                    <GBreadcrumbLink href="/">Home</GBreadcrumbLink>
                </GBreadcrumbItem>
                <GBreadcrumbSeparator />
                <GBreadcrumbItem>
                    <GBreadcrumbLink href="/docs">Docs</GBreadcrumbLink>
                </GBreadcrumbItem>
                <GBreadcrumbSeparator />
                <GBreadcrumbItem>
                    <GBreadcrumbPage>Breadcrumb</GBreadcrumbPage>
                </GBreadcrumbItem>
            </GBreadcrumbList>
        </GBreadcrumb>
        <GBreadcrumb>
            <GBreadcrumbList>
                <GBreadcrumbItem>
                    <GBreadcrumbLink href="/">Home</GBreadcrumbLink>
                </GBreadcrumbItem>
                <GBreadcrumbSeparator />
                <GBreadcrumbItem>
                    <GBreadcrumbEllipsis />
                </GBreadcrumbItem>
                <GBreadcrumbSeparator />
                <GBreadcrumbItem>
                    <GBreadcrumbPage>Current</GBreadcrumbPage>
                </GBreadcrumbItem>
            </GBreadcrumbList>
        </GBreadcrumb>
    </div>
</template>
