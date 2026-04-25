import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
}

export const ChatBubble = ({ onClick }: ChatBubbleProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200 z-[9999]"
    >
      <MessageCircle size={28} />
    </button>
  );
};
