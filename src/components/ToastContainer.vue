<script setup>
import { useToast } from '@/composables/useToast'

const { toasts, removeToast } = useToast()

const getTypeClasses = (type) => {
  const classes = {
    success: 'bg-white  border-green-500 text-green-500',
    error: 'bg-white border-red-500 text-red-500',
    warning: 'bg-white border-yellow-500 text-yellow-500',
    info: 'bg-white border-blue-500 text-blue-500',
  }
  return classes[type] || classes.info
}

const getIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }
  return icons[type] || icons.info
}
</script>

<template>
  <div class="fixed top-20 right-4 z-50 flex border-red flex-col gap-2">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'flex items-center gap-3 min-w-[300px] max-w-md px-4 py-3 border rounded-lg shadow-lg',
          getTypeClasses(toast.type),
        ]"
      >
        <span class="text-xl font-bold">{{ getIcon(toast.type) }}</span>
        <span class="flex-1 text-sm font-medium">{{ toast.message }}</span>
        <button
          @click="removeToast(toast.id)"
          class="text-white hover:opacity-80 transition-opacity"
        >
          ✕
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active {
  animation: slide-in 0.3s ease-out;
}

.toast-leave-active {
  animation: slide-out 0.3s ease-in;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
