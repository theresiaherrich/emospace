import { useState } from 'react';
import { format } from 'date-fns';

const months = Array.from({ length: 12 }, (_, i) =>
  format(new Date(0, i), 'MMMM'),
);

const years = Array.from({ length: 12 }, (_, i) => 2020 + i);

interface Props {
  currentDate: Date;
  onChange: (date: Date) => void;
}

const MonthYearSelectorPurple = ({ currentDate, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (month: number, year: number) => {
    onChange(new Date(year, month));
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className=" bg-[#FDFEFF] text-[#633796] p-2 rounded-[100px] text-base text-center font-spartan font-medium shadow-[0px_4px_4px_0px_#00000040] w-[264px]"
      >
        {format(currentDate, 'MMMM yyyy')}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 p-4 bg-[#633796] rounded-xl shadow-md border w-[200px]">
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1 text-white">Month</label>
            <select
              value={currentDate.getMonth()}
              onChange={(e) =>
                handleSelect(parseInt(e.target.value), currentDate.getFullYear())
              }
              className="w-full border px-2 py-1 rounded text-sm"
            >
              {months.map((m, i) => (
                <option key={i} value={i} className='rounded-lg border-0'>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 text-white">Year</label>
            <select
              value={currentDate.getFullYear()}
              onChange={(e) =>
                handleSelect(currentDate.getMonth(), parseInt(e.target.value))
              }
              className="w-full border px-2 py-1 rounded text-sm"
            >
              {years.map((y) => (
                <option key={y} value={y} className='rounded-lg border-0'>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearSelectorPurple;
