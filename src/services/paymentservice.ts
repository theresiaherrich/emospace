import api from "../lib/axios";
import { getToken } from "../utils/auth";

interface PaymentPayload {
    order_id: string;
    transaction_status: string;
}

export const getPaymentPremium = async (id: number) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get(`/payment/snap/${id}`, {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
    });

    return res.data;
}

export const getPaymentSpecialist = async (id: number) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.get(`/payment/consultan/${id}`, {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
    });

    return res.data;
}

export const postCallbackPayment = async (payload: PaymentPayload) => {
    const token = getToken();
    if (!token) throw new Error("User is not authenticated");

    const res = await api.post(`/payment/callback`, payload, {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
    });

    return res.data;
}