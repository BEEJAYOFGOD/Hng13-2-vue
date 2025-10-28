<script setup>
// Layout logic if needed

import { Button } from '@/components/ui/button'
</script>

<template>
  <section className="py-20 md:py-32 bg-primary text-primary-foreground">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="md:text-3xl text-2xl font-bold mb-6">
        Ready to Transform Your Ticket Management?
      </h2>
      <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
        Join thousands of teams already using Ticko to streamline their workflow and improve
        productivity.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="secondary" asChild>
          <RouterLink to="/signup">Start Free Trial</RouterLink>
        </Button>
        <Button
          size="lg"
          variant="primary"
          className="border px-4 flex items-center rounded-md"
          asChild
        >
          <RouterLink to="/signup">Start Free Trial</RouterLink>
        </Button>
      </div>
    </div>
  </section>
</template>
