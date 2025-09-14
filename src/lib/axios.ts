import axios from "axios";
import Cookies from "js-cookie";

// Create Axios instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, // Django backend base URL
  withCredentials: true, // include cookies if needed
});

// Request interceptor → attach token from cookie if available
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // JWT stored in cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Token may be expired.");
      Cookies.remove("accessToken"); // clear token if invalid
      // Optionally redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
