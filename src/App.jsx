import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ChakraProvider } from '@chakra-ui/react';
import ChatbotButton from './ChatbotButton';
import './App.css'

function App() {
  return (
    <ChakraProvider>
      <ChatbotButton />
    </ChakraProvider>
  )
}

export default App
