import React, { useState } from 'react';
import { Button, Box, Textarea, VStack, IconButton } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box position="fixed" bottom="4" right="4" zIndex="1000">
      {!isOpen && (
        <Button onClick={toggleChat} colorScheme="blue" borderRadius="full" p="4">
          <ChatIcon />
        </Button>
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
        >
          <VStack spacing="4">
            <Box width="full" textAlign="right">
              <IconButton
                icon={<CloseIcon />}
                onClick={toggleChat}
                colorScheme="red"
                size="sm"
                borderRadius="full"
              />
            </Box>
            <Textarea placeholder="Type your message here..." />
            <Button colorScheme="blue" width="full">
              Send
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default ChatbotButton;
