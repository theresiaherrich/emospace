import { XIcon } from "lucide-react";
import SearchBar from "../../../components/ui/searchbar";

interface ChatHeaderProps {
  onSearch: (value: string) => void;
  onClose: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onSearch, onClose, onNavigateNext, onNavigatePrev }) => {
  return (
    <div className="flex flex-row items-center justify-between bg-[#351A57] rounded-full px-5 sm:px-6 py-2 md:py-4 lg:h-20 gap-3">
      <div className="flex items-center gap-2 justify-start w-full lg:w-auto">
        <img src="/assets/3.svg" alt="Space" className="w-14 h-14 sm:w-16 sm:h-16" />
        <h1 className="font-spartan text-2xl sm:text-3xl font-medium text-white">Space</h1>
      </div>
      <div className="flex items-center justify-end w-full lg:w-auto gap-4 sm:gap-6">
        <div className="flex-none">
          <SearchBar
            placeholder="Search within chat"
            expandable
            onSearch={onSearch}
            onNavigateNext={onNavigateNext}
            onNavigatePrev={onNavigatePrev}
            className="w-full"
          />
        </div>
        <button onClick={onClose} className="flex-shrink-0">
          <XIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;