<script setup>
import Header from '@/components/landing/HeaderComponent.vue'
import Hero from '@/components/landing/HeroComponent.vue'
import Features from '@/components/landing/FeaturesComponent.vue'
import Stats from '@/components/landing/StatsComponent.vue'
import HowItWorks from '@/components/landing/HowComponent.vue'
import FAQ from '@/components/landing/FaqComponent.vue'
import CTA from '@/components/landing/CtaComponent.vue'
</script>

<template>
  <main className="min-h-screen bg-background">
    <Header />
    <Hero />
    <Features />
    <Stats />
    <HowItWorks />
    <FAQ />
    <CTA />
  </main>
</template>
