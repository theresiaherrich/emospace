import api from "../lib/axios";
import { getToken } from "../utils/auth";

export const postAISpace = async (message: string) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.post("/ai/chat", { message }, {
        headers: {
            Authorization: `Bearer ${token}`
        }    
    });

    return res.data;
};

export const getWelcomeSpace = async () => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get("/ai/welcome", {
        headers: {
            Authorization: `Bearer ${token}`
        }    
    });

    return res.data;
};

export const getHistoryChat = async () => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get("/ai/history", {
        headers: {
            Authorization: `Bearer ${token}`
        }    
    });

    return res.data.history;
};

export const getSearchChat = async (query : string) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get(`/ai/search?query=${query}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            query
        }
    })
    return res.data.results;
};