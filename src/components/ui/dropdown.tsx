import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Label from "./label";

interface CustomDropdownProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full font-lexend" ref={dropdownRef}>
      {label && <Label required={required}>{label}</Label>}
      <button
        type="button"
        className="flex mt-1 px-5 py-2 rounded-2xl border-2 border-[#351A57] border-opacity-40 font-bold text-black placeholder:text-black placeholder:text-opacity-40 bg-[#CECECE] backdrop-blur-sm bg-opacity-40 w-full items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className={`${!value ? "text-black text-opacity-40" : ""}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 p-4 rounded-xl bg-white shadow-md border w-full font-spartan">
          {options.map((opt, i) => (
            <div
              key={i}
              className="px-4 py-2 font-semibold text-black hover:bg-[#633796] hover:text-white cursor-pointer rounded-xl transition-all"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
