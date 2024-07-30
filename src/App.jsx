import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
