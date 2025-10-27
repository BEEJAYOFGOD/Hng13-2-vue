<!-- SignupForm.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useToast } from '@/composables/useToast'

const { signup } = useAuth()
const router = useRouter()
const toast = useToast()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = ref({})
const isLoading = ref(false)

// ============================================
// VALIDATION FUNCTIONS
// ============================================

const validateName = (name) => {
  if (!name.trim()) {
    errors.value.name = 'Name cannot be empty'
    return false
  }
  if (name.trim().length < 3) {
    errors.value.name = 'Name must be at least 3 characters long'
    return false
  }

  delete errors.value.name
  return true
}

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    errors.value.email = 'Email is required'
    return false
  }
  if (!emailPattern.test(email)) {
    errors.value.email = 'Please enter a valid email address'
    return false
  }

  delete errors.value.email
  return true
}

const validatePassword = (password) => {
  if (!password.trim()) {
    errors.value.password = 'Password cannot be empty'
    return false
  }
  if (password.trim().length < 8) {
    errors.value.password = 'Password must be at least 8 characters long'
    return false
  }

  delete errors.value.password
  return true
}

const validateConfirmPassword = (password) => {
  if (!password.trim()) {
    errors.value.confirmPassword = 'Please confirm your password'
    return false
  }
  if (password.trim().length < 8) {
    errors.value.confirmPassword = 'Password must be at least 8 characters long'
    return false
  }
  if (password !== formData.value.password) {
    errors.value.confirmPassword = 'Passwords do not match'
    return false
  }

  delete errors.value.confirmPassword
  return true
}

const validateForm = () => {
  const isNameValid = validateName(formData.value.name)
  const isEmailValid = validateEmail(formData.value.email)
  const isPasswordValid = validatePassword(formData.value.password)
  const isConfirmPasswordValid = validateConfirmPassword(formData.value.confirmPassword)

  return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid
}

// ============================================
// EVENT HANDLERS
// ============================================

const handleChange = (field, value) => {
  formData.value[field] = value

  // Clear error when user starts typing
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const handleBlur = (field, value) => {
  switch (field) {
    case 'name':
      validateName(value)
      break
    case 'email':
      validateEmail(value)
      break
    case 'password':
      validatePassword(value)
      break
    case 'confirmPassword':
      validateConfirmPassword(value)
      break
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  isLoading.value = true
  const success = await signup(formData.value.name, formData.value.email, formData.value.password)
  isLoading.value = false

  if (success) {
    formData.value = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
    router.push({ name: 'dashboard', replace: true })
  }
}
</script>

<template>
  <div class="border border-gray-200 rounded-lg shadow-sm bg-white">
    <div class="pt-6 px-6 pb-6">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name -->
        <div class="space-y-2">
          <label for="name" class="text-sm font-medium text-gray-900"> Full Name </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            :value="formData.name"
            @input="(e) => handleChange('name', e.target.value)"
            @blur="(e) => handleBlur('name', e.target.value)"
            :class="[
              'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              errors.name ? 'border-red-500' : 'border-gray-300',
            ]"
            :disabled="isLoading"
            :aria-invalid="!!errors.name"
          />
          <p v-if="errors.name" class="text-sm text-red-500" role="alert">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-gray-900"> Email Address </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            :value="formData.email"
            @input="(e) => handleChange('email', e.target.value)"
            @blur="(e) => handleBlur('email', e.target.value)"
            :class="[
              'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              errors.email ? 'border-red-500' : 'border-gray-300',
            ]"
            :disabled="isLoading"
            :aria-invalid="!!errors.email"
          />
          <p v-if="errors.email" class="text-sm text-red-500" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-gray-900"> Password </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            :value="formData.password"
            @input="(e) => handleChange('password', e.target.value)"
            @blur="(e) => handleBlur('password', e.target.value)"
            :class="[
              'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              errors.password ? 'border-red-500' : 'border-gray-300',
            ]"
            :disabled="isLoading"
            :aria-invalid="!!errors.password"
          />
          <p v-if="errors.password" class="text-sm text-red-500" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label for="confirmPassword" class="text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            :value="formData.confirmPassword"
            @input="(e) => handleChange('confirmPassword', e.target.value)"
            @blur="(e) => handleBlur('confirmPassword', e.target.value)"
            :class="[
              'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300',
            ]"
            :disabled="isLoading"
            :aria-invalid="!!errors.confirmPassword"
          />
          <p v-if="errors.confirmPassword" class="text-sm text-red-500" role="alert">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>
    </div>
  </div>
</template>
