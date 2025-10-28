<script setup>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

// 🔧 Get the tools from the toolbox
const { isAuthenticated,  loadSession, logout } = useAuth()

// Load session when component mounts
onMounted(() => {
  loadSession()
})
</script>

<template>
  <header class="fixed w-full top-0 z-50 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">T</span>
          </div>
          <span class="font-bold text-xl text-gray-900">Ticko</span>
        </RouterLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="#how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#faq" class="text-gray-700 hover:text-blue-600 transition-colors"> FAQ </a>

        </nav>

        <!-- Auth Buttons - Shows different buttons based on login status -->
        <div class="flex items-center gap-3">
          <!-- Show these if NOT logged in -->
          <template v-if="!isAuthenticated">
            <RouterLink
              to="/auth/login"
              class="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Log in
            </RouterLink>
            <RouterLink
              to="/auth/signup"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-hover transition-colors"
            >
              Sign up
            </RouterLink>
          </template>

          <!-- Show these if logged in -->
          <template v-else>

            <RouterLink
              to="/dashboard"
              class="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </RouterLink>
            <button
              @click="logout"
              class="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-400  cursor-pointer transition-colors"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
