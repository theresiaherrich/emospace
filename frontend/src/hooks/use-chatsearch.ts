import { useEffect, useRef, useState } from 'react';
import { type ChatEntry } from '../types/chat';

export const useChatSearch = (chatLog: ChatEntry[], searchTerm: string = '') => {
  const [matchIndices, setMatchIndices] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const matchRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    matchRefs.current = Array(chatLog.length).fill(null);
  }, [chatLog.length]);

  useEffect(() => {
    const indices: number[] = [];
    chatLog.forEach((entry, idx) => {
      if (searchTerm && entry.text.toLowerCase().includes(searchTerm.toLowerCase())) {
        indices.push(idx);
      }
    });
    setMatchIndices(indices);
    setCurrentMatchIndex(0);
  }, [chatLog, searchTerm]);

  useEffect(() => {
    const el = matchRefs.current[matchIndices[currentMatchIndex]];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentMatchIndex, matchIndices]);

  const handleNextMatch = () => {
    if (matchIndices.length > 0) {
      setCurrentMatchIndex((prev) => (prev + 1) % matchIndices.length);
    }
  };

  const handlePrevMatch = () => {
    if (matchIndices.length > 0) {
      setCurrentMatchIndex((prev) => (prev - 1 + matchIndices.length) % matchIndices.length);
    }
  };

  return {
    matchRefs,
    matchIndices,
    currentMatchIndex,
    handleNextMatch,
    handlePrevMatch,
  };
};