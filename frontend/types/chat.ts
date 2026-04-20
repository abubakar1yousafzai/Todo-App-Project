export interface ChatMessage {
  id: string;
  conversation_id: number;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatRequest {
  content: string;
}

export interface ChatResponse {
  response: string;
}
