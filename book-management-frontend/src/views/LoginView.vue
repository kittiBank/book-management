<script setup lang="ts">
// Login page component
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { authService } from "@/services";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const router = useRouter();

// Form state
const credentials = reactive({
  username: "",
  password: "",
});

// UI state
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  // Reset error message
  errorMessage.value = "";

  // Validate input
  if (!credentials.username || !credentials.password) {
    errorMessage.value = "Please enter username and password";
    return;
  }

  isLoading.value = true;

  try {
    const response = await authService.login({
      username: credentials.username,
      password: credentials.password,
    });

    if (response.success) {
      // Redirect to books page on success
      router.push({ name: "Books" });
    } else {
      errorMessage.value = response.message || "Login failed";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full mx-4">
      <!-- Login Card -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-800">Book Management</h1>
          <p class="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        >
          {{ errorMessage }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              placeholder="Enter your username"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              :disabled="isLoading"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <LoadingSpinner v-if="isLoading" size="sm" class="mr-2" />
            {{ isLoading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <!-- Demo username -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600 text-center">
            <strong>Demo admin username:</strong><br />
            Username: <code class="bg-gray-200 px-1 rounded">admin</code><br />
            Password: <code class="bg-gray-200 px-1 rounded">1234</code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
