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
      } transition-all duration-300 overflow-hidden border-r bg-lightgray`}
    >
      <div className="p-4 bg-white border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
              activeChat === chat.id ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-chatblue rounded-full flex items-center justify-center">
                <MessageCircle className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{chat.name}</h3>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;