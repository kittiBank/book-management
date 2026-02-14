<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";

const route = useRoute();

// Hide navbar on login page
const showNavBar = computed(() => route.name !== "Login");
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <!-- Navigation Bar -->
    <NavBar v-if="showNavBar" />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* App-level scoped styles */
</style>
