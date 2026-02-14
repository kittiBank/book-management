<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services";

const router = useRouter();

// Get current user from auth service
const user = computed(() => authService.getUser());
const isAuthenticated = computed(() => authService.isAuthenticated());

// Handle logout action
const handleLogout = () => {
  authService.logout();
  router.push({ name: "Login" });
};
</script>

<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-xl font-bold">Book Management</span>
        </router-link>

        <!-- User Info and Logout -->
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <span class="text-sm">
            Welcome, <strong>{{ user?.username }}</strong>
          </span>
          <button
            @click="handleLogout"
            class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
