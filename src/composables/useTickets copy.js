// src/composables/useTickets.js
import { ref } from 'vue'

// Shared state across all components
const tickets = ref([])

export function useTickets() {
  // Load tickets from localStorage
  const loadTickets = () => {
    const stored = localStorage.getItem('ticketapp_tickets')
    if (stored) {
      try {
        tickets.value = JSON.parse(stored)
      } catch (e) {
        console.error('Error loading tickets:', e)
        tickets.value = []
      }
    }
  }

  // Save tickets to localStorage
  const saveTickets = () => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets.value))
  }

  // Add new ticket
  const addTicket = (ticket) => {
    tickets.value.push(ticket)
    saveTickets()
  }

  // Update existing ticket
  const updateTicket = (id, updatedData) => {
    const index = tickets.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tickets.value[index] = {
        ...tickets.value[index],
        ...updatedData,
      }
      saveTickets()
    }
  }

  // Delete ticket
  const deleteTicket = (id) => {
    tickets.value = tickets.value.filter((t) => t.id !== id)
    saveTickets()
  }

  // Get ticket by ID
  const getTicketById = (id) => {
    return tickets.value.find((t) => t.id === id)
  }

  // Load tickets on initialization
  if (tickets.value.length === 0) {
    loadTickets()
  }

  return {
    tickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    loadTickets,
  }
}
