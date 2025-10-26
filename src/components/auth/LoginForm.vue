<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/composables/useAuth'

const { login, isAuthenticated } = useAuth()
const router = useRouter()
import { toast } from 'vue-sonner'

// ============================================
// VALIDATION RULES (Pure Functions)
// ============================================

const validateEmail = (email) => {
  const trimmed = email.trim()

  if (!trimmed) {
    return { isValid: false, message: 'Email is required' }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(trimmed)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address',
    }
  }

  return { isValid: true, message: '' }
}

const validatePassword = (password) => {
  const trimmed = password.trim()

  if (!trimmed) {
    return { isValid: false, message: 'Password cannot be empty' }
  }

  if (trimmed.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    }
  }

  return { isValid: true, message: '' }
}

// ============================================
// STATE
// ============================================

const formData = ref({
  email: '',
  password: '',
})

const errors = ref({})
const isLoading = ref(false)

// ============================================
// VALIDATION HANDLERS
// ============================================

const validateField = (field, value) => {
  const validator = field === 'email' ? validateEmail : validatePassword
  const result = validator(value)

  if (result.isValid) {
    const newErrors = { ...errors.value }
    delete newErrors[field]
    errors.value = newErrors
  } else {
    errors.value = { ...errors.value, [field]: result.message }
  }

  return result.isValid
}

const validateForm = () => {
  const emailResult = validateEmail(formData.value.email)
  const passwordResult = validatePassword(formData.value.password)

  const newErrors = {}
  if (!emailResult.isValid) newErrors.email = emailResult.message
  if (!passwordResult.isValid) newErrors.password = passwordResult.message

  errors.value = newErrors
  return emailResult.isValid && passwordResult.isValid
}

// ============================================
// EVENT HANDLERS
// ============================================

const handleChange = (e) => {
  const { name, value } = e.target
  formData.value[name] = value

  // Clear error when user starts typing
  if (errors.value[name]) {
    const newErrors = { ...errors.value }
    delete newErrors[name]
    errors.value = newErrors
  }
}

const handleBlur = (e) => {
  const { name, value } = e.target
  validateField(name, value)
}

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    toast({
      title: 'Error',
      description: 'Please fix the errors in the form',
      variant: 'destructive',
    })
    return
  }

  isLoading.value = true
  const result = login({
    email: formData.value.email,
    password: formData.value.password,
  })
  isLoading.value = false

  if (result.success) {
    formData.value = { email: '', password: '' }
    // Router navigation is handled in the composable
  } else {
    toast({
      title: 'Error',
      description: result.error || 'Login failed',
      variant: 'destructive',
    })
  }
}

// ============================================
// REDIRECT IF AUTHENTICATED
// ============================================

if (isAuthenticated.value) {
  router.push('/dashboard')
}
</script>

<template>
  <Card class="border border-border">
    <CardContent class="pt-6">
      <form @submit="handleSubmit" class="space-y-4">
        <!-- Email -->
        <div class="space-y-2">
          <Label for="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            :model-value="formData.email"
            @input="handleChange"
            @blur="handleBlur"
            :class="errors.email ? 'border-destructive' : ''"
            :disabled="isLoading"
            :aria-invalid="!!errors.email"
          />
          <p v-if="errors.email" class="text-sm text-destructive" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            :model-value="formData.password"
            @input="handleChange"
            @blur="handleBlur"
            :class="errors.password ? 'border-destructive' : ''"
            :disabled="isLoading"
            :aria-invalid="!!errors.password"
          />
          <p v-if="errors.password" class="text-sm text-destructive" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit Button -->
        <Button type="submit" class="w-full" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
