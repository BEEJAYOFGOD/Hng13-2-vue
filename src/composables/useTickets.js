// src/composables/useTickets.js
import { ref, computed } from 'vue'
import { useToast } from './useToast'

// Shared state across all components
const tickets = ref([])
const currentUserId = ref(null)
const toast = useToast()

export function useTickets() {
  // Get current user from session
  const getCurrentUser = () => {
    const session = localStorage.getItem('ticketapp_session')
    if (session) {
      try {
        return JSON.parse(session)
      } catch (e) {
        console.error('Error loading session:', e)
        return null
      }
    }
    return null
  }

  // Get user data from users array
  const getUserData = (userId) => {
    const users = localStorage.getItem('ticketapp_users')
    if (users) {
      try {
        const usersArray = JSON.parse(users)
        return usersArray.find((u) => u.id === userId)
      } catch (e) {
        console.error('Error loading users:', e)
        return null
      }
    }
    return null
  }

  // Update user data in users array
  const updateUserData = (userId, updatedUserData) => {
    const usersJson = localStorage.getItem('ticketapp_users')
    if (!usersJson) {
      console.error('No users array found')
      return false
    }

    try {
      const usersArray = JSON.parse(usersJson)
      const index = usersArray.findIndex((u) => u.id === userId)

      if (index !== -1) {
        // Merge updated data with existing user data
        usersArray[index] = {
          ...usersArray[index],
          ...updatedUserData,
        }
        localStorage.setItem('ticketapp_users', JSON.stringify(usersArray))
        return true
      } else {
        console.error('User not found in users array')
        return false
      }
    } catch (e) {
      console.error('Error updating user:', e)
      return false
    }
  }

  // Load tickets from localStorage for current user
  const loadTickets = () => {
    const session = getCurrentUser()
    if (!session || !session.id) {
      console.warn('No active session, cannot load tickets')
      tickets.value = []
      currentUserId.value = null
      return
    }

    currentUserId.value = session.id
    const userData = getUserData(session.id)

    if (userData && userData.tickets && Array.isArray(userData.tickets)) {
      // Load tickets into reactive state
      tickets.value = [...userData.tickets]
    } else {
      // Initialize empty tickets array for this user
      tickets.value = []
      updateUserData(session.id, { tickets: [] })
    }
  }

  // Save current tickets state to localStorage for current user
  const saveTickets = () => {
    const session = getCurrentUser()
    if (!session || !session.id) {
      console.error('No active session, cannot save tickets')
      return false
    }

    // Deep copy to avoid reference issues
    const ticketsCopy = JSON.parse(JSON.stringify(tickets.value))
    const success = updateUserData(session.id, { tickets: ticketsCopy })

    if (!success) {
      console.error('Failed to save tickets')
    }

    return success
  }

  // Add new ticket
  const addTicket = (ticket) => {
    const session = getCurrentUser()
    if (!session || !session.id) {
      console.error('No active session, cannot add ticket')
      return null
    }

    const newTicket = {
      ...ticket,
      id: ticket.id || Date.now().toString(),
      createdAt: ticket.createdAt || new Date().toISOString(),
    }

    tickets.value.push(newTicket)
    saveTickets()

    return newTicket
  }

  // Update existing ticket
  const updateTicket = (id, updatedData) => {
    const index = tickets.value.findIndex((t) => t.id === id)

    if (index !== -1) {
      tickets.value[index] = {
        ...tickets.value[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      }
      saveTickets()
      return tickets.value[index]
    }

    console.warn(`Ticket with id ${id} not found`)
    return null
  }

  // Delete ticket
  const deleteTicket = (id) => {
    console.log('amennnnn')
    const initialLength = tickets.value.length
    tickets.value = tickets.value.filter((t) => t.id !== id)

    if (tickets.value.length < initialLength) {
      saveTickets()
      toast.success('Ticket deleted successfully')
      return true
    }

    console.warn(`Ticket with id ${id} not found`)
    return false
  }

  // Get ticket by ID
  const getTicketById = (id) => {
    const ticket = tickets.value.find((t) => t.id === id)
    return ticket ? { ...ticket } : null
  }

  // Get ticket statistics
  const getTicketStats = computed(() => {
    return {
      total: tickets.value.length,
      open: tickets.value.filter((t) => t.status === 'open').length,
      inProgress: tickets.value.filter((t) => t.status === 'in_progress').length,
      closed: tickets.value.filter((t) => t.status === 'closed').length,
    }
  })

  // Auto-load tickets on initialization
  const session = getCurrentUser()
  if (session && session.id) {
    // Only load if we haven't loaded for this user yet
    if (currentUserId.value !== session.id) {
      loadTickets()
    }
  }

  return {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getTicketStats,
    loadTickets,
  }
}
