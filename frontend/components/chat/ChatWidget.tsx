"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { useChatWidget } from '../../hooks/useChatWidget';
import { useAuth } from '@/hooks/useAuth';
import { ChatBubble } from './ChatBubble';
import { ChatPopup } from './ChatPopup';
import { ChatInterface } from './ChatInterface';

export const ChatWidget = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isOpen, toggleChat, closeChat } = useChatWidget();
  
  const isVisible = pathname === '/' || pathname.startsWith('/dashboard');

  if (!isVisible) return null;

  return (
    <>
      <ChatBubble onClick={toggleChat} />
      <ChatPopup isOpen={isOpen} onClose={closeChat}>
        <ChatInterface isAuthenticated={!!user} />
      </ChatPopup>
    </>
  );
};
