export const saveChatSession = (session, messages) => {
    const data = { session, messages, timestamp: new Date().toISOString() };
    localStorage.setItem(`chat-${session}`, JSON.stringify(data));
  };
  
  export const loadChatSession = (session) => {
    const data = localStorage.getItem(`chat-${session}`);
    return data ? JSON.parse(data).messages : [];
  };
  