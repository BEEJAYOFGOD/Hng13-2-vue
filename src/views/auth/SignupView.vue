
<!-- ============================================ -->
<!-- Signup.vue -->
<!-- ============================================ -->

<script setup>
import SignupForm from '@/components/auth/SignupForm.vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="mb-8 text-center">
        <router-link to="/" class="inline-flex items-center gap-2 mb-6">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">T</span>
          </div>
          <span class="font-bold text-xl text-gray-900">Ticko</span>
        </router-link>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p class="text-gray-600">
          Join thousands of teams managing tickets efficiently
        </p>
      </div>

      <!-- Form -->
      <SignupForm />

      <!-- Footer -->
      <p class="text-center text-gray-600 text-sm mt-6">
        Already have an account?
        <RouterLink
          to="/auth/login"
          class="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
