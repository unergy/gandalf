<script setup lang="ts">
import {
  GTable,
  GTableHeader,
  GTableBody,
  GTableFooter,
  GTableRow,
  GTableHead,
  GTableCell,
  GTableCaption,
} from '@/components/gandalf/base/table'

const invoices = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
]
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <GTable>
      <GTableCaption>A list of your recent invoices.</GTableCaption>
      <GTableHeader>
        <GTableRow>
          <GTableHead class="w-[100px]">Invoice</GTableHead>
          <GTableHead>Status</GTableHead>
          <GTableHead>Method</GTableHead>
          <GTableHead class="text-right">Amount</GTableHead>
        </GTableRow>
      </GTableHeader>
      <GTableBody>
        <GTableRow v-for="row in invoices" :key="row.invoice">
          <GTableCell class="font-medium">{{ row.invoice }}</GTableCell>
          <GTableCell>{{ row.status }}</GTableCell>
          <GTableCell>{{ row.method }}</GTableCell>
          <GTableCell class="text-right">{{ row.amount }}</GTableCell>
        </GTableRow>
      </GTableBody>
      <GTableFooter>
        <GTableRow>
          <GTableCell colspan="3">Total</GTableCell>
          <GTableCell class="text-right">$1,200.00</GTableCell>
        </GTableRow>
      </GTableFooter>
    </GTable>
  </div>
</template>
