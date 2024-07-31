import React, { useState } from 'react';
import { Box, Input, VStack, IconButton, Text, HStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChatIcon, CloseIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useChatbot } from '../context/ChatbotContext';

const ChatbotButton = () => {
  const { isOpen, toggleChat, messages, sendMessage, isInitialLoaded } = useChatbot();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box position="fixed" bottom="4" right="4" zIndex="1000">
      {!isOpen && (
        <IconButton onClick={toggleChat} colorScheme="blue" borderRadius="full" p="4" icon={<ChatIcon />} />
      )}
      {isOpen && (
        <Box
          bg="white"
          shadow="md"
          p="4"
          borderRadius="md"
          width="300px"
          height="400px"
          position="fixed"
          bottom="4"
          right="4"
          display="flex"
          flexDirection="column"
        >
          <VStack spacing="4" flex="1" overflowY="auto">
            <Box width="full" textAlign="right">
              <IconButton
                icon={<CloseIcon />}
                onClick={toggleChat}
                colorScheme="red"
                size="sm"
                borderRadius="full"
              />
            </Box>
            {isInitialLoaded && (
              <VStack spacing="2" align="stretch" flex="1">
                {messages.map((message, index) => (
                  <HStack
                    key={index}
                    justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    <Box
                      bg={message.role === 'user' ? 'blue.500' : 'gray.300'}
                      color={message.role === 'user' ? 'white' : 'black'}
                      px="4"
                      py="2"
                      borderRadius="md"
                    >
                      <Text>{message.content}</Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            )}
          </VStack>
          <Box mt="4">
            <InputGroup>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                onKeyPress={handleKeyPress}
              />
              <InputRightElement>
                <IconButton
                  icon={<ArrowForwardIcon />}
                  colorScheme="blue"
                  onClick={handleSendMessage}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatbotButton;
