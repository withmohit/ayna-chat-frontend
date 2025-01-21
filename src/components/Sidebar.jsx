import { MessageCircle } from "lucide-react";

const Sidebar = ({ isOpen, activeChat, onChatSelect }) => {
  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!" },
    { id: 3, name: "Team Chat", lastMessage: "Meeting at 3 PM" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-0"
      } transition-all duration-300 overflow-hidden border-r border-gray-700 bg-[#1e293b]`}
    >
      <div className="p-4 bg-[#1e293b] border-b border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">Chats</h2>
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 cursor-pointer hover:bg-gray-800 transition-colors ${
              activeChat === chat.id ? "bg-gray-800" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-chatblue rounded-full flex items-center justify-center">
                <MessageCircle className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-200 truncate">{chat.name}</h3>
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;