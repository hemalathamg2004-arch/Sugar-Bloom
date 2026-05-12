import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalStateContext';
import Navbar from './components/Navbar';
import VoiceAssistant from './components/VoiceAssistant';
import Footer from './components/Footer';
import './theme.css';

const App = () => {

  useEffect(() => {
    console.log("React is running");

    fetch("http://127.0.0.1:8000/")
      .then(res => res.json())
      .then(data => {
        console.log("DATA FROM BACKEND:", data);
      })
      .catch(err => {
        console.log("ERROR:", err);
      });

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