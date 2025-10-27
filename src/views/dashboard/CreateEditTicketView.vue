<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTickets } from '@/composables/useTickets'
// import { toast } from 'vue-sonner'
import { AlertCircle } from 'lucide-vue-next'

import { useToast } from '@/composables/useToast'

const toast = useToast()

// Show toasts


const route = useRoute()
const router = useRouter()
const { tickets, addTicket, updateTicket } = useTickets()

const id = computed(() => route.params.id)
const isEditMode = computed(() => !!id.value)

// Form data
const formData = reactive({
  title: '',
  description: '',
  status: '',
  priority: '',
})

// Form state
const errors = ref({})
const isLoading = ref(false)

// ============================================
// LOAD TICKET DATA FOR EDITING
// ============================================
const loadTicket = (ticketId) => {
  const ticket = tickets.value.find((t) => t.id === ticketId)

  if (ticket) {
    formData.title = ticket.title
    formData.description = ticket.description || ''
    formData.status = ticket.status
    formData.priority = ticket.priority || ''
  } else {
    toast.error('Ticket not found')
    router.push('/tickets')
  }
}

// Load ticket when in edit mode
onMounted(() => {
  if (isEditMode.value && id.value) {
    loadTicket(id.value)
  }
})

// Watch for route changes (in case user navigates to edit another ticket)
watch(id, (newId) => {
  if (newId && isEditMode.value) {
    loadTicket(newId)
  }
})

// ============================================
// VALIDATION FUNCTIONS
// ============================================
const validateTitle = (title) => {
  if (!title.trim()) {
    errors.value.title = 'Title cannot be empty'
    return false
  }
  if (title.trim().length < 3) {
    errors.value.title = 'Title must be at least 3 characters long'
    return false
  }

  delete errors.value.title
  return true
}

const validateDesc = (desc) => {
  // Description is optional
  if (desc && desc.trim().length < 10) {
    errors.value.description = 'Description must be at least 10 characters long'
    return false
  }

  delete errors.value.description
  return true
}

const validateStatus = (status) => {
  const validStatuses = ['open', 'in_progress', 'closed']

  if (!status.trim()) {
    errors.value.status = 'Status is required'
    return false
  }

  if (!validStatuses.includes(status)) {
    errors.value.status = 'Status must be open, in_progress, or closed'
    return false
  }

  delete errors.value.status
  return true
}

const validateForm = () => {
  const isTitleValid = validateTitle(formData.title)
  const isDescValid = validateDesc(formData.description)
  const isStatusValid = validateStatus(formData.status)

  return isTitleValid && isDescValid && isStatusValid
}

// ============================================
// EVENT HANDLERS
// ============================================
const handleChange = (e) => {
  const { name, value } = e.target
  formData[name] = value

  // Clear error when user starts typing
  if (errors.value[name]) {
    delete errors.value[name]
  }
}

const handleBlur = (e) => {
  const { name, value } = e.target

  switch (name) {
    case 'title':
      validateTitle(value)
      break
    case 'description':
      validateDesc(value)
      break
    case 'status':
      validateStatus(value)
      break
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()



  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isLoading.value = true

  try {
    if (isEditMode.value && id.value) {
      // UPDATE existing ticket
      updateTicket(id.value, {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
      })
      toast.success('Ticket updated successfully!')
    } else {
      // CREATE new ticket
      const newTicket = {
        id: 'ticket-' + Date.now(),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        createdAt: new Date().toISOString(),
      }
      addTicket(newTicket)
      toast.success('Ticket created successfully!')
    }

    // Reset form if creating new
    if (!isEditMode.value) {
      formData.title = ''
      formData.description = ''
      formData.status = ''
      formData.priority = ''
    }

    // Navigate back to tickets page
    setTimeout(() => {
      router.push('/tickets')
    }, 1000)
  } catch (error) {
    console.log(error)
    toast.error(`Failed to ${isEditMode.value ? 'update' : 'create'} ticket`)
  } finally {
    isLoading.value = false
  }
}

const handleCancel = () => {
  router.push('/tickets')
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-8 pt-16">
    <div class="max-w-2xl mx-auto px-4">
      <div class="bg-white p-8 shadow-md rounded-lg">
        <h1 class="text-2xl font-bold mb-6">
          {{ isEditMode ? 'Edit Ticket' : 'Create New Ticket' }}
        </h1>

        <form class="space-y-6" @submit="handleSubmit">
          <!-- Title -->
          <div class="space-y-2">
            <label for="title" class="block font-medium">
              Title <span class="text-red-600">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              v-model="formData.title"
              @input="handleChange"
              @blur="handleBlur"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ticket title"
              :disabled="isLoading"
              :aria-invalid="!!errors.title"
            />
            <p
              v-if="errors.title"
              class="text-sm text-red-600 flex items-center gap-1"
              role="alert"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.title }}
            </p>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label for="description" class="block font-medium"> Description </label>
            <textarea
              id="description"
              name="description"
              v-model="formData.description"
              @input="handleChange"
              @blur="handleBlur"
              rows="4"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ticket description (optional)"
              :disabled="isLoading"
              :aria-invalid="!!errors.description"
            />
            <p
              v-if="errors.description"
              class="text-sm text-red-600 flex items-center gap-1"
              role="alert"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.description }}
            </p>
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <label for="status" class="block font-medium">
              Status <span class="text-red-600">*</span>
            </label>
            <select
              id="status"
              name="status"
              v-model="formData.status"
              @change="handleChange"
              @blur="handleBlur"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="isLoading"
              :aria-invalid="!!errors.status"
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p
              v-if="errors.status"
              class="text-sm text-red-600 flex items-center gap-1"
              role="alert"
            >
              <AlertCircle class="h-4 w-4" />
              {{ errors.status }}
            </p>
          </div>

          <!-- Priority (Optional) -->
          <div class="space-y-2">
            <label for="priority" class="block font-medium"> Priority (Optional) </label>
            <select
              id="priority"
              name="priority"
              v-model="formData.priority"
              @change="handleChange"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="isLoading"
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3 justify-end pt-4">
            <button
              type="button"
              @click="handleCancel"
              class="px-4 py-2 border cursor-pointer border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              :disabled="isLoading"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="isLoading"
            >
              {{
                isLoading
                  ? isEditMode
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditMode
                    ? 'Update Ticket'
                    : 'Create Ticket'
              }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
