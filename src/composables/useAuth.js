// src/composables/useAuth.js

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from './useToast'

// ⚡ This state is SHARED across ALL components that use this composable
const user = ref(null)
const session = ref(null)
const isLoading = ref(false)
const toast = useToast()

export function useAuth() {
  const router = useRouter()

  // Check if user is logged in (check if session exists)
  const isAuthenticated = computed(() => !!session.value?.token)

  // Get all users from localStorage
  const getUsers = () => {
    const stored = localStorage.getItem('ticketapp_users')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        return []
      }
    }
    return []
  }

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('ticketapp_users', JSON.stringify(users))
  }

  // Find user by email
  const findUserByEmail = (email) => {
    const users = getUsers()
    return users.find((u) => u.email === email)
  }

  // Add or update user in users array
  const saveUserData = (userData) => {
    const users = getUsers()
    const existingIndex = users.findIndex((u) => u.id === userData.id)

    if (existingIndex !== -1) {
      users[existingIndex] = { ...users[existingIndex], ...userData }
    } else {
      users.push(userData)
    }

    saveUsers(users)
  }

  // Load saved session from localStorage
  function loadSession() {
    const savedSession = localStorage.getItem('ticketapp_session')
    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession)
        session.value = parsedSession

        // Load full user data from users array
        const fullUserData = getUsers().find((u) => u.id === parsedSession.id)
        if (fullUserData) {
          user.value = fullUserData
        } else {
          // Fallback to session data
          user.value = {
            id: parsedSession.id,
            name: parsedSession.name,
            email: parsedSession.email,
            tickets: [],
          }
        }
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
      // Check if user exists
      const existingUser = findUserByEmail(credentials.email)

      let userData
      if (existingUser?.password !== credentials.password) {
        // User exists, use their data

        toast.error('invlid username or password')
        return
      } else {
        // user exists
        userData = existingUser

        const sessionData = {
          id: userData?.id,
          name: userData?.name,
          email: userData?.email,
          token: 'mock-token-' + Date.now(),
          password: userData?.password,
        }
        userData = {
          id: userData?.id,
          name: userData?.name,
          email: userData?.email,
          token: 'mock-token-' + Date.now(),
          password: userData?.password,
          tickets: [],
        }

        user.value = userData
        session.value = sessionData
        localStorage.setItem('ticketapp_session', JSON.stringify(sessionData))
        Date.now()

        saveUserData(userData)

        isLoading.value = false
        router.push('/dashboard')
        toast.success('log in success')
        return { success: true, session: sessionData }
      }
    }

    isLoading.value = false
    return { success: false, error: 'Invalid credentials' }
  }

  // Signup function
  function signup(data) {
    isLoading.value = true

    // Check if user already exists
    const existingUser = findUserByEmail(data.email)
    if (existingUser) {
      isLoading.value = false
      return { success: false, error: 'User already exists' }
    }

    const userData = {
      id: Date.now(),
      name: data.name || data.email.split('@')[0],
      email: data.email,
      password: data.password,
      tickets: [],
    }

    // Save to users array
    saveUserData(userData)

    const sessionData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      token: 'mock-token-' + Date.now(),
    }

    user.value = userData
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
    user, // Direct access to user object
    session, // Direct access to full session (token + user)
    isLoading,
    isAuthenticated,
    loadSession,
    login,
    signup,
    logout,
  }
}
