import React, { createContext, useContext, useState, useEffect } from 'react';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [hiddenMessages, setHiddenMessages] = useState([]);

  useEffect(() => {
    // Fetch preloaded messages from the JSON file
    const fetchPreloadedMessages = async () => {
      try {
        const response = await fetch('/preloadedMessages.json');
        let data = await response.json();

        // Replace <baseurl> with the actual URL
        const baseUrl = window.location.origin;
        data = data.map(message => {
          if (message.content.includes('<baseurl>')) {
            message.content = message.content.replace('<baseurl>', baseUrl);
          }
          return message;
        });

        // Separate system message
        const [systemMessage, ...rest] = data;
        setMessages(rest);

        // Call the API with the initial system message
        const requestBody = {
          model: 'gpt-4o',
          messages: [systemMessage]
        };

        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify(requestBody)
        });

        const apiData = await apiResponse.json();
        const botInitialMessage = apiData.choices[0].message;

        // Store the initial messages and response without displaying them
        setHiddenMessages([systemMessage, botInitialMessage]);
        setIsInitialLoaded(true);
      } catch (error) {
        console.error('Error fetching preloaded messages:', error);
      }
    };

    fetchPreloadedMessages();
  }, []);

  const toggleChat = () => {
    setIsOpen((prevState) => !prevState);
  };

  const sendMessage = async (text) => {
    const userMessage = { role: 'user', content: text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const transformedMessage = `This is a user query: ${text}. Find the appropriate link, and send a response like so:\n\n{\n"response": "<your_response>",\n"relevant_link": "<link_here>"\n}`;

    const requestBody = {
      model: 'gpt-4o',
      messages: [...hiddenMessages, ...messages, { role: 'user', content: transformedMessage }]
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      const botMessage = data.choices[0].message;

      const responseContent = JSON.parse(botMessage.content);
      const { response: botResponse, relevant_link: relevantLink } = responseContent;

      if (relevantLink) {
        window.location.href = relevantLink;
      }

      const displayedBotMessage = { role: 'assistant', content: botResponse };
      setMessages((prevMessages) => [...prevMessages, displayedBotMessage]);
    } catch (error) {
      console.error('Error fetching the API:', error);
      const errorMessage = { role: 'assistant', content: 'Something went wrong. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChat, messages, sendMessage, isInitialLoaded }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  return useContext(ChatbotContext);
};
