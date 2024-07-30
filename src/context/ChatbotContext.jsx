import React, { createContext, useContext, useState } from 'react';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChat }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  return useContext(ChatbotContext);
};
