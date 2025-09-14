import axiosInstance from "../lib/axios";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (email: string, phone: number, password: string) => {
    const response = await axiosInstance.post("/auth/register", {
      email,
      phone,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },
};