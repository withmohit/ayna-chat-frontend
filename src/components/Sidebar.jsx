import { MessageCircle } from "lucide-react";

const Sidebar = ({ isOpen, activeChat, onChatSelect, chats }) => {
  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-0"
      } transition-all duration-300 overflow-hidden border-r border-gray-700/50 bg-[#1e293b] flex-shrink-0`}
    >
      <div className="p-3 bg-[#1e293b] border-b border-gray-700/50">
        <h2 className="text-lg font-medium text-gray-200">Chats</h2>
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-3 cursor-pointer hover:bg-gray-800/50 transition-colors ${
              activeChat === chat.id ? "bg-gray-800/50" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chatblue/80 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-200 text-sm truncate">{chat.name}</h3>
                <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;