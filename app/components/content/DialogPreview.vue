<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    GDialog,
    GDialogTrigger,
    GDialogContent,
    GDialogHeader,
    GDialogFooter,
    GDialogTitle,
    GDialogDescription,
} from '@/components/gandalf/dialog'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8">
        <GDialog>
            <GDialogTrigger as-child>
                <Button variant="outline">Edit profile</Button>
            </GDialogTrigger>
            <GDialogContent>
                <GDialogHeader>
                    <GDialogTitle>Edit profile</GDialogTitle>
                    <GDialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </GDialogDescription>
                </GDialogHeader>
                <GDialogFooter>
                    <Button>Save changes</Button>
                </GDialogFooter>
            </GDialogContent>
        </GDialog>
    </div>
</template>
