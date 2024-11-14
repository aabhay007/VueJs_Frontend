<template>
    <div>
      <h2>File Upload</h2>
      <form @submit.prevent="handleUpload">
        <div>
          <label for="file">Choose a file:</label>
          <input type="file" @change="onFileChange" required />
          <span v-if="fileError" class="error-message">{{ fileError }}</span>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <button type="submit" :disabled="isSubmitDisabled">Upload</button>
      </form>
  
      <div v-if="fileStore.uploadStatus" class="success-message">
        {{ fileStore.uploadStatus }}
      </div>
      <div v-if="fileStore.error" class="error-message">
        Error: {{ fileStore.error }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, computed } from 'vue'
  import { useFileStore } from '../store/useFileStore'
  
  export default {
    setup() {
      const fileStore = useFileStore()
      const file = ref<File | null>(null)
      const email = ref<string>('')
  
      const fileError = ref<string | null>(null)
  
      // Allowed file types and size limit
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
      const maxSize = 5 * 1024 * 1024 // 5 MB in bytes
  
      // Handle file selection and validate
      const onFileChange = (event: Event) => {
        const input = event.target as HTMLInputElement
        if (input.files) {
          const selectedFile = input.files[0]
          if (selectedFile) {
            if (!allowedTypes.includes(selectedFile.type)) {
              fileError.value = 'Only JPG, PNG, and PDF files are allowed.'
              file.value = null
            } else if (selectedFile.size > maxSize) {
              fileError.value = 'File size should be less than 5 MB.'
              file.value = null
            } else {
              fileError.value = null
              file.value = selectedFile
            }
          }
        }
      }
  
      // Handle form submission
      const handleUpload = () => {
        if (file.value && email.value) {
          fileStore.uploadFile(file.value, email.value)
        }
      }
  
      // Disable submit button if there's an error or no file selected
      const isSubmitDisabled = computed(() => {
        return !file.value || !!fileError.value || !email.value
      })
  
      return {
        fileStore,
        file,
        email,
        fileError,
        onFileChange,
        handleUpload,
        isSubmitDisabled,
      }
    },
  }
  </script>
  
  <style scoped>
  .success-message {
    color: green;
  }
  .error-message {
    color: red;
  }
  </style>
  