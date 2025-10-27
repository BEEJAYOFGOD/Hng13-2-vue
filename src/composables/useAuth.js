// src/composables/useAuth.js

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// ⚡ This state is SHARED across ALL components that use this composable
const user = ref(null)
const session = ref(null)
const isLoading = ref(false)

export function useAuth() {
  const router = useRouter()

  // Check if user is logged in (check if session exists)
  const isAuthenticated = computed(() => !!session.value?.token)

  // Load saved session from localStorage
  function loadSession() {
    const savedSession = localStorage.getItem('ticketapp_session')
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession)
        session.value = parsedSession
        user.value = parsedSession.user // Extract user from session
      } catch (e) {
        localStorage.removeItem('ticketapp_session')
        session.value = null
        user.value = null
      }
    }
  }

  // Login function
  function login(credentials) {
    isLoading.value = true

    // Simple validation
    if (credentials.email && credentials.password) {
      const userData = {
        id: Date.now(),
        name: credentials.name || credentials.email.split('@')[0],
        email: credentials.email,
      }

      const sessionData = {
        token: 'mock-token-' + Date.now(),
        user: userData,
      }

      user.value = sessionData.user
      session.value = sessionData
      localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))

      isLoading.value = false
      router.push('/dashboard')
      return { success: true, session: sessionData }
    }

    isLoading.value = false
    return { success: false, error: 'Invalid credentials' }
  }

  // Signup function
  function signup(data) {
    isLoading.value = true

    const userData = {
      id: Date.now(),
      name: data.name || data.email.split('@')[0],
      email: data.email,
    }

    const sessionData = {
      token: 'mock-token-' + Date.now(),
      user: userData,
    }

    user.value = sessionData.user
    session.value = sessionData
    localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))

    isLoading.value = false
    router.push('/dashboard')
    return { success: true, session: sessionData }
  }

  // Logout function
  function logout() {
    user.value = null
    session.value = null
    localStorage.removeItem('ticketapp_session')
    router.push('/')
  }

  // Return everything you want components to use
  return {
    user,        // Direct access to user object
    session,     // Direct access to full session (token + user)
    isLoading,
    isAuthenticated,
    loadSession,
    login,
    signup,
    logout,
  }
}
