const MessageBubble = ({ message, isSent }) => {
  return (
    <div
      className={`max-w-[85%] md:max-w-[70%] p-2 rounded-lg animate-fade-in ${
        isSent
          ? "bg-messageblue/80 ml-auto rounded-tr-none"
          : "bg-[#2c3544]/50 mr-auto rounded-tl-none"
      }`}
    >
      <p className="text-gray-200 text-sm break-words">{message}</p>
      <span className="text-[10px] text-gray-400 mt-1 block">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
};

export default MessageBubble;