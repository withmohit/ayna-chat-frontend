import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { saveChatSession, loadChatSession } from './localStorage';

const token = localStorage.getItem('jwtToken');
const socket = io('https://ayna-chat-backend-17qp.onrender.com/',{
  auth: {token},
});

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [session, setSession] = useState('general');
  const [allMessages, setAllMessages] = useState({ general: [] });

  useEffect(() => {
    const savedMessages = loadChatSession(session);
    if (savedMessages.length) {
      setAllMessages((prev) => ({ ...prev, [session]: savedMessages }));
    }
  }, [session]);

  useEffect(() => {
    saveChatSession(session, allMessages[session] || []);
  }, [allMessages, session]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setAllMessages((prev) => ({
        ...prev,
        [session]: [...(prev[session] || []), { text: msg, sender: 'server' }],
      }));
    });

    return () => {
      socket.off('message');
    };
  }, [session]);

  const sendMessage = () => {
    if (message) {
      setAllMessages((prev) => ({
        ...prev,
        [session]: [...(prev[session] || []), { text: message, sender: 'user' }],
      }));
      socket.emit('message', message);
      setMessage('');
    }
  };

  const switchSession = (newSession) => {
    setSession(newSession);
    if (!allMessages[newSession]) {
      setAllMessages((prev) => ({ ...prev, [newSession]: [] }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold my-4">Chat Application</h1>
      <div className="mb-4 space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => switchSession('general')}
        >
          General
        </button>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={() => switchSession('support')}
        >
          Support
        </button>
        <button
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded"
          onClick={() => switchSession('billing')}
        >
          Billing
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Session: {session}</h2>
      <div className="w-full max-w-md border border-gray-700 rounded-lg bg-gray-800 p-4 overflow-y-auto h-80 mb-8 flex flex-col space-y-2">
        {allMessages[session]?.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-md ${
              msg.sender === 'user'
                ? 'bg-green-500 text-white self-end'
                : 'bg-gray-700 text-gray-100 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow px-4 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
