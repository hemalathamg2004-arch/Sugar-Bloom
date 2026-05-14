import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';
import './CSS/VoiceAssistant.css';

const VoiceAssistant = () => {
  const { foodData, updateQuantity, login, logout, Togg, setTogg } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  
  // Native Speech Recognition Reference
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        if (event.error === 'not-allowed') {
          setAssistantResponse('Permission Error: Mic access is blocked.');
        } else {
          setAssistantResponse(`Error: ${event.error}`);
        }
        setIsListening(false);
      };
    }
  }, []);

  // Process transcript when listening stops
  useEffect(() => {
    if (!isListening && transcript.trim() && !isProcessing) {
        processVoiceCommand(transcript.trim());
    }
  }, [isListening, transcript]);

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speakResponse = useCallback((text) => {
    if (!text || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleCommand = useCallback(async (commandData) => {
    switch (commandData.command) {
      case 'FILTER':
        navigate('/');
        setTimeout(() => {
          const itemsSection = document.getElementById('items');
          if (itemsSection) itemsSection.scrollIntoView({ behavior: 'smooth' });
          const btns = document.querySelectorAll('.category-btn');
          btns.forEach(btn => {
            if (btn.textContent.toLowerCase() === (commandData.category || '').toLowerCase()) btn.click();
          });
        }, 500);
        break;
      case 'ORDER':
        if (commandData.items) {
          for (const item of commandData.items) {
            const food = foodData.find(f => (f.FoodName || f.foodname || '').toLowerCase().includes(item.name.toLowerCase()));
            if (food) await updateQuantity(food.FoodID || food.foodid, item.quantity || 1);
          }
        }
        break;
      case 'MOOD_REC':
        document.body.className = '';
        document.body.classList.add(`mood-aura-${commandData.mood?.toLowerCase() || 'happy'}`);
        navigate('/');
        
        // Scroll to and highlight the items
        setTimeout(() => {
          if (commandData.items && commandData.items.length > 0) {
            const firstItemName = commandData.items[0].toLowerCase();
            const allCards = document.querySelectorAll('.card');
            let foundElement = null;

            allCards.forEach(card => {
              const title = card.querySelector('.card-title')?.textContent?.toLowerCase() || '';
              if (title.includes(firstItemName)) {
                foundElement = card;
                card.style.transition = 'all 0.5s ease';
                card.style.transform = 'scale(1.08)';
                card.style.boxShadow = '0 0 30px #ff69b4';
                card.style.borderColor = '#ff69b4';
                
                // Remove highlight after 5 seconds
                setTimeout(() => {
                  card.style.transform = 'scale(1)';
                  card.style.boxShadow = '';
                  card.style.borderColor = '';
                }, 5000);
              }
            });

            if (foundElement) {
              foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }, 800);
        break;
      case 'LOGOUT':
        await logout();
        break;
      default: break;
    }
  }, [navigate, foodData, updateQuantity, logout]);

  const processVoiceCommand = async (text) => {
    setIsProcessing(true);
    setAssistantResponse('Thinking...');
    try {
      const res = await fetch('https://sugar-bloom.onrender.com/voice/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text }),
      });
      const data = await res.json();
      if (data.aiResponse) {
        setAssistantResponse(data.aiResponse.response);
        speakResponse(data.aiResponse.response);
        await handleCommand(data.aiResponse);
      }
    } catch (err) {
      console.error("Mic API Error:", err);
      setAssistantResponse(`Network Error: ${err.message}. Try again.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const startListening = async () => {
    if (!recognitionRef.current) {
      setAssistantResponse('Browser not supported. Use Chrome.');
      return;
    }
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setTranscript('');
      setAssistantResponse('Listening...');
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      setAssistantResponse('Mic Error: Permission denied.');
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  if (!Togg) {
    return (
      <div className="voice-assistant-floating" onClick={() => setTogg(true)}>
        <button className="floating-voice-button">🎤</button>
      </div>
    );
  }

  return (
    <div className="voice-assistant-panel">
      <div className="voice-header">
        <h3>🎤 Sugar Bloom AI <span style={{fontSize: '10px', background: 'white', color: '#ff69b4', padding: '2px 5px', borderRadius: '4px', marginLeft: '10px'}}>NEW VERSION 2.0</span></h3>
        <button className="close-btn" onClick={() => setTogg(false)}>✕</button>
      </div>
      
      <div className="voice-main">
        <button 
          className={`mic-btn ${isListening ? 'active' : ''}`} 
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? '🛑 Stop' : '🎤 Start'}
        </button>
        
        {isListening && (
          <div className="audio-visualizer">
            <div className="bar"></div><div className="bar"></div><div className="bar"></div>
          </div>
        )}
        
        <div className="transcript-box">
          <p className="label">You:</p>
          <p className="text">{transcript || '...'}</p>
        </div>
        
        <div className="response-box">
          <p className="label">Assistant:</p>
          <p className="text">{assistantResponse || 'How can I help?'}</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
