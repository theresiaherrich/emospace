import api from "../lib/axios";
import { getToken } from "../utils/auth";

export const getPremium = async () => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get("/plans", {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
    });

    return res.data;
};