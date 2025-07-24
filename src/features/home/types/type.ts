export type MoodType = 'Angry' | 'Sad' | 'Spectacular' | 'Calm' | 'Happy' | 'Upset';

export type MoodMap = {
  [date: string]: {
    mood_code: MoodType;
    color: string;
  };
};

export const moodColors: Record<MoodType, string> = {
  Angry: '#FFDFD5',
  Sad: '#D5FBFF',
  Spectacular: '#FFD5E6',
  Calm: '#D5D6FF',
  Happy: '#FFFAD5',
  Upset: '#9cb2f9',
};
