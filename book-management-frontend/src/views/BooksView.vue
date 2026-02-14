<script setup lang="ts">
// Books-view pageß
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import type { Book } from "@/types";
import { bookService, SweetAlertService } from "@/services";
import BookCard from "@/components/BookCard.vue";
import BookTable from "@/components/BookTable.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const router = useRouter();

// Data state
const books = ref<Book[]>([]);
const isLoading = ref(true);
const errorMessage = ref("");

// Search and filter state
const searchQuery = ref("");
const viewMode = ref<"grid" | "table">("grid");

// Delete confirmation modal state
const showDeleteModal = ref(false);
const bookToDelete = ref<Book | null>(null);

// Filtered books with query search
const filteredBooks = computed(() => {
  if (!searchQuery.value.trim()) {
    return books.value;
  }

  const query = searchQuery.value.toLowerCase();
  return books.value.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      (book.genre && book.genre.toLowerCase().includes(query)),
  );
});

// Fetch all books from API
const fetchBooks = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await bookService.getAllBooks();
    if (response.success && response.data) {
      books.value = response.data;
    } else {
      errorMessage.value = response.error || "Failed to load books";
    }
  } catch (error) {
    errorMessage.value = "An error occurred while loading books";
    console.error("Fetch books error:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleView = (id: number) => {
  router.push({ name: "BookDetail", params: { id } });
};

const handleEdit = (id: number) => {
  router.push({ name: "EditBook", params: { id } });
};

const handleDelete = (id: number) => {
  const book = books.value.find((b) => b.id === id);
  if (book) {
    bookToDelete.value = book;
    showDeleteModal.value = true;
  }
};

const confirmDelete = async () => {
  if (!bookToDelete.value) return;

  try {
    const response = await bookService.deleteBook(bookToDelete.value.id);
    if (response.success) {
      // Remove book from local list
      books.value = books.value.filter((b) => b.id !== bookToDelete.value!.id);

      await SweetAlertService.success({
        title: "Deleted!",
        text: "Book deleted successfully!",
        timer: 2000,
      });
    } else {
      errorMessage.value = response.error || "Failed to delete book";
    }
  } catch (error) {
    errorMessage.value = "An error occurred while deleting the book";
    console.error("Delete book error:", error);
  } finally {
    showDeleteModal.value = false;
    bookToDelete.value = null;
  }
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  bookToDelete.value = null;
};

// Fetch books on component mount
onMounted(() => {
  fetchBooks();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Books</h1>
        <p class="text-gray-600 mt-1">Manage your book collection</p>
      </div>

      <router-link
        to="/books/create"
        class="mt-4 md:mt-0 inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Book
      </router-link>
    </div>

    <!-- Search and Filter Bar -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by title, author, or genre..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <!-- View Mode Toggle -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">View:</span>
          <button
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded transition-colors',
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            @click="viewMode = 'table'"
            :class="[
              'p-2 rounded transition-colors',
              viewMode === 'table'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300',
            ]"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
    >
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" text="Loading books..." />
    </div>

    <!-- Books Grid View -->
    <div
      v-else-if="viewMode === 'grid'"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        @view="handleView"
        @edit="handleEdit"
        @delete="handleDelete"
      />

      <!-- Empty State -->
      <div
        v-if="filteredBooks.length === 0"
        class="col-span-full text-center py-12 text-gray-500"
      >
        <svg
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <p v-if="searchQuery">No books matching "{{ searchQuery }}"</p>
        <p v-else>No books found. Add your first book!</p>
      </div>
    </div>

    <!-- Books Table View -->
    <BookTable
      v-else
      :books="filteredBooks"
      @view="handleView"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="showDeleteModal"
      title="Delete Book"
      :message="`Are you sure you want to delete '${bookToDelete?.title}'? This action cannot be undone.`"
      confirm-text="Delete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
