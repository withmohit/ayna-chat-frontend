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

  const handleSendMessage = (message) => {
    setMessages([...messages, { id: Date.now(), text: message, sent: true }]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center gap-4 p-4 bg-white border-b">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Chat {activeChat}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2]">
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