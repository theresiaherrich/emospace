import api from "../lib/axios";
import { getToken } from "../utils/auth";
import { type MoodType } from "../features/home/types/type";

interface MoodPayload {
    date: string;
    mood_code: MoodType;
    color: string;
}

export const postMood = async (payload: MoodPayload) => {
  const token = getToken();

  const res = await api.post(`/mood`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getMonthlyMood = async (month: string) => {
  const token = getToken();

  const res = await api.get(`/mood/monthly`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { month },
  });

  return res.data;
};

export const getSummaryMood = async (month: string) => {
  const token = getToken();

  const res = await api.get(`/mood/summary`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: { month },
  });

  return res.data;
};