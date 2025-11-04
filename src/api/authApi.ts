import api from "./api";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  // Add other fields as needed
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    // Add other user fields as needed
  };
}

export const authApi = {
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signin", data);
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  signOut: async (): Promise<void> => {
    await api.post("/auth/signout");
  },

  // Optional: Add refresh token method
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  },

  // Get current user data using existing token
  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response = await api.get<AuthResponse["user"]>("/auth/me");
    return response.data;
  },
};
