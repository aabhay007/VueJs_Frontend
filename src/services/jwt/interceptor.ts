import axios from 'axios';
import Cookies from 'js-cookie'
import { useAuthStore } from '../../store/useAuthStore'; 


const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get('refreshToken');  
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(`${axiosInstance.defaults.baseURL}token/refresh/`, {
            refresh: refreshToken
          });
          Cookies.set('accessToken', refreshResponse.data.access, { expires: 3600 });
          error.config.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          const authStore = useAuthStore();
          authStore.logout();
          return Promise.reject(refreshError);
        }
      } else {
        const authStore = useAuthStore();
        authStore.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
