import api from "../lib/axios";
import { getToken } from "../utils/auth";

export const getJournal = async () => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get("/journals", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const postJournal = async (formData: FormData) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.post("/journals", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return res.data;
};

export const updateJournal = async (id: number, formData: FormData) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.put(`/journals/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const deleteJournal = async (id: number) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.delete(`/journals/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};