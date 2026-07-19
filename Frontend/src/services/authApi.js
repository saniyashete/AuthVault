import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const registerUser = (userData) => {
  return authApi.post("/register", userData);
};
export const loginUser = (userData) => {
  return authApi.post("/login", userData);
};

export const getProfile = () => {
  return authApi.get("/profile");
};

export const updateProfile = (data) => {
  return authApi.patch("/update-profile", data);
};

export const forgotPassword = async (email) => {
  const response = await authApi.post("/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await authApi.post(`/reset-password/${token}`, {
    password,
  });

  return response.data;
};
export const logoutUser = () => {
  return authApi.post("/logout");
};
export default authApi;
