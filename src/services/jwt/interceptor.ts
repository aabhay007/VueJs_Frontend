import axios from 'axios';
import Cookies from 'js-cookie'
import { useAuthStore } from '../../store/useAuthStore'; // Import your Pinia auth store for logout

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

// Request interceptor to add the access token from cookies to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');  // Retrieve access token from cookies
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors and refresh token if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get('refreshToken');  // Retrieve refresh token from cookies
      if (refreshToken) {
        try {
          // Attempt to refresh the access token
          const refreshResponse = await axios.post(`${axiosInstance.defaults.baseURL}token/refresh/`, {
            refresh: refreshToken
          });

          // Update accessToken in cookies
          Cookies.set('accessToken', refreshResponse.data.access_token, { expires: 3600 });

          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          // If token refresh fails, log out the user
          const authStore = useAuthStore();
          authStore.logout();
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, log out
        const authStore = useAuthStore();
        authStore.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
