// src/composables/useAuth.js

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// ⚡ This state is SHARED across ALL components that use this composable
const user = ref(null)
const isLoading = ref(false)

export function useAuth() {
  const router = useRouter()

  // Check if user is logged in
  const isAuthenticated = computed(() => !!user.value)

  // Load saved session from localStorage
  function loadSession() {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        user.value = JSON.parse(session)
      } catch (e) {
        localStorage.removeItem('ticketapp_session')
      }
    }
  }

  // Login function
  function login(credentials) {
    isLoading.value = true

    // Simple validation (you can make this more complex)
    if (credentials.email && credentials.password) {
      const mockUser = {
        id: 1,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        token: 'mock-token-' + Date.now(),
      }

      user.value = mockUser
      localStorage.setItem('ticketapp_session', JSON.stringify(mockUser))

      isLoading.value = false
      router.push('/dashboard')
      return { success: true }
    }

    isLoading.value = false
    return { success: false, error: 'Invalid credentials' }
  }

  // Signup function
  function signup(data) {
    isLoading.value = true

    const newUser = {
      id: Date.now(),
      email: data.email,
      name: data.name || data.email.split('@')[0],
      token: 'mock-token-' + Date.now(),
    }

    user.value = newUser
    localStorage.setItem('ticketapp_session', JSON.stringify(newUser))

    isLoading.value = false
    router.push('/dashboard')
    return { success: true }
  }

  // Logout function
  function logout() {
    user.value = null
    localStorage.removeItem('ticketapp_session')
    router.push('/')
  }

  // Return everything you want components to use
  return {
    user,
    isLoading,
    isAuthenticated,
    loadSession,
    login,
    signup,
    logout,
  }
}
