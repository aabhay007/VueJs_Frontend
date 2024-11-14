// stores/useFileStore.ts
import { defineStore } from 'pinia'
import axiosInstance from '../services/jwt/interceptor'

interface FileStoreState {
  uploadStatus: string | null
  error: string | null
}

export const useFileStore = defineStore('file', {
  state: (): FileStoreState => ({
    uploadStatus: null,
    error: null,
  }),
  actions: {
    async uploadFile(file: File, email: string) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('email', email)

      try {
        const response = await axiosInstance.post('upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.uploadStatus = response.data.message
      } catch (error: any) {
        this.error = error.response ? error.response.data : error.message
      }
    },
  },
})
