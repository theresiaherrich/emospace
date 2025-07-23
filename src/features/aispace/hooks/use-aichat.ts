import { useState, useEffect, useRef } from 'react';
import { postAISpace, getWelcomeSpace, getHistoryChat } from '../../../services/aispaceservice';
import { useChatSearch } from '../../../hooks/use-chatsearch';
import { type ChatEntry, type ChatHistoryResponse } from '../../../types/chat';

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

  const fetchHistory = async () => {
  try {
    const data = await getHistoryChat();
    const formatted = data
      .flatMap((item: ChatHistoryResponse) => [
        { from: 'user', text: item.user_input, date: item.created_at },
        { from: 'bot', text: item.ai_output.replace(/^Space:\s*/, ''), date: item.created_at }
      ])
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const today = new Date().toISOString().split("T")[0];
    const hasTodayMessage = formatted.some(item => item.date.startsWith(today));

    if (!hasTodayMessage) {
      const welcome = await getWelcomeSpace();
      const welcomeMsg = {
        from: 'bot',
        text: welcome.response.replace(/^Space:\s*/, ''),
        date: new Date().toISOString()
      };
      setChatLog([...formatted, welcomeMsg]); // Tambahkan welcome
    } else {
      setChatLog(formatted);
    }
  } catch (err) {
    console.error("Failed to fetch chat history:", err);
    setChatLog([]);
  }
};

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearchQuery = (term: string) => {
    setSearchTerm(term);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const now = new Date().toISOString();
    const userChat: ChatEntry = { from: 'user', text: message, date: now };
    setChatLog(prev => [...prev, userChat]);
    setMessage('');
    setBotTyping(true);

    try {
      const data = await postAISpace(message);
      const botReply: ChatEntry = {
        from: 'bot',
        text: data.response.replace(/^Space:\s*/, ''),
        date: new Date().toISOString()
      };
      setChatLog(prev => [...prev, botReply]);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error ?? 'Maaf, ada kendala internal. Coba kirim lagi chat kamu.';
      setChatLog(prev => [...prev, { from: 'bot', text: errorMsg, date: new Date().toISOString() }]);
    }

    setBotTyping(false);
  };

  const handleOptionSelect = async (option: string) => {
    const now = new Date().toISOString();
    const userChat: ChatEntry = { from: 'user', text: option, date: now };
    setChatLog(prev => [...prev, userChat]);
    setBotTyping(true);

    try {
      const data = await postAISpace(option);
      const botReply: ChatEntry = {
        from: 'bot',
        text: data.response.replace(/^Space:\s*/, ''),
        date: new Date().toISOString()
      };
      setChatLog(prev => [...prev, botReply]);
    } catch {
      setChatLog(prev => [...prev, {
        from: 'bot',
        text: 'Maaf, ada kendala internal. Coba kirim lagi chat kamu.',
        date: now
      }]);
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