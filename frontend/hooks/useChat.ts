import { useState, useCallback } from 'react';
import { ChatMessage } from '@/types/chat';
import { sendChatMessage } from '@/lib/api';
import { useAuth } from './useAuth';

export const useChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!user) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      conversation_id: 1, // Will be updated by backend
      user_id: user.id,
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await sendChatMessage(user.id, { content });
      if (apiError) throw new Error(apiError);

      if (data) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          conversation_id: 1,
          user_id: user.id,
          role: 'assistant',
          content: data.response,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const clearConversation = () => setMessages([]);

  return { messages, sendMessage, clearConversation, isLoading, error };
};
