import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalStateContext';
import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';
import './theme.css';

const App = () => {

  useEffect(() => {
    console.log("Sugar Bloom is running");
  }, []);

  return (
    <GlobalStateProvider>
      <Navbar />
      <Outlet />
      <VoiceAssistant />
      <Footer />
    </GlobalStateProvider>
  );
};

export default App;
