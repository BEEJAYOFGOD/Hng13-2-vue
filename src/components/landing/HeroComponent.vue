<script setup>
// Layout logic if needed
import wave from '@/assets/wave.svg'
import waveMobile from '@/assets/wave-mobile.svg'
</script>

<template>
  <section className="md:pt-32 min-h-screen flex flex-col md:block justify-center border-red-400  relative">
    <div className="bg-primary h-6 w-6 animate-bounce absolute right-12 top-24 rounded-full  -z-9" />
    <div className="bg-primary h-6 w-6 animate-bounce absolute left-12 bottom-48 rounded-full -z-9" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 z-4">
      <div className="flex justify-center gap-3 items-center">
        <span className="h-4 w-4 bg-primary rounded-full  animate-ping" />
        <span className="px-3 py-1 bg-primary/10 text-primary   rounded-full text-sm font-medium">
          Streamline Your Workflow
        </span>
      </div>

      <h1
        className="md:text-4xl text-2xl  text-center lg:text-6xl font-bold text-foreground leading-tight"
      >
        Manage Tickets with
        <span className="text-primary">Ease</span>
      </h1>

      <p className="text-lg text-muted-foreground max-w-lg text-center mx-auto">
        Ticko is the modern ticket management system designed for teams that want to work smarter,
        not harder. Track, prioritize, and resolve issues in real-time.
      </p>

      <div className="flex flex-col md:flex-row gap-4 pt-4 p-4  md:p-0 justify-center">
        <RouterLink
          className="h-full text-center hover:bg-primary/60 text-white bg-primary px-24 py-4 rounded-md"
          to="/auth/signup"
        >
          Get Started Free
        </RouterLink>

        <!-- Outline Button -->
        <RouterLink
          className="h-full text-black text-center hover:bg-black/5 border-2  px-24 py-4 rounded-md"
          to="/auth/signup"
        >
          Learn More
        </RouterLink>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        No credit card required Start managing tickets in minutes.
      </p>
    </div>
    <div className="absolute bottom-0 w-full ">
      <img class="w-[200%] hidden md:block" :src="wave" alt="Wave decoration" />
      <img class="w-[200%] block md:hidden" :src="waveMobile" alt="Wave decoration" />
    </div>
  </section>
</template>
