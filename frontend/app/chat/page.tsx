import { ChatInterface } from "@/components/chat/ChatInterface";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">AI Todo Assistant</h1>
        <ChatInterface />
      </div>
    </ProtectedRoute>
  );
}
