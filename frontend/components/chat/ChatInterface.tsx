'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChat } from '@/hooks/useChat';

interface ChatInterfaceProps {
  isAuthenticated?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ isAuthenticated = true }) => {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!isAuthenticated) return; // Logic handled in render

    sendMessage(input);
    setInput('');
  };

  const isTaskCommand = (text: string) => {
    const keywords = ['add', 'task', 'list', 'complete', 'delete', 'update'];
    return keywords.some(kw => text.toLowerCase().includes(kw));
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-100 text-black self-start'}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-500 text-sm">AI is thinking...</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>

      {!isAuthenticated && isTaskCommand(input) ? (
        <div className="p-4 bg-yellow-50 rounded-lg text-sm border border-yellow-200">
          <p>Please sign up or log in to manage tasks.</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => router.push('/signup')} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Sign Up</button>
            <button onClick={() => router.push('/login')} className="bg-gray-200 text-black px-3 py-1 rounded text-xs">Log In</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to manage your tasks..."
            className="flex-1 border p-2 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">Send</button>
        </form>
      )}
    </div>
  );
};
