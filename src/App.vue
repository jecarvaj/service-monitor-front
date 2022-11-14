<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from '@vue/reactivity';

const auth = useAuthStore()
const isLoginPage = computed(() => useRoute().path == '/login')
</script>

<template>
  <Navbar v-if="auth.isAuthenticated && !isLoginPage" />
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
  html,
  body {
    height: 100%;
  }
  button{
    border-radius: 0 !important;
  }
  .container {
    padding-top: 100px;
  }
</style>
