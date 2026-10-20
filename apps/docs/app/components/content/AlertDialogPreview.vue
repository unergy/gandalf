<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    GAlertDialog,
    GAlertDialogTrigger,
    GAlertDialogContent,
    GAlertDialogHeader,
    GAlertDialogFooter,
    GAlertDialogTitle,
    GAlertDialogDescription,
    GAlertDialogAction,
    GAlertDialogCancel,
} from '@/components/gandalf/base/alert-dialog'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8">
        <GAlertDialog>
            <GAlertDialogTrigger as-child>
                <Button variant="outline">Delete account</Button>
            </GAlertDialogTrigger>
            <GAlertDialogContent>
                <GAlertDialogHeader>
                    <GAlertDialogTitle>Are you absolutely sure?</GAlertDialogTitle>
                    <GAlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </GAlertDialogDescription>
                </GAlertDialogHeader>
                <GAlertDialogFooter>
                    <GAlertDialogCancel>Cancel</GAlertDialogCancel>
                    <GAlertDialogAction>Continue</GAlertDialogAction>
                </GAlertDialogFooter>
            </GAlertDialogContent>
        </GAlertDialog>
    </div>
</template>
