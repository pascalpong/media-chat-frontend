import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import ChatBody from './components/ChatBody';
import { Container } from '@mui/material';

function App() {
  return (
    <Container>
      <div className="App">
        <Nav />
        <ChatBody />
      </div>
    </Container>
  );
}

export default App;
