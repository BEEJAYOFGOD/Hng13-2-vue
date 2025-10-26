<script setup>
import { reactive } from 'vue'

const features = reactive([
  {
    title: 'Real-time Collaboration',
    description:
      'Work together seamlessly with your team. See updates instantly and never miss important changes.',
    icon: '👥',
  },
  {
    title: 'Smart Prioritization',
    description:
      'Automatically prioritize tickets based on urgency, impact, and custom rules you define.',
    icon: '⚡',
  },
  {
    title: 'Advanced Filtering',
    description: 'Find exactly what you need with powerful search and filtering capabilities.',
    icon: '🔍',
  },
  {
    title: 'Automation Rules',
    description: 'Set up workflows that automatically assign, update, and resolve tickets.',
    icon: '🤖',
  },
  {
    title: 'Detailed Analytics',
    description: 'Track metrics that matter. Get insights into team performance and ticket trends.',
    icon: '📊',
  },
  {
    title: 'Integrations',
    description: 'Connect with your favorite tools. Slack, email, webhooks, and more.',
    icon: '🔗',
  },
])
</script>

<template>
  <section id="features" class="py-20 md:py-32 bg-card/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Powerful Features for Modern Teams
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to manage tickets efficiently and keep your team aligned.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
        >
          <div class="text-4xl mb-4">
            {{ feature.icon }}
          </div>
          <h3 class="text-xl font-semibold text-foreground mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-muted-foreground">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
