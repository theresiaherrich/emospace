import { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from 'date-fns';
import { type MoodType, type MoodMap } from '../types/type';
import MonthYearSelector from '../../../components/ui/monthyearSelector';

export const moodColors: Record<MoodType, string> = {
  Angry: 'bg-[#FFDFD5]',
  Sad: 'bg-[#D5FBFF]',
  Spectacular: 'bg-[#FFD5E6]',
  Calm: 'bg-[#D5D6FF]',
  Happy: 'bg-[#FFFAD5]',
  Upset: 'bg-[#9cb2f9]',
};

const isValidMood = (m: any): m is MoodType => Object.keys(moodColors).includes(m);

interface CalendarMoodProps {
  moodData: MoodMap;
}

const CalendarMood: React.FC<CalendarMoodProps> = ({ moodData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));

  const days: Date[] = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <MonthYearSelector
          currentDate={currentDate}
          onChange={(date) => setCurrentDate(date)}
        />
      </div>
      <div className="bg-[#FDFEFF] rounded-xl border border-l-0 border-[#CECECE]">
        <div className="grid grid-cols-7 rounded-xl">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
            <div
              className="p-3 text-sm border-l border-[#CECECE] font-medium text-left text-[#969696] h-8"
              key={d}
            >
              {d}
            </div>
          ))}
          {days.map((d, i) => {
            const dateKey = format(d, 'yyyy-MM-dd');
            const mood = moodData?.[dateKey] ?? null;
            const moodClass = isValidMood(mood) ? moodColors[mood] : '';

            return (
              <div
                key={i}
                title={mood || ''}
                className={`md:h-[92px] md:w-[92px] flex items-start justify-start text-xl border border-b-0 border-r-0 border-[#CECECE] font-medium transition-colors duration-300 p-3
                  ${moodClass}
                  ${!isSameMonth(d, currentDate) ? 'text-[#969696]' : ''}`}
              >
                {d.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarMood;
