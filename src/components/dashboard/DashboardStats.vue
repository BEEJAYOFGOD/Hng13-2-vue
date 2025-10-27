<script setup>
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  iconColor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Card class="border-2 hover:shadow-lg transition-shadow">
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <CardTitle class="font-medium text-lg text-muted-foreground">
        {{ title }}
      </CardTitle>
      <component :is="icon" :class="`h-5 w-5 ${iconColor}`" />
    </CardHeader>
    <CardContent>
      <div :class="`text-3xl font-bold ${iconColor}`">{{ value }}</div>
      <p class="text-sm text-muted-foreground mt-1">
        {{ description }}
      </p>
    </CardContent>
  </Card>
</template>
