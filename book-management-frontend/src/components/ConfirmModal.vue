<script setup lang="ts">
// Props definition
interface Props {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Confirm",
  confirmText: "Confirm",
  cancelText: "Cancel",
  confirmButtonClass: "bg-red-500 hover:bg-red-600",
});

// Emit events
const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50"
          @click="emit('cancel')"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10"
        >
          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ title }}
          </h3>

          <!-- Message -->
          <p class="text-gray-600 mb-6">
            {{ message }}
          </p>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              @click="emit('cancel')"
              class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="emit('confirm')"
              :class="[
                confirmButtonClass,
                'px-4 py-2 text-white rounded transition-colors',
              ]"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
