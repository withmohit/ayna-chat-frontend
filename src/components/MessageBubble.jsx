const MessageBubble = ({ message, isSent }) => {
  return (
    <div
      className={`max-w-[70%] p-3 rounded-lg mb-2 animate-fade-in ${
        isSent
          ? "bg-messageblue ml-auto rounded-tr-none"
          : "bg-[#2c3544] mr-auto rounded-tl-none"
      }`}
    >
      <p className="text-gray-200">{message}</p>
      <span className="text-xs text-gray-400 mt-1 block">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
};

export default MessageBubble;