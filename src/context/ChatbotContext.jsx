import React, { createContext, useContext, useState, useEffect } from 'react';
import preloadedMessages from '../preloadedMessages'; // Import the preloaded messages
import { fetchResponseFromOpenAI, fetchResponseFromCustomServer } from '../utils/api';
import { validateCustomApiKey } from '../utils/validation';
import { formatUserMessage } from '../utils/messageFormatting';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [hiddenMessages, setHiddenMessages] = useState([]);
  const [apiKey, setApiKey] = useState(null);
  const [isValidKey, setIsValidKey] = useState(false);
  const [isCustomKey, setIsCustomKey] = useState(false);

  useEffect(() => {
    // Get the script tag with the API keys
    const scriptTag = document.querySelector('script[data-api-key], script[data-openai-api-key]');
    if (scriptTag) {
      const openaiKey = scriptTag.getAttribute('data-openai-api-key');
      const customKey = scriptTag.getAttribute('data-api-key');
      if (openaiKey) {
        setApiKey(openaiKey);
        setIsValidKey(true); // OpenAI key doesn't need validation
      } else if (customKey) {
        console.log('Custom API key found:', customKey);
        setApiKey(customKey);
        setIsCustomKey(true); // Indicate that a custom API key is being used
      } else {
        console.error('API key not found. Please include either data-openai-api-key or data-api-key attribute in the script tag.');
        return;
      }
    } else {
      console.error('API key not found. Please include either data-openai-api-key or data-api-key attribute in the script tag.');
      return;
    }
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    const validateApiKey = async () => {
      if (!apiKey || isValidKey) return; // Skip validation if already valid or no key

      const serverUrl = import.meta.env.VITE_SERVER_URL; // Get the server URL from environment
      const isValid = await validateCustomApiKey(apiKey, serverUrl);

      if (isValid) {
        setIsValidKey(true);
      } else {
        console.error('Invalid custom API key.');
      }
    };

    if (isCustomKey) {
      validateApiKey();
    } else {
      setIsValidKey(true); // For OpenAI keys, assume valid if present
    }
  }, [apiKey, isCustomKey, isValidKey]);

  useEffect(() => {
    if (!isValidKey) return;

    const fetchInitialMessage = async () => {
      const requestBody = {
        model: 'gpt-4o',
        messages: [preloadedMessages[0]],
      };

      try {
        let apiData;
        if (isCustomKey) {
          const serverUrl = import.meta.env.VITE_SERVER_URL; // Use your server URL
          apiData = await fetchResponseFromCustomServer(apiKey, requestBody, serverUrl);
        } else {
          apiData = await fetchResponseFromOpenAI(apiKey, requestBody);
        }

        const botInitialMessage = apiData.choices[0].message;

        // Store the initial messages and response without displaying them
        setHiddenMessages([preloadedMessages[0], botInitialMessage]);
        setIsInitialLoaded(true);
      } catch (error) {
        console.error('Error fetching initial message:', error);
      }
    };

    fetchInitialMessage();
  }, [apiKey, isValidKey, isCustomKey]);

  const toggleChat = () => {
    setIsOpen((prevState) => !prevState);
  };

  const sendMessage = async (text) => {
    const userMessage = { role: 'user', content: text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const transformedMessage = formatUserMessage(text);

    const requestBody = {
      model: 'gpt-4o',
      messages: [...hiddenMessages, { role: 'user', content: transformedMessage }],
    };

    try {
      let apiData;
      if (isCustomKey) {
        const serverUrl = import.meta.env.VITE_SERVER_URL; // Use your server URL
        apiData = await fetchResponseFromCustomServer(apiKey, requestBody, serverUrl);
      } else {
        apiData = await fetchResponseFromOpenAI(apiKey, requestBody);
      }

      const botMessage = apiData.choices[0].message;

      const responseContent = JSON.parse(botMessage.content);
      const { response: botResponse, relevant_link: relevantLink } = responseContent;

      // if (relevantLink) {
      //   window.location.href = relevantLink;
      // }

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
