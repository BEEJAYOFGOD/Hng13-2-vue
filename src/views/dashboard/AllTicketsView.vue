<script setup>
import { ref, computed } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { useTickets } from '@/composables/useTickets'
import { toast } from 'vue-sonner'

const router = useRouter()
const route = useRoute()

const { tickets, deleteTicket } = useTickets()

const showDeleteDialog = ref(false)
const ticketToDelete = ref(null)

// Check if we're on the active tickets route
const isActiveTicketsRoute = computed(() => route.path === '/tickets/active')

// Filter tickets based on route
const displayedTickets = computed(() => {
  if (isActiveTicketsRoute.value) {
    return tickets.value.filter(
      (ticket) => ticket.status === 'open' || ticket.status === 'in_progress'
    )
  }
  return tickets.value
})

const handleDeleteClick = (ticket) => {
  ticketToDelete.value = ticket
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  if (ticketToDelete.value) {
    deleteTicket(ticketToDelete.value.id)
    showDeleteDialog.value = false
    ticketToDelete.value = null
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800'
    case 'in_progress':
      return 'bg-amber-100 text-amber-800 border-amber-300'
    case 'closed':
      return 'bg-gray-100 text-gray-800 border-gray-300'
    default:
      return ''
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'open':
      return 'Open'
    case 'in_progress':
      return 'In Progress'
    case 'closed':
      return 'Closed'
    default:
      return status
  }
}
</script>

<template>
  <main class="p-8 md:px-12 md:pt-12 px-6 pt-12  max-w-[1440px] mx-auto">
    <h1 class="text-3xl font-bold mb-4">
      {{ isActiveTicketsRoute ? 'Active Tickets' : 'All Tickets' }}
    </h1>

    <!-- Filter tabs -->
    <div class="flex gap-4 mb-6">
      <RouterLink
        to="/tickets"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          !isActiveTicketsRoute
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        All Tickets
      </RouterLink>
      <RouterLink
        to="/tickets/active"
        :class="[
          'px-4 py-2 rounded-lg transition-colors',
          isActiveTicketsRoute
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        Active Tickets
      </RouterLink>
    </div>

    <div class="space-y-3">
      <template v-if="displayedTickets.length > 0">
        <div
          v-for="ticket in displayedTickets"
          :key="ticket.id"
          class="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
        >
          <!-- Card Header -->
          <div class="p-5 border-b border-gray-100">
            <div class="flex justify-between items-start gap-3 mb-3">
              <h3 class="text-lg font-semibold text-gray-900 flex-1 leading-tight">
                {{ ticket.title }}
              </h3>

              <!-- Status Tag -->
              <span
                :class="[
                  getStatusColor(ticket.status),
                  'px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap'
                ]"
              >
                {{ getStatusLabel(ticket.status) }}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5 space-y-4">
            <p
              v-if="ticket.description"
              class="text-sm text-gray-600 leading-relaxed line-clamp-3"
            >
              {{ ticket.description }}
            </p>

            <!-- Card Footer -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-100">
              <span class="text-xs text-gray-500">
                {{ formatDate(ticket.createdAt) }}
              </span>

              <div class="flex gap-2">
                <button
                  @click="router.push(`/tickets/edit/${ticket.id}`)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil class="h-4 w-4" />
                </button>
                <button
                  @click="handleDeleteClick(ticket)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <p v-else class="text-center flex flex-col items-center gap-8 text-muted-foreground py-8">
        {{ isActiveTicketsRoute ? 'No active tickets.' : 'No tickets yet.' }}
        <RouterLink class="hover:underline bg-primary w-fit px-4 text-white p-2 rounded-md" to="/dashboard">
          Create your first ticket here
        </RouterLink>
      </p>
    </div>

    <!-- Delete Dialog -->
    <div
      v-if="showDeleteDialog"
      class="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]">
        <h2 class="text-xl font-bold text-gray-900 mb-2">
          Delete Ticket?
        </h2>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ ticketToDelete?.title }}"? This action cannot be undone.
        </p>
        <div class="flex gap-3 justify-end">
          <button
            @click="showDeleteDialog = false"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
