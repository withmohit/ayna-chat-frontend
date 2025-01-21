const MessageBubble = ({ message, isSent }) => {
  return (
    <div
      className={`max-w-[70%] p-3 rounded-lg mb-2 animate-fade-in ${
        isSent
          ? "bg-messageblue ml-auto rounded-tr-none"
          : "bg-white mr-auto rounded-tl-none"
      }`}
    >
      <p className="text-gray-800">{message}</p>
      <span className="text-xs text-gray-500 mt-1 block">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
};

export default MessageBubble;