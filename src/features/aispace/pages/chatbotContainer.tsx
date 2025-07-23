import { useNavigate } from 'react-router-dom';
import ChatBubble from '../../../components/ui/bubbleChat';
import ChatInput from '../../../components/ui/chatInput';
import ChatHeader from '../components/chatHeader';
import OptionsLabel from '../../../components/ui/optionslabel';
import { useAIChat } from '../hooks/use-aichat';
import { highlightText } from '../components/highlightText';

const ChatbotContainer = () => {
  const navigate = useNavigate();
  const moodOptions = ['Happy', 'Sad', 'Calm', 'Upset', 'Angry', 'Spectacular'];

  const {
    message, setMessage,
    chatLog, isBotTyping,
    matchRefs, searchTerm, bottomRef,
    handleSend, handleOptionSelect,
    handleSearchQuery, handleNextMatch, handlePrevMatch,
  } = useAIChat();

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col touch-manipulation">
      <ChatHeader
        onSearch={handleSearchQuery}
        onClose={() => navigate("/aispace")}
        onNavigateNext={handleNextMatch}
        onNavigatePrev={handlePrevMatch}
      />

      <div className="flex-1 justify-center items-center h-full overflow-y-auto px-4 sm:px-10 lg:px-24 py-6 space-y-4 font-spartan text-sm scroll-smooth">
        {chatLog.map((chat, index) => {
          const currentDate = chat.date?.split("T")[0];
          const prevDate = chatLog[index - 1]?.date?.split("T")[0];
          const showDate = currentDate && currentDate !== prevDate;

          return (
            <div key={index} ref={(el) => { matchRefs.current[index] = el; }}>
              {showDate && (
                <div className="text-center justify-center mx-auto bg-[#351A57] text-white px-6 py-1 text-sm rounded-xl w-fit mb-2">
                  {formatDate(currentDate)}
                </div>
              )}
              <ChatBubble
                from={chat.from as 'user' | 'bot'}
                text={highlightText(chat.text, searchTerm)}
              />
            </div>
          );
        })}

        {/* { && (
          <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-7 justify-center px-2">
            <OptionsLabel options={moodOptions} onSelect={handleOptionSelect} />
          </div>
        )} */}

        {isBotTyping && (
          <div className="flex justify-start">
            <div className="bg-[#351A57] text-white px-4 py-2 rounded-xl text-sm flex gap-1 items-center">
              Typing
              <span className="animate-bounce delay-0">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-1" />
      </div>

      <div className="sticky bottom-0 px-4 sm:px-10 lg:px-20 pb-4 pt-2 z-20">
        <ChatInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatbotContainer;