import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import Label from './label';
import Input from './input';
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarPickerProps {
  label?: string;
  value: Date | undefined ;
  onChange: (date: Date) => void;
  required?: boolean;
  variant?: 'day' | 'month' | 'year';
  className?: string;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  label,
  value,
  onChange,
  required,
  variant = 'day',
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const getFormattedValue = () => {
    if (!value) return '';
    switch (variant) {
      case 'day':
        return format(value, 'MM/dd/yyyy');
      case 'month':
        return format(value, 'MMMM yyyy');
      case 'year':
        return format(value, 'yyyy');
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full">
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}

      <Input
        type="text"
        readOnly
        onClick={() => setOpen(!open)}
        value={getFormattedValue()}
        className={className}
        placeholder={
          variant === 'month'
            ? 'Select month'
            : variant === 'year'
            ? 'Select year'
            : 'mm/dd/yyyy'
        }
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/6 transform"
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="text-gray-400 w-5 h-5" />
      </button>

      {open && (
        <div className="absolute bottom-full z-50 mt-2 w-fit bg-white border rounded-md shadow-md p-3">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(selected) => {
              if (selected) {
                onChange(selected);
                setOpen(false);
              }
            }}
            captionLayout="dropdown"
            fromYear={1950}
            toYear={new Date().getFullYear() + 1}
            modifiersClassNames={{
              selected: 'bg-[#7a4bb0] text-white',
              today: 'bg-purple-100 text-purple-900 font-semibold',
            }}
            showOutsideDays={variant === 'day'}
            styles={{
              months: { display: variant === 'year' ? 'none' : 'flex' },
              caption: {
                flexDirection:
                  variant === 'year' ? 'row-reverse' : 'row',
              },
              table: {
                display: variant === 'day' ? 'table' : 'none',
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface CalendarSelectProps {
  value: Date;
  onChange: (date: Date) => void;
  mode: "year" | "month";
}

const CalendarSelect: React.FC<CalendarSelectProps> = ({ value, onChange, mode }) => {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 30 }, (_, i) => currentYear - 10 + i);

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(value);
    newDate.setMonth(monthIndex);
    onChange(newDate);
    setOpen(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(value);
    newDate.setFullYear(year);
    onChange(newDate);
    setOpen(false);
  };

  return (
    <div className="relative w-fit">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border-2 border-[#593187] rounded-lg px-3 py-1 flex items-center gap-2 focus:outline-none w-64 justify-between text-[#1C1C1C] font-spartan font-semibold"
      >
        <span className="text-left">
          {mode === "year" && format(value, "yyyy")}
          {mode === "month" && format(value, "MMMM yyyy")}
        </span>
        <CalendarIcon className="text-[#593187] w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-14 z-50 bg-[#F9F5FF] rounded-xl shadow-lg w-64 max-h-80 overflow-y-auto border border-[#D8CFF2] p-2">
          {mode === "month" ? (
            <>
              <div className="flex justify-between px-2 text-sm mb-1 text-gray-500 font-semibold">
                <span>Month</span>
                <span>Year</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    className={`text-left px-3 py-2 rounded-lg hover:bg-[#E7DAFA] ${
                      value.getMonth() === index ? "bg-[#E7DAFA] font-bold" : ""
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between px-2 text-sm mb-1 text-gray-500 font-semibold">
                <span>Year</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`text-left px-3 py-2 rounded-lg hover:bg-[#E7DAFA] ${
                      value.getFullYear() === year ? "bg-[#E7DAFA] font-bold" : ""
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { CalendarPicker, CalendarSelect };