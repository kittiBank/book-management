<script setup lang="ts">
// Create book from page
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { BookFormData } from "@/types";
import { bookService, SweetAlertService } from "@/services";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const route = useRoute();
const router = useRouter();

// Determine if we're editing or creating
const isEditMode = computed(() => route.name === "EditBook");
const bookId = computed(() => Number(route.params.id));

// Form state
const formData = reactive<BookFormData>({
  title: "",
  author: "",
  published_year: null,
  genre: null,
});

// UI state
const isLoading = ref(false);
const isFetching = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

// Genre options for dropdown
const genreOptions = [
  "Programming",
  "Software Engineering",
  "Web Development",
  "Backend Development",
  "Database",
  "DevOps",
  "Security",
  "Machine Learning",
  "Fiction",
  "Non-Fiction",
  "Other",
];

// Fetch book data if in edit mode
const fetchBook = async () => {
  if (!isEditMode.value || isNaN(bookId.value)) return;

  isFetching.value = true;
  errorMessage.value = "";

  try {
    const response = await bookService.getBookById(bookId.value);
    if (response.success && response.data) {
      formData.title = response.data.title;
      formData.author = response.data.author;
      formData.published_year = response.data.published_year;
      formData.genre = response.data.genre;
    } else {
      errorMessage.value = response.error || "Book not found";
    }
  } catch (error) {
    errorMessage.value = "Failed to load book data";
    console.error("Fetch book error:", error);
  } finally {
    isFetching.value = false;
  }
};

// Validate form data
const validateForm = (): boolean => {
  if (!formData.title.trim()) {
    errorMessage.value = "Title is required";
    return false;
  }
  if (!formData.author.trim()) {
    errorMessage.value = "Author is required";
    return false;
  }
  if (formData.published_year !== null) {
    const year = Number(formData.published_year);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear() + 1) {
      errorMessage.value = "Please enter a valid year";
      return false;
    }
  }
  return true;
};

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!validateForm()) return;

  isLoading.value = true;

  try {
    // Prepare form data
    const data: BookFormData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      published_year: formData.published_year
        ? Number(formData.published_year)
        : null,
      genre: formData.genre || null,
    };

    let response;
    if (isEditMode.value) {
      response = await bookService.updateBook(bookId.value, data);
    } else {
      response = await bookService.createBook(data);
    }

    if (response.success) {
      const message = isEditMode.value
        ? "Book updated successfully!"
        : "Book created successfully!";

      // Show success alert with progress bar (2 seconds)
      await SweetAlertService.success({
        title: isEditMode.value ? 'Updated!' : 'Created!',
        text: message,
        timer: 2000,
      });

      // Redirect after alert closes
      router.push({ name: "Books" });
    } else {
      errorMessage.value = response.error || "Operation failed";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
    console.error("Form submission error:", error);
  } finally {
    isLoading.value = false;
  }
};

// reset form to initial state
const resetForm = () => {
  formData.title = "";
  formData.author = "";
  formData.published_year = null;
  formData.genre = null;
  errorMessage.value = "";
  successMessage.value = "";
};

onMounted(() => {
  if (isEditMode.value) {
    fetchBook();
  }
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
      Back
    </button>

    <!-- Form Card -->
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <!-- Header -->
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        {{ isEditMode ? "Edit Book" : "Add New Book" }}
      </h1>

      <!-- Loading State for Edit Mode -->
      <div v-if="isFetching" class="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Loading book data..." />
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
        >
          {{ successMessage }}
        </div>

        <!-- Title Field -->
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Title <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            placeholder="Enter book title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            :disabled="isLoading"
            required
          />
        </div>

        <!-- Author Field -->
        <div>
          <label
            for="author"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Author <span class="text-red-500">*</span>
          </label>
          <input
            id="author"
            v-model="formData.author"
            type="text"
            placeholder="Enter author name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            :disabled="isLoading"
            required
          />
        </div>

        <!-- Published Year Field -->
        <div>
          <label
            for="published_year"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Published Year
          </label>
          <input
            id="published_year"
            v-model.number="formData.published_year"
            type="number"
            placeholder="Enter published year (e.g., 2020)"
            min="1000"
            :max="new Date().getFullYear() + 1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            :disabled="isLoading"
          />
        </div>

        <!-- Genre Field -->
        <div>
          <label
            for="genre"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Genre
          </label>
          <select
            id="genre"
            v-model="formData.genre"
            class="w-full h-[42px] px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none cursor-pointer"
            :disabled="isLoading"
          >
            <option :value="null">Select a genre</option>
            <option v-for="genre in genreOptions" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            :disabled="isLoading"
          >
            Reset
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg transition-colors flex items-center"
          >
            <LoadingSpinner v-if="isLoading" size="sm" class="mr-2" />
            {{
              isLoading ? "Saving..." : isEditMode ? "Update Book" : "Add Book"
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
