import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sent: false },
    { id: 2, text: "Hi! How are you?", sent: true },
  ]);

  // Define chats here to share between components
  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!" },
    { id: 3, name: "Team Chat", lastMessage: "Meeting at 3 PM" },
  ];

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: Date.now(), text: message, sent: true }]);
  };

  // Find the active chat name
  const activeChatName = chats.find(chat => chat.id === activeChat)?.name || "Chat";

  return (
    <div className="flex h-screen bg-[#0f172a]">
      <Sidebar
        isOpen={isSidebarOpen}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        chats={chats}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center gap-2 p-3 bg-[#1e293b] border-b border-gray-700/50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-300" />
          </button>
          <h1 className="text-lg font-medium text-gray-200">{activeChatName}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-3 bg-[#1a1f2c] space-y-2">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isSent={message.sent}
            />
          ))}
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;