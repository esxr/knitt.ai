import React, { createContext, useContext, useState, useEffect } from 'react';
import preloadedMessages from '../preloadedMessages'; // Import the preloaded messages

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [hiddenMessages, setHiddenMessages] = useState([]);
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    // Get the script tag with the API key
    const scriptTag = document.querySelector('script[data-api-key]');
    if (scriptTag) {
      const key = scriptTag.getAttribute('data-api-key');
      setApiKey(key);
    } else {
      console.error('API key not found. Please include the data-api-key attribute in the script tag.');
      return;
    }
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    // Use the preloaded messages directly from the module
    const [systemMessage, ...rest] = preloadedMessages;
    setMessages(rest);

    // Call the API with the initial system message
    const fetchInitialMessage = async () => {
      const requestBody = {
        model: 'gpt-4o',
        messages: [systemMessage]
      };

      try {
        const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(requestBody)
        });

        const apiData = await apiResponse.json();
        const botInitialMessage = apiData.choices[0].message;

        // Store the initial messages and response without displaying them
        setHiddenMessages([systemMessage, botInitialMessage]);
        setIsInitialLoaded(true);
      } catch (error) {
        console.error('Error fetching initial message:', error);
      }
    };

    fetchInitialMessage();
  }, [apiKey]);

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
          'Authorization': `Bearer ${apiKey}`
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
