import api from "../lib/axios";
import { getToken } from "../utils/auth";

export const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error("User is not authenticated");

  const res = await api.get(`/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data;
};

export const updateUserProfile = async (formData: FormData) => {
  const token = getToken();
  if (!token) throw new Error("Not authenticated");

  const res = await api.put("/user/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};
