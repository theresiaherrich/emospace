import { useState } from "react";

interface OptionsLabelProps {
  options: string[];
  onSelect: (option: string) => void;
}

const OptionsLabel: React.FC<OptionsLabelProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className="flex flex-wrap gap-7 max-w-96 justify-center items-center">
      {options.map((option, index) => (
        <button
          key={index}
          className={`font-spartan px-4 py-2 rounded-lg border border-[#633796] font-medium transition
            ${
              selectedOption === option
                ? "bg-[#351A57] text-white"
                : "bg-white text-black hover:bg-[#351A57] hover:text-white"
            }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsLabel;