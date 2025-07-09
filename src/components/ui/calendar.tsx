import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import Label from './label';
import Input from './input';
import { CalendarIcon } from 'lucide-react';

interface CalendarPickerProps {
  label?: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
  required?: boolean;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  label,
  value,
  onChange,
  required,
}) => {
  const [open, setOpen] = useState(false);

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
        value={value ? format(value, 'MM/dd/yyyy') : ''}
        placeholder="mm/dd/yyyy"
      />
      <button type="button" className='absolute right-3 top-1/2 transform' onClick={() => setOpen(!open)}>
        <CalendarIcon className=" text-gray-400 w-5 h-5 pointer-events-none" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-fit bg-white border rounded-md shadow-md">
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
            toYear={new Date().getFullYear()}
            modifiersClassNames={{
              selected: 'bg-[#7a4bb0] text-white',
              today: 'bg-purple-100 text-purple-900 font-semibold',
            }}
            className="p-2"
            classNames={{
              caption_label: 'text-base font-semibold p-2',
              nav_button: 'text-sm p-1 hover:bg-gray-100 rounded',
              table: 'w-full border-collapse ',
              head_row: '',
              head_cell: 'w-8 h-8 text-xs font-semibold text-gray-400 text-center',
              row: '',
              cell: 'w-8 h-8 text-sm text-center cursor-pointer rounded hover:bg-gray-100',
              day: 'items-center justify-center w-8 h-8',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;