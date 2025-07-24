import { SendHorizonal } from "lucide-react";
import { useRef, useEffect } from "react";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="relative p-4">
      <textarea
        ref={textareaRef}
        className="w-full pr-12 pl-4 py-3 rounded-2xl border border-[#341A55] resize-none bg-[#F3F5F6] text-base font-spartan font-medium focus:outline-none overflow-hidden scrollbar-hide max-h-40"
        placeholder="Type your message here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button
        onClick={onSend}
        type="button"
        className="absolute right-8 bottom-9 text-[#633796]"
      >
        <SendHorizonal className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;
