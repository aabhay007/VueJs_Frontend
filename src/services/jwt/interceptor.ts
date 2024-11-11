import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",  // Make sure this URL is correct
  withCredentials: true,  // Ensure cookies are sent with each request
});

// Optional: Interceptor for logging requests (debugging)
axiosInstance.interceptors.request.use(
  config => {
    console.log("Request sent with config:", config);  // Log the request to inspect if cookies are included
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
