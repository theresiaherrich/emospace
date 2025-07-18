import { useState } from "react";
import { Search, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  expandable?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "",
  onSearch,
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
    <div className={`flex items-center gap-2 ${className}`}>
      {expanded && (
        <div className="relative w-full max-w-xl sm:max-w-md md:max-w-lg">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            className="w-full rounded-full px-4 py-2 border border-[#633796] font-spartan text-sm font-medium focus:outline-none h-10 shadow-[5px_5px_10px_0px_#00000040]"
          />
          {!expandable ? (
            <button>
              <Search className="absolute bg-[#633796] rounded-full p-1 right-3 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={handleToggleExpand}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#633796]"
            >
              {expanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      )}

      {expandable && !expanded && (
        <button
          onClick={handleToggleExpand}
          className="text-[#633796] bg-white rounded-full p-2 shadow-md"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
