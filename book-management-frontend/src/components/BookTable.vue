<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Book } from "@/types";
import Pagination from "@/components/Pagination.vue";

// Props definition
interface Props {
  books: Book[];
}
const props = defineProps<Props>();

// Emit events
const emit = defineEmits<{
  (e: "view", id: number): void;
  (e: "edit", id: number): void;
  (e: "delete", id: number): void;
}>();

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 10;

// Paginated books
const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.books.slice(start, end);
});

// Reset to page 1 when books data changes
watch(
  () => props.books.length,
  () => {
    currentPage.value = 1;
  },
);

/**
 * Format date string to readable format
 */
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <!-- Table Header -->
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          ></th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Title
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Author
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Published Year
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Genre
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Updated
          </th>
          <th
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="book in paginatedBooks"
          :key="book.id"
          class="hover:bg-gray-50 transition-colors"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ book.id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">
              {{ book.title }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ book.author }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ book.published_year || "-" }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              v-if="book.genre"
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
            >
              {{ book.genre }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(book.updated_at) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
            <button
              @click="emit('view', book.id)"
              class="text-blue-600 hover:text-blue-900 mx-1"
              title="View"
            >
              <svg
                class="w-5 h-5 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
            <button
              @click="emit('edit', book.id)"
              class="text-yellow-600 hover:text-yellow-900 mx-1"
              title="Edit"
            >
              <svg
                class="w-5 h-5 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              @click="emit('delete', book.id)"
              class="text-red-600 hover:text-red-900 mx-1"
              title="Delete"
            >
              <svg
                class="w-5 h-5 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>

        <!-- Empty State -->
        <tr v-if="props.books.length === 0">
          <td colspan="7" class="px-6 py-12 text-center text-gray-500">
            No books found. Add your first book!
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination
      v-model:currentPage="currentPage"
      :total-items="props.books.length"
      :items-per-page="itemsPerPage"
    />
  </div>
</template>
