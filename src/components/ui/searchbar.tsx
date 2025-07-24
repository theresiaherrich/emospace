import { useState } from "react";
import { Search, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  expandable?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "",
  onSearch,
  onNavigateNext,
  onNavigatePrev,
  expandable = false,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(!expandable);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleToggleExpand = () => {
    if (expandable) {
      setExpanded((prev) => !prev);
      if (expanded) {
        setQuery("");
        onSearch("");
      }
    }
  };

  return (
    <div className={`flex items-center gap-2  ${className}`}>
      {expanded && (
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            className="w-full lg:w-[560px] rounded-full px-4 py-2 border border-[#633796] font-spartan text-sm font-medium focus:outline-none h-10 shadow-[5px_5px_10px_0px_#00000040]"
          />
          {!expandable ? (
            <button>
              <Search className="absolute bg-[#633796] rounded-full p-1 right-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            </button>
          ) : (
            <div>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={onNavigateNext}>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <button className="absolute right-8 top-1/2 transform -translate-y-1/2" onClick={onNavigatePrev}>
                <ChevronUpIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {expandable && (
        <button
          onClick={handleToggleExpand}
          className="text-white z-10"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
