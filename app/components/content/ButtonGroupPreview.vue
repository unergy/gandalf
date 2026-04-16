<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { GButtonGroup, GButtonGroupSeparator, GButtonGroupText } from '@/components/gandalf/button-group'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col items-center gap-4 rounded-lg border p-8">
        <GButtonGroup>
            <Button variant="outline">Left</Button>
            <GButtonGroupSeparator />
            <Button variant="outline">Center</Button>
            <GButtonGroupSeparator />
            <Button variant="outline">Right</Button>
        </GButtonGroup>
        <GButtonGroup>
            <Button variant="outline">Action</Button>
            <GButtonGroupText>or</GButtonGroupText>
            <Button variant="outline">Cancel</Button>
        </GButtonGroup>
    </div>
</template>
