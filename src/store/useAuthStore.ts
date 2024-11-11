import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';
import axiosInstance from '../services/jwt/interceptor';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { id: string; username: string } | null,
  }),

  actions: {
    // Login action
    async login(username: string, password: string) {
      try {
        // Send login request (backend will set cookies)
        await axios.post('http://127.0.0.1:8000/api/login/', { username, password },{ withCredentials: true });

        // After login, fetch user data
       // await this.getUser(); // Get the logged-in user's data

        // Redirect to a protected page (optional)
        router.push('/home');
      } catch (error) {
        throw new Error('Invalid credentials');
      }
    },

    // Register action
    async register(name: string, email: string, password: string) {
      try {
        await axios.post('http://127.0.0.1:8000/api/register/', { username: name, email, password });
      } catch (error) {
        throw new Error('Registration failed');
      }
    },

    // Fetch authenticated user data
    async getUser() {
      try {
        const response = await axiosInstance.get('http://127.0.0.1:8000/api/user/', {
          withCredentials: true,  // Ensure cookies are sent with the request
        });
        this.user = response.data;  // Store user data in state
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },

    // Logout action
    logout() {
      // Redirect to the home page
      router.push('/');
      
      // Optionally, inform the backend to delete cookies (if needed)
      axios.post('http://127.0.0.1:8000/api/logout/', {}, { withCredentials: true });
      
      // Clear user state
      this.user = null;
    }
  },
});
