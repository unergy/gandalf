<script setup lang="ts">
import {
    GField,
    GFieldLabel,
    GFieldDescription,
    GFieldError,
    GFieldGroup,
    GFieldSet,
    GFieldLegend,
    GFieldSeparator,
} from '@/components/gandalf/field'
import { Input } from '@/components/ui/input'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
        <GFieldSet>
            <GFieldLegend>Profile</GFieldLegend>
            <GFieldDescription>This appears on invoices and emails.</GFieldDescription>
            <GFieldGroup>
                <GField>
                    <GFieldLabel for="preview-name">Full name</GFieldLabel>
                    <Input id="preview-name" autocomplete="off" placeholder="Evil Rabbit" />
                    <GFieldDescription>Your public display name.</GFieldDescription>
                </GField>
                <GFieldSeparator />
                <GField>
                    <GFieldLabel for="preview-email">Email</GFieldLabel>
                    <Input id="preview-email" type="email" autocomplete="off" placeholder="rabbit@example.com" />
                </GField>
                <GField data-invalid>
                    <GFieldLabel for="preview-username">Username</GFieldLabel>
                    <Input id="preview-username" autocomplete="off" value="admin" aria-invalid />
                    <GFieldError>This username is already taken.</GFieldError>
                </GField>
            </GFieldGroup>
        </GFieldSet>
    </div>
</template>
