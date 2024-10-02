import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import ChatbotButton from './components/ChatbotButton';
import './App.css'
import { ChatbotProvider } from './context/ChatbotContext';

function App() {
  return (
    <ChakraProvider resetCSS={false}>
      <ChatbotProvider>
        <ChatbotButton />
      </ChatbotProvider>
    </ChakraProvider>
  )
}

export default App
