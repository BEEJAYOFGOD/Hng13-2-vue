<script setup>
// import { Toaster } from 'vue-sonner';
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>

    <RouterView />

  <!-- Toaster outside the relative container -->
   <ToastContainer />
</template>

