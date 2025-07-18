import { useState, useRef, useEffect } from 'react';
import ChatBubble from '../../../components/ui/bubbleChat';
import ChatInput from '../../../components/ui/chatInput';
import ChatHeader from '../components/chatHeader';
import OptionsLabel from '../../../components/ui/optionslabel';
import { useNavigate } from 'react-router-dom';

function highlightText(text: string, keyword: string) {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="bg-yellow-500">{part}</span>
    ) : (
      part
    )
  );
}

const ChatbotContainer = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatLog, setChatLog] = useState([
    { from: 'bot', text: 'Halo John! kenalin namaku Space. Aku siap menemanimu mulai detik ini. Sebelum itu, bagaimana mood kamu hari ini?' },
  ]);
  const moodOptions = ['Happy', 'Sad', 'Calm', 'Upset', 'Angry', 'Spectacular'];
  const [isBotTyping, setBotTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [matchIndices, setMatchIndices] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const matchRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const newIndices: number[] = [];

    chatLog.forEach((chat, index) => {
      if (searchTerm && chat.text.toLowerCase().includes(searchTerm.toLowerCase())) {
        newIndices.push(index);
      }
    });

    setMatchIndices(newIndices);
    setCurrentMatchIndex(0);
  }, [searchTerm, chatLog]);

  useEffect(() => {
    if (matchIndices.length > 0 && matchRefs.current[matchIndices[currentMatchIndex]]) {
      matchRefs.current[matchIndices[currentMatchIndex]]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentMatchIndex, matchIndices]);

  const handleNextMatch = () => {
    if (matchIndices.length > 0) {
      setCurrentMatchIndex((prev) => (prev + 1) % matchIndices.length);
    }
  };

  const handlePrevMatch = () => {
    if (matchIndices.length > 0) {
      setCurrentMatchIndex((prev) =>
        (prev - 1 + matchIndices.length) % matchIndices.length
      );
    }
  };


  
  const handleSend = () => {
    if (message.trim()) {
      const newChat = { from: 'user', text: message };
      setChatLog(prev => [...prev, newChat]);
      setMessage('');
      setBotTyping(true);

      setTimeout(() => {
        const botReply = {
          from: 'bot',
          text: "Terima kasih sudah berbagi! Aku ikut senang mendengarnya 😊",
        };
        setChatLog(prev => [...prev, botReply]);
        setBotTyping(false);
      }, 1500);
    }
  };

  const handleOptionSelect = (option: string) => {
    const newChat = { from: 'user', text: option };
    setChatLog(prev => [...prev, newChat]);
    setBotTyping(true);
    setTimeout(() => {
      const botReply = {
        from: 'bot',
        text: "Terima kasih sudah berbagi! Aku ikut senang mendengarnya 😊",
      };
      setChatLog(prev => [...prev, botReply]);
      setBotTyping(false);
    }, 1500);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`chatLog-${todayKey}`);
    if (saved) {
      setChatLog(JSON.parse(saved));
    } else {
      setChatLog([
        {
          from: "bot",
          text: "Halo John! kenalin namaku Space. Aku siap menemanimu mulai detik ini. Sebelum itu, bagaimana mood kamu hari ini?"
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const todayKey = new Date().toISOString().split("T")[0];
    localStorage.setItem(`chatLog-${todayKey}`, JSON.stringify(chatLog));
  }, [chatLog]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col touch-manipulation">
      <ChatHeader 
      onSearch={setSearchTerm} 
      onClose={() => navigate("/aispace")} 
      onNavigateNext={handleNextMatch}
      onNavigatePrev={handlePrevMatch}
      />

      <div
        className="flex-1 h-full overflow-y-auto px-4 sm:px-10 lg:px-20 py-6 space-y-4 font-spartan text-sm scroll-smooth"
        ref={scrollRef}
      >
        <div className="text-center justify-center mx-auto bg-[#351A57] text-white px-6 py-1 text-sm rounded-xl w-fit">
          {today}
        </div>

        {chatLog.map((chat, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                matchRefs.current[index] = el;
              }}
            >
              <ChatBubble
                from={chat.from as "user" | "bot"}
                text={highlightText(chat.text, searchTerm) as unknown as string}
              />
            </div>
          );
        })}

        {chatLog.length === 1 && (
          <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-7 justify-center px-2">
            <OptionsLabel options={moodOptions} onSelect={handleOptionSelect} />
          </div>
        )}

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

        <div ref={bottomRef} />
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