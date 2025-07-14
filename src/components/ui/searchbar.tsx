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
        <div className="relative w-80">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            className="rounded-full px-4 py-2 font-spartan items-center focus:outline-none focus:ring-2 focus:ring-[#351A57] h-8 w-80"
          />
          {!expandable ? (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
          ) : (
            <div>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              <button className="absolute right-8 top-1/2 transform -translate-y-1/2">
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
