// src/store/useAuthStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { id: string; username: string } | null,
    // token: localStorage.getItem('token') || '',
    // isAuthenticated: !!localStorage.getItem('token'),
  }),

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', { username, password });
        // this.token = response.data.token;
        this.user = response.data.user;
        // this.isAuthenticated = true;
        // localStorage.setItem('token', this.token);
      } catch (error) {
        throw new Error('Invalid credentials');
      }
    },

    async register(username: string, email: string, password: string) {
      try {
        await axios.post('http://127.0.0.1:8000/api/register/', { username, email, password });
      } catch (error) {
        throw new Error('Registration failed');
      }
    },

    // Fetch the authenticated user's data
    async getUser() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/');
        this.user = response.data;  // Store user data in state
        // console.log(this.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // this.logout();  // Logout if fetching user fails (e.g., invalid token)
      }
    },

    logout() {
      this.user = null;
    
      // Clear csrftoken cookie specifically
      document.cookie = "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
      router.push('/');
      // window.location.reload();
    }
    
    
  },
});
