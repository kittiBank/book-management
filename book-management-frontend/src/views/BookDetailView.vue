<script setup lang="ts">
// Book-detail page
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Book } from "@/types";
import { bookService } from "@/services";
import ConfirmModal from "@/components/ConfirmModal.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const router = useRouter();

// Data state
const book = ref<Book | null>(null);
const isLoading = ref(true);
const errorMessage = ref("");

// Delete modal state
const showDeleteModal = ref(false);

// Fetch book details by ID
const fetchBook = async () => {
  const id = Number(route.params.id);

  if (isNaN(id)) {
    errorMessage.value = "Invalid book ID";
    isLoading.value = false;
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await bookService.getBookById(id);
    if (response.success && response.data) {
      book.value = response.data;
    } else {
      errorMessage.value = response.error || "Book not found";
    }
  } catch (error) {
    errorMessage.value = "An error occurred while loading the book";
    console.error("Fetch book error:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleEdit = () => {
  if (book.value) {
    router.push({ name: "EditBook", params: { id: book.value.id } });
  }
};

const confirmDelete = async () => {
  if (!book.value) return;

  try {
    const response = await bookService.deleteBook(book.value.id);
    if (response.success) {
      router.push({ name: "Books" });
    } else {
      errorMessage.value = response.error || "Failed to delete book";
    }
  } catch (error) {
    errorMessage.value = "An error occurred while deleting the book";
    console.error("Delete book error:", error);
  } finally {
    showDeleteModal.value = false;
  }
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  fetchBook();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
    >
      <svg
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Books
    </button>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" text="Loading book details..." />
    </div>

    <!-- Error Message -->
    <div
      v-else-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {{ errorMessage }}
      <router-link to="/" class="underline ml-2">Go back to books</router-link>
    </div>

    <!-- Book Details -->
    <div v-else-if="book" class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-start md:justify-between mb-8"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            {{ book.title }}
          </h1>
          <p class="text-xl text-gray-600">by {{ book.author }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3 mt-4 md:mt-0">
          <button
            @click="handleEdit"
            class="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5 mr-2"
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
            Edit
          </button>
          <button
            @click="showDeleteModal = true"
            class="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5 mr-2"
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
            Delete
          </button>
        </div>
      </div>

      <!-- Book Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Genre -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Genre</h3>
          <p class="text-lg text-gray-800">
            <span
              v-if="book.genre"
              class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {{ book.genre }}
            </span>
            <span v-else class="text-gray-400">Not specified</span>
          </p>
        </div>

        <!-- Published Year -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Published Year</h3>
          <p class="text-lg text-gray-800">
            {{ book.published_year || "Unknown" }}
          </p>
        </div>

        <!-- Created At -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Created At</h3>
          <p class="text-lg text-gray-800">
            {{ formatDate(book.created_at) }}
          </p>
        </div>

        <!-- Updated At -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
          <p class="text-lg text-gray-800">
            {{ formatDate(book.updated_at) }}
          </p>
        </div>

        <!-- Book ID -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 mb-1">Book ID</h3>
          <p class="text-lg text-gray-800">#{{ book.id }}</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteModal"
      title="Delete Book"
      :message="`Are you sure you want to delete '${book?.title}'? This action cannot be undone.`"
      confirm-text="Delete"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>
