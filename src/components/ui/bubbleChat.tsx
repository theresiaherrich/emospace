interface ChatBubbleProps {
  from: 'user' | 'bot' | string;
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ from, text }) => {
  const isUser = from === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs px-5 py-2 rounded-xl text-sm ${isUser ? 'bg-[#CECECE] text-black' : 'bg-[#351A57] text-white'}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;