import { XIcon } from "lucide-react";
import SearchBar from "../../../components/ui/searchbar";

interface ChatHeaderProps {
  onSearch: (value: string) => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSearch, onClose }) => {
  return (
    <div className="flex items-center justify-between bg-[#351A57] rounded-full pl-20 pr-16 h-20">
      <div className="flex items-center gap-2 justify-start">
        <img src="/assets/3.svg" alt="Space" className="w-16 h-16" />
        <h1 className="font-spartan text-3xl font-medium text-white">Space</h1>
      </div>
      <div className="flex items-center gap-12 justify-end">
        <SearchBar
          placeholder="Search within chat"
          expandable
          onSearch={onSearch}
        />
        <button onClick={onClose}>
            <XIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;