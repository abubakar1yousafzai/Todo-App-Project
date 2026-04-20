'use client';

import React, { useState } from 'react';
import { useChat } from '@/hooks/useChat';

export const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isLoading, error } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-500">AI is thinking...</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI to manage your tasks..."
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};
