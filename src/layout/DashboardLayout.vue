<script setup>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useTickets } from '@/composables/useTickets'
import FooterComponent from '@/components/landing/FooterComponent.vue';

const { logout, user, loadSession } = useAuth();

console.log(user.value)
const { loadTickets } = useTickets();

// Load session when component mounts
onMounted(() => {
  loadSession(),
  loadTickets()
})
</script>

<template>
  <header class="max-w-full w-full fixed top-0 border-b bg-white z-50">
    <div class="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-4">
      <h1 class="text-3xl font-bold">
        <RouterLink class="text-primary hover:text-primary hover:underline" to="/dashboard">Dashboard</RouterLink>
      </h1>

      <div class="flex gap-4 items-center">
        <button
          class="cursor-pointer bg-destructive/80 hover:bg-destructive/50 text-white px-4 py-2 rounded-md transition-colors"
          @click="logout"
        >
          Log Out
        </button>
        <div v-if="user" class="h-8 w-8 bg-primary flex justify-center items-center rounded-full">
          <p class="text-white font-semibold">
            {{ user.name.charAt(0).toUpperCase() }}
          </p>
        </div>
      </div>
    </div>
  </header>

  <div className="pt-12 bg-gray-200/30">
  <RouterView />
  </div>
<FooterComponent />
</template>
