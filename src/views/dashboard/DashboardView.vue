<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useTickets } from '@/composables/useTickets'
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Ticket,
  CheckCircle,
  Clock,
  XCircle,
  PlusIcon,
  TicketIcon,
  Clock3Icon,
  Pencil,
  Trash2,
} from 'lucide-vue-next'


const router = useRouter()
const { user } = useAuth()
const { tickets, deleteTicket } = useTickets()

const showDeleteDialog = ref(false)
const ticketToDelete = ref(null)

// Computed stats based on tickets
const stats = computed(() => {
  const counts = {
    total: tickets.value.length,
    open: tickets.value.filter((t) => t.status === 'open').length,
    inProgress: tickets.value.filter((t) => t.status === 'in_progress').length,
    closed: tickets.value.filter((t) => t.status === 'closed').length,
  }

  return [
    {
      title: 'Total Tickets',
      value: counts.total,
      icon: Ticket,
      iconColor: 'text-blue-600',
      description: 'All tickets in system',
    },
    {
      title: 'Open Tickets',
      value: counts.open,
      icon: CheckCircle,
      iconColor: 'text-green-600',
      description: 'Awaiting action',
    },
    {
      title: 'In Progress',
      value: counts.inProgress,
      icon: Clock,
      iconColor: 'text-amber-600',
      description: 'Currently being worked on',
    },
    {
      title: 'Resolved',
      value: counts.closed,
      icon: XCircle,
      iconColor: 'text-gray-600',
      description: 'Successfully completed',
    },
  ]
})

const quickActions = [
  {
    icon: PlusIcon,
    text: 'Create New Ticket',
    desc: 'Start a new ticket to create a new issue',
    href: '/tickets/create',
    color: 'text-black',
  },
  {
    icon: TicketIcon,
    text: 'View All Tickets',
    desc: 'Browse and manage all tickets',
    href: '/tickets',
    color: 'text-green-600',
  },
  {
    icon: Clock3Icon,
    text: 'View Active Tickets',
    desc: 'See all tickets currently in progress',
    href: '/tickets/active',
    color: 'text-amber-600',
  },
]

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

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

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

const cancelDelete = () => {
  showDeleteDialog.value = false
  ticketToDelete.value = null
}
</script>

<template>
  <section class="md:p-12 pt-12 px-6 max-w-[1440px] mx-auto">
    <h2 class="md:text-2xl font-bold">Welcome {{ user?.email }}</h2>

    <!-- Stats Grid -->
    <div class="mt-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStats v-for="(stat, index) in stats" :key="index" v-bind="stat" />
      </div>
    </div>

    <!-- Quick Actions -->
    <Card class="mt-8">
      <CardTitle class="px-4 text-xl">Quick Actions</CardTitle>
      <CardContent class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouterLink v-for="(action, index) in quickActions" :key="index" :to="action.href">
          <div
            class="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
          >
            <div class="text-2xl mb-2">
              <component :is="action.icon" :class="`w-12 h-12 ${action.color}`" />
            </div>
            <h3 class="font-semibold text-foreground text-sm mb-1">
              {{ action.text }}
            </h3>
            <p class="text-xs text-muted-foreground">
              {{ action.desc }}
            </p>
          </div>
        </RouterLink>
      </CardContent>
    </Card>

    <!-- Recent Tickets -->
    <section class="mt-8">
      <Card class="my-8">
        <CardHeader>
          <div class="flex justify-between items-center">
            <CardTitle class="text-xl">Recent Tickets</CardTitle>
            <Button variant="outline" class="bg-primary hover:bg-hover text-white" @click="router.push('/tickets')">
              View All →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="tickets.length > 0" class="space-y-3">
            <div
              v-for="ticket in tickets.slice(0, 5)"
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
                    :class="`${getStatusColor(ticket.status)} px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap`"
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
          </div>

          <p v-else class="text-center text-muted-foreground py-8">
            No tickets yet. Create your first ticket!
          </p>
        </CardContent>
      </Card>
    </section>

    <!-- Delete Confirmation Dialog -->
    <Transition name="fade">
      <div
        v-if="showDeleteDialog"
        class="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50"
        @click="cancelDelete"
      >
        <div
          class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-[scale-in_0.2s_ease-out]"
          @click.stop
        >
          <h2 class="text-xl font-bold text-gray-900 mb-2">Delete Ticket?</h2>
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete "{{ ticketToDelete?.title }}"? This action cannot be
            undone.
          </p>
          <div class="flex gap-3 justify-end">
            <button
              @click="cancelDelete"
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
    </Transition>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
