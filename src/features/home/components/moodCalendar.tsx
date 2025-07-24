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
import { type MoodMap } from '../types/type';
import MonthYearSelector from '../../../components/ui/monthyearSelector';

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
              key={d}
              className="p-3 text-sm border-l border-[#CECECE] font-medium text-left text-[#969696] h-8"
            >
              {d}
            </div>
          ))}

          {days.map((d, i) => {
            const dateKey = format(d, 'yyyy-MM-dd');
            const moodEntry = moodData[dateKey];
            const bgColor = moodEntry?.color;
            const moodTitle = moodEntry?.mood_code;

            return (
              <div
                key={i}
                title={moodTitle || ''}
                className={`md:h-[92px] md:w-[92px] flex items-start justify-start text-xl border border-b-0 border-r-0 border-[#CECECE] font-medium p-3
                  ${!isSameMonth(d, currentDate) ? 'text-[#969696]' : ''}`}
                style={bgColor ? { backgroundColor: bgColor } : {}}
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
