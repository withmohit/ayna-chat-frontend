import { MessageCircle } from "lucide-react";

const Sidebar = ({ isOpen, activeChat, onChatSelect, chats }) => {
  return (
    <div
      className={`${
        isOpen ? "w-full md:w-72" : "w-0"
      } fixed md:relative transition-all duration-300 overflow-hidden border-r border-gray-700/50 bg-[#1e293b] flex-shrink-0 h-full z-10`}
    >
      <div className="p-2 bg-[#1e293b] border-b border-gray-700/50">
        <h2 className="text-base font-medium text-gray-200">Chats</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100%-3rem)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-2 cursor-pointer hover:bg-gray-800/50 transition-colors ${
              activeChat === chat.id ? "bg-gray-800/50" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-chatblue/80 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white w-4 h-4" />
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