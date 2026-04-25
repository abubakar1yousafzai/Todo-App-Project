"use client";
import { useState, useEffect } from 'react';

export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatWidgetState');
    if (saved) {
      const { isOpen } = JSON.parse(saved);
      setIsOpen(isOpen);
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('chatWidgetState', JSON.stringify({ isOpen }));
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeChat = () => setIsOpen(false);
  const openChat = () => setIsOpen(true);

  return { isOpen, toggleChat, closeChat, openChat };
}
