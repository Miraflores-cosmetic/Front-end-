import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/utils/tokenStorage";

// TODO: Replace with your actual base URL
const BASE_URL = "https://your-api-url.com/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (refreshToken) {
          // TODO: Implement refresh token endpoint
          // const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          //   refreshToken,
          // });
          // const { token } = response.data;
          // tokenStorage.setToken(token);
          // originalRequest.headers.Authorization = `Bearer ${token}`;
          // return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        tokenStorage.clearAll();
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
