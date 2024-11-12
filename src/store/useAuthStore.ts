import { defineStore } from 'pinia';
import router from '../router';
import axiosInstance from '../services/jwt/interceptor';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
 

  actions: {
    // Login action
    async login(username: string, password: string) {
      try {
        // Send login request and receive tokens
        const response = await axiosInstance.post('login/', { username, password });

        // Store tokens in cookies
        Cookies.set('accessToken', response.data.access_token, { expires: 3600 });  // expires in 1 hour
        Cookies.set('refreshToken', response.data.refresh_token, { expires: 604800 });  // expires in 7 days

        // After login, fetch user data
        await this.getUser();

        // Redirect to a protected page
        router.push('/home');
      } catch (error) {
        throw new Error('Invalid credentials');
      }
    },

    // Register action
    async register(name: string, email: string, password: string) {
      try {
        await axiosInstance.post('register/', { username: name, email, password });
      } catch (error) {
        throw new Error('Registration failed');
      }
    },

    // Fetch authenticated user data
    async getUser() {
      try {
        // const accessToken = Cookies.get('accessToken');
        const response = await axiosInstance.get('user/');
        localStorage.setItem('name',response.data.first_name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },

    // Logout action
    logout() {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      router.push('/');
    },

    // Token refresh action
    async refreshAccessToken() {
      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await axiosInstance.post('refresh/', {
          refresh: refreshToken
        });
        Cookies.set('accessToken', response.data.access_token, { expires: 3600 }); // Reset expiry to 1 hour
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        this.logout();
      }
    }
  }
});
