
<script setup lang="ts">
import type { Book } from "@/types";
import { authService } from "@/services";

// Props definition
interface Props {
  book: Book;
}
defineProps<Props>();

// Emit events
const emit = defineEmits<{
  (e: "view", id: number): void;
  (e: "edit", id: number): void;
  (e: "delete", id: number): void;
}>();

// Get current user
const user = authService.getUser();
const isAdmin = user && user.role === 'admin';
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
  >
    <!-- Book Info -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
        {{ book.title }}
      </h3>
      <p class="text-sm text-gray-600 mb-2">
        by <span class="font-medium">{{ book.author }}</span>
      </p>

      <!-- Genre Badge -->
      <span
        v-if="book.genre"
        class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
      >
        {{ book.genre }}
      </span>
    </div>

    <!-- Published Year -->
    <div class="text-sm text-gray-500 mb-4">
      <span v-if="book.published_year">
        Published: {{ book.published_year }}
      </span>
      <span v-else> Published: Unknown </span>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-2">
      <button
        @click="emit('view', book.id)"
        class="flex-1 bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        View
      </button>
      <button
        v-if="isAdmin"
        @click="emit('edit', book.id)"
        class="flex-1 bg-amber-400 hover:bg-amber-500 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        Edit
      </button>
      <button
        v-if="isAdmin"
        @click="emit('delete', book.id)"
        class="flex-1 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>
