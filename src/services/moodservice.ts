import api from "../lib/axios";
import { getToken } from "../utils/auth";
import { moodColors } from "../features/home/components/moodCalendar";
import { type MoodType } from "../features/home/types/type";

export const postMood = async (mood_code: MoodType) => {
  const token = getToken();
  const color = moodColors[mood_code];

  const res = await api.post(`/mood`, { mood_code, color }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getMonthlyMood = async (month: string) => {
    const token = getToken();

    const res = await api.get(`/mood/monthly`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            month,
        }
    });

    return res.data;
};

export const getSummaryMood = async (month: string) => {
    const token = getToken();

    const res = await api.get(`/mood/summary`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            month,
        }
    });

    return res.data;
};