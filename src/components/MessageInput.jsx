import { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-white border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-chatblue"
      />
      <button
        type="submit"
        className="p-2 text-white bg-chatblue rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default MessageInput;