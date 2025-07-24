import api from "../lib/axios";
import { getToken } from "../utils/auth";

export const getSpecialist = async () => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get("/consultans", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};