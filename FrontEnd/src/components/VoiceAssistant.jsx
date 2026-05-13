import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../context/GlobalStateContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './CSS/Voice.css';

const playAudioFromText = async (text) => {
  const encodedText = encodeURIComponent(text);
  const googleTTSUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodedText}&tl=en/`;
  const audio = new Audio(googleTTSUrl);
  audio.crossOrigin = 'anonymous';
  return new Promise((resolve, reject) => {
    audio.onended = resolve;
    audio.onerror = reject;
    audio.play().catch(reject);
  });
};

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const { Togg, setTogg, updateQuantity, logout, login, foodData } = useContext(GlobalStateContext);

  const [isListening, setIsListening] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechMethod, setSpeechMethod] = useState('native');
  const [hasGreeted, setHasGreeted] = useState(false);
  const [loginStep, setLoginStep] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [transcriptTimeout, setTranscriptTimeout] = useState(null);
  const [processedCommands, setProcessedCommands] = useState([]);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      setSpeechMethod(voices.length > 0 ? 'native' : 'google');
    } else {
      setSpeechMethod('google');
    }

    if (!hasGreeted && !Togg) {
      setTimeout(() => {
        const greeting = "Hello! I am your voice assistant. How can I help you today?";
        setAssistantResponse(greeting);
        speakResponse(greeting);
        setHasGreeted(true);
      }, 1000);
    }
  }, []); 

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speakResponse = useCallback(async (text) => {
    setIsSpeaking(true);
    try {
      if (speechMethod === 'native') {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        utterance.lang = 'en-IN';
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
          setIsSpeaking(false);
          setSpeechMethod('google');
          speakResponse(text);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        await playAudioFromText(text).catch(console.error);
        setIsSpeaking(false);
      }
    } catch {
      setIsSpeaking(false);
    }
  }, [speechMethod]);

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('https://sugar-bloom.onrender.com/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user);
        speakResponse('Login successful. How can I help you?');
      } else {
        speakResponse('Login failed. Please try again.');
      }
    } catch {
      speakResponse('Login failed. Please try again.');
    } finally {
      setLoginStep(null);
      setLoginEmail('');
    }
  };

  const handleCommand = useCallback(async (commandData) => {
    switch (commandData.command) {
      case 'FILTER':
        navigate('/');
        setTimeout(() => {
          document.getElementById('items')?.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const btns = document.querySelectorAll('.category-btn');
            for (const btn of btns) {
              if (btn.textContent === commandData.category) {
                btn.click();
                break;
              }
            }
          }, 300);
        }, 300);
        break;

      case 'NAVIGATE':
        navigate(commandData.path);
        if (commandData.path === '/#items') {
          setTimeout(() => {
            document.getElementById('items')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
        break;

      case 'ORDER':
        if (commandData.items?.length) {
          for (const item of commandData.items) {
            const foodItem = foodData.find(f =>
              f.FoodName.toLowerCase().includes(item.name.toLowerCase())
            );
            if (foodItem) {
              for (let i = 0; i < item.quantity; i++) {
                await updateQuantity(foodItem.FoodID, 1);
              }
            }
          }
        }
        break;

      case 'REMOVE':
        if (commandData.items?.length) {
          for (const item of commandData.items) {
            const foodItem = foodData.find(f =>
              f.FoodName.toLowerCase().includes(item.name.toLowerCase())
            );
            if (foodItem) {
              for (let i = 0; i < item.quantity; i++) {
                await updateQuantity(foodItem.FoodID, -1);
              }
            }
          }
        }
        break;

      case 'MOOD_REC':
        // Apply Mood Aura background
        const moodColors = {
          'happy': 'mood-aura-happy',
          'celebrating': 'mood-aura-celebrating',
          'stressed': 'mood-aura-stressed',
          'sad': 'mood-aura-sad',
          'energetic': 'mood-aura-energetic',
          'romantic': 'mood-aura-romantic',
          'cozy': 'mood-aura-cozy',
        };
        // Remove any existing mood aura
        document.body.classList.forEach(cls => {
          if (cls.startsWith('mood-aura-')) document.body.classList.remove(cls);
        });
        // Apply new mood aura
        const mood = (commandData.mood || '').toLowerCase();
        const auraClass = moodColors[mood] || 'mood-aura-happy';
        document.body.classList.add(auraClass);
        // Remove aura after 15 seconds
        setTimeout(() => {
          document.body.classList.remove(auraClass);
        }, 15000);

        // Navigate to menu to show items
        navigate('/#items');

        if (commandData.items?.length) {
          const itemName = commandData.items[0];
          const foodItem = foodData.find(f =>
            f.FoodName.toLowerCase().includes(itemName.toLowerCase())
          );
          if (foodItem) {
            // Highlight the item visually after a small delay for scroll
            setTimeout(() => {
              const cards = document.querySelectorAll('.card');
              cards.forEach(card => {
                const title = card.querySelector('.card-title')?.textContent;
                if (title && title.toLowerCase().includes(itemName.toLowerCase())) {
                  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  card.classList.add('ai-highlight');
                  setTimeout(() => card.classList.remove('ai-highlight'), 15000);
                }
              });
            }, 500);
          }
        }
        break;

      case 'LOGOUT':
        await logout();
        speakResponse('Logged out successfully');
        break;

      default:
        break;
    }
  }, [navigate, foodData, updateQuantity, logout]);

  const processVoiceCommand = useCallback(async (command) => {
    setIsProcessing(true);
    try {
      const res = await fetch('https://sugar-bloom.onrender.com/voice/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: command }),
      });
      const data = await res.json();

      if (data.aiResponse) {
        setAssistantResponse(data.aiResponse.response);
        speakResponse(data.aiResponse.response);

        if (data.aiResponse.command === 'NAVIGATE' && data.aiResponse.page === 'login') {
          setLoginStep('awaiting_email');
          speakResponse('Please say your email');
        } else {
          await handleCommand(data.aiResponse);
        }
      } else {
        setAssistantResponse('Sorry, I encountered an error.');
        speakResponse('Sorry, I encountered an error.');
      }
    } catch {
      setAssistantResponse('Sorry, I could not connect to the server.');
      speakResponse('Sorry, I could not connect to the server.');
    } finally {
      setIsProcessing(false);
    }
  }, [speakResponse, handleCommand]);

  const processTranscript = useCallback(async (text) => {
    if (!text) return;
    
    // Clear transcript immediately so we don't process it twice
    resetTranscript();

    if (loginStep === 'awaiting_email') {
      setLoginEmail(text);
      setLoginStep('awaiting_password');
      speakResponse('Please say your password');
      return;
    }
    if (loginStep === 'awaiting_password') {
      await handleLogin(loginEmail, text);
      return;
    }

    await processVoiceCommand(text);
  }, [loginStep, loginEmail, speakResponse, processVoiceCommand, resetTranscript]);

  useEffect(() => {
    if (!transcript || !isListening) return;
    if (transcriptTimeout) clearTimeout(transcriptTimeout);

    const timeout = setTimeout(() => processTranscript(transcript), 2000);
    setTranscriptTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [transcript, isListening]); 

  useEffect(() => {
    if (!listening && transcript && isListening) {
      const timer = setTimeout(stopListening, 1000);
      return () => clearTimeout(timer);
    }
  }, [listening, transcript, isListening]); 

  const startListening = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsListening(true);
    resetTranscript();
    setAssistantResponse('Listening...');
    SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    if (transcript && !processedCommands.includes(transcript)) {
      processTranscript(transcript);
    }
  };

  const openAssistant = () => setTogg(true);

  const closeAssistant = () => {
    window.speechSynthesis?.cancel();
    setTogg(false);
    setIsListening(false);
    setAssistantResponse('');
    setProcessedCommands([]);
    setLoginStep(null);
    setLoginEmail('');
    resetTranscript();
  };

  if (!Togg) {
    return (
      <div className="voice-assistant-floating">
        <button className="floating-voice-button" onClick={openAssistant} title="Open Voice Assistant">
          <span className="mic-icon">🎤</span>
          {isSpeaking && <span className="floating-pulse"></span>}
        </button>
        {isSpeaking && <div className="floating-speaking-indicator">🔊 Speaking...</div>}
      </div>
    );
  }

  return (
    <div className="voice-assistant-panel">
      <div className="voice-header">
        <h3>🎤 Voice Assistant</h3>
        {speechMethod === 'google' && (
          <p className="voice-subtitle">(Using Google TTS)</p>
        )}
      </div>

      <div className="voice-controls">
        <button
          className={`listen-button ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
        >
          {isListening ? (
            <><span className="pulse-icon"></span>Listening... Click to Stop</>
          ) : isProcessing ? 'Processing...' : '🎤 Start Voice Command'}
        </button>

        {isListening && (
          <div className="listening-indicator">
            <div className="sound-wave">
              {[...Array(5)].map((_, i) => <div key={i} className="bar"></div>)}
            </div>
            <span>Speak now...</span>
          </div>
        )}

        {isProcessing && (
          <div className="processing-indicator">
            <div className="spinner"></div>
            Processing your command...
          </div>
        )}
      </div>

      {transcript && (
        <div className="voice-transcript">
          <div className="transcript-label">You said:</div>
          <div className="transcript-text">"{transcript}"</div>
        </div>
      )}

      {assistantResponse && (
        <div className="assistant-response">
          <div className="response-label">Assistant:</div>
          <div className="response-text">{assistantResponse}</div>
          {isSpeaking && (
            <div className="speaking-indicator">
              <span className="sound-icon">🔊</span>
              {speechMethod === 'google' ? 'Playing...' : 'Speaking...'}
            </div>
          )}
        </div>
      )}

      <div className="voice-tips">
        <small>
          💡 Try saying: "Go to menu", "Show cakes", "Add 3 cupcakes", "Go to cart", "Login", "Logout"
        </small>
      </div>

      <button className="close-button" onClick={closeAssistant}>✕</button>
    </div>
  );
};

export default VoiceAssistant;
