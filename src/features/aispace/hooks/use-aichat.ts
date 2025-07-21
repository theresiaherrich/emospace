import { useState, useEffect, useRef } from 'react';
import { postAISpace, getWelcomeSpace, getHistoryChat } from '../../../services/aispaceservice';
import { useChatSearch } from '../../../hooks/use-chatsearch';
import { type ChatEntry } from '../../../types/chat';

export const useAIChat = () => {
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [isBotTyping, setBotTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    matchRefs,
    matchIndices,
    currentMatchIndex,
    handleNextMatch,
    handlePrevMatch
  } = useChatSearch(chatLog, searchTerm);

  const getStorageKey = () => {
    const todayKey = new Date().toISOString().split("T")[0];
    const userID = localStorage.getItem("UserID") ?? "guest";
    return `chatLog-${userID}-${todayKey}`;
  };

  const fetchHistory = async () => {
    try {
      const data = await getHistoryChat();
      if (data.length > 0) {
        const formatted = data.flatMap((item: any) => [
          { from: 'user', text: item.user_input, date: item.created_at },
          { from: 'bot', text: item.ai_output.replace(/^Space:\s*/, ''), date: item.created_at }
        ]);
        setChatLog(formatted);
        localStorage.setItem(getStorageKey(), JSON.stringify(formatted));
      } else {
        const welcome = await getWelcomeSpace();
        setChatLog([{ from: 'bot', text: welcome.response.replace(/^Space:\s*/, '') }]);
      }
    } catch {
      setChatLog([{ from: 'bot', text: "Halo! Aku Space. Bagaimana mood kamu hari ini?" }]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(chatLog));
  }, [chatLog]);

  const handleSearchQuery = async (term: string) => {
    setSearchTerm(term);
  };

  const handleSend = async () => {
    if (message.trim()) {
      const now = new Date().toISOString();
      const userChat = { from: 'user', text: message, date: now };
      setChatLog(prev => [...prev, userChat]);
      setMessage('');
      setBotTyping(true);

      try {
        const data = await postAISpace(message);
        const cleanedText = data.response.replace(/^Space:\s*/, "");
        setChatLog(prev => [...prev, { from: 'bot', text: cleanedText, date: now }]);
      } catch (error: any) {
        const errorMsg = error?.response?.data?.error ?? "Maaf, ada kendala internal. Coba kirim lagi chat kamu.";
        setChatLog(prev => [...prev, { from: 'bot', text: errorMsg, date: now }]);
      }
      setBotTyping(false);
    }
  };

  const handleOptionSelect = async (option: string) => {
    const now = new Date().toISOString();
    const userChat = { from: 'user', text: option, date: now };
    setChatLog(prev => [...prev, userChat]);
    setBotTyping(true);

    try {
      const data = await postAISpace(option);
      const cleanedText = data.response.replace(/^Space:\s*/, "");
      const botReply = { from: 'bot', text: cleanedText, date: now };
      setChatLog(prev => [...prev, botReply]);
    } catch {
      setChatLog(prev => [...prev, { from: 'bot', text: "Maaf, ada kendala internal. Coba kirim lagi chat kamu.", date: now }]);
    }
    setBotTyping(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);


  return {
    message, setMessage,
    chatLog,
    searchTerm,
    matchRefs,
    matchIndices,
    currentMatchIndex,
    bottomRef,
    isBotTyping,
    handleSend,
    handleOptionSelect,
    handleSearchQuery,
    handleNextMatch,
    handlePrevMatch
  };
};