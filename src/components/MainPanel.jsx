import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeView from './WelcomeView';
import ChatArea from './ChatArea';
import logoImg from './logo.jpg';

const MainPanel = ({ viewState, setViewState, messages, setMessages, setHistory, isSidebarOpen, setIsSidebarOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('English to Garhwali');

  const handleStartChat = (option) => {
    setSelectedOption(option);
    setViewState('chatting');
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      mode: selectedOption
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    setHistory(prev => {
      const summaryText = inputText.length > 28 ? `${inputText.substring(0, 28)}...` : inputText;
      if (!prev.some(item => item.text === summaryText)) {
        return [{ id: Date.now().toString(), text: summaryText }, ...prev];
      }
      return prev;
    });

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `This is a simulated AI response for your "${selectedOption}" request: "${userMessage.text}"`
      };
      setMessages([...updatedMessages, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col relative bg-[#070b12] overflow-hidden">
      
      {/* Dynamic Background Controller with Enhanced Brightness Filter */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {viewState === 'welcome' ? (
            /* Home Screen Layout: High-Visibility Asymmetric Branding */
            <motion.div 
              key="welcome-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-y-0 right-0 w-[45%] hidden md:flex items-center justify-end pr-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b12] via-[#070b12]/10 to-transparent z-10" />
              <img 
                src={logoImg} 
                alt="Mi-Garhwali Branding" 
                className="h-[80%] max-h-[580px] object-contain opacity-[0.45] filter brightness-125 saturate-150 drop-shadow-[0_0_50px_rgba(0,196,141,0.15)] select-none"
              />
            </motion.div>
          ) : (
            /* Chat Interface Layout: Immersive Interactive Cyber Matrix Grid */
            <motion.div 
              key="chat-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Premium Cyber Dot-Matrix Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.08] filter invert brightness-200" 
                style={{ 
                  backgroundImage: 'radial-gradient(#00c48d 1px, transparent 1px)', 
                  backgroundSize: '24px 24px' 
                }} 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#070b12] via-transparent to-[#070b12]" />
              
              {/* Central Premium Ambient Watermark Layer */}
              <img 
                src={logoImg} 
                alt="" 
                className="w-[55%] max-w-xl object-contain opacity-[0.12] filter brightness-110 saturate-125 blur-[0.5px] select-none"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modern High-End Glassmorphism Navbar Track */}
      <header className="w-full h-16 border-b border-slate-900/60 bg-[#0c1220]/30 backdrop-blur-xl flex items-center justify-between px-6 z-20 shrink-0 box-border">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="px-3.5 py-2 rounded-xl bg-slate-950/40 hover:bg-[#00c48d] hover:text-slate-950 border border-slate-800/40 text-slate-300 transition-all text-xs font-bold tracking-wide"
          >
            {isSidebarOpen ? '◀ Hide Menu' : '▶ Show Menu'}
          </button>
          
          {/* Futuristic Micro-Orbit Neon Branding Ring */}
          <div className="relative flex items-center justify-center w-10 h-10">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#00c48d]/40"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-1 rounded-full border border-dotted border-purple-500/60"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            />
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-6 h-6 rounded-full object-cover z-10 shadow-[0_0_20px_rgba(0,196,141,0.6)] border border-[#00c48d]/30" 
            />
          </div>

          {viewState === 'chatting' && (
            <div className="flex items-center border-l border-slate-800/60 pl-4 hidden sm:flex">
              <span className="text-xs font-black text-[#00c48d] px-3 py-1 rounded-lg bg-[#00c48d]/10 border border-[#00c48d]/20 tracking-wide shadow-[0_0_15px_rgba(0,196,141,0.05)]">
                {selectedOption}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {viewState === 'chatting' && (
            <select
              className="text-xs px-3 py-2 bg-slate-950/60 border border-slate-800/60 rounded-xl text-slate-200 outline-none cursor-pointer focus:border-[#00c48d]/50 transition-all font-semibold"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="English to Garhwali">English to Garhwali</option>
              <option value="Garhwali to English">Garhwali to English</option>
              <option value="Text to Speech">Text to Speech</option>
              <option value="Speech to Text">Speech to Text</option>
            </select>
          )}
          <button className="p-2 text-slate-400 hover:text-slate-200 relative bg-slate-950/40 rounded-xl border border-slate-800/50 transition-colors">
            <span className="text-xs">🔔</span>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00c48d] rounded-full animate-ping"></span>
          </button>
          <button className="text-xs font-bold px-4 py-2 rounded-xl border border-[#00c48d]/30 bg-[#00c48d]/10 text-[#00c48d] hover:bg-[#00c48d] hover:text-slate-950 transition-all">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Container Viewport Workspace Frame */}
      <div className="flex-1 overflow-hidden w-full relative z-10 bg-transparent">
        <AnimatePresence mode="wait">
          {viewState === 'welcome' ? (
            <WelcomeView onStartChat={handleStartChat} />
          ) : (
            <div className="h-full pb-36 bg-transparent">
              <ChatArea messages={messages} isLoading={isLoading} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Modern Chat Entry Deck */}
      {viewState === 'chatting' && (
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#070b12] via-[#070b12]/95 to-transparent pointer-events-none z-20">
          <div className="w-full max-w-3xl mx-auto bg-[#0c1220]/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex items-center gap-3 p-2.5 pointer-events-auto focus-within:border-[#00c48d]/50 focus-within:shadow-[0_0_35px_rgba(0,196,141,0.06)] transition-all box-border">
            <input
              type="text"
              className="flex-1 bg-transparent py-4 px-4 text-sm text-slate-100 outline-none placeholder-slate-500 font-semibold tracking-wide"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask Mi-Garhwali AI (${selectedOption.toLowerCase()})...`}
            />
            <motion.button
              className={`text-sm px-7 py-4 rounded-xl font-black tracking-wide transition-all ${
                inputText.trim() === '' 
                  ? 'bg-slate-800/40 text-slate-500 cursor-not-allowed border border-transparent' 
                  : 'bg-[#00c48d] text-slate-950 hover:bg-[#00e0a1] shadow-lg shadow-[#00c48d]/20'
              }`}
              whileHover={inputText.trim() !== '' ? { scale: 1.02 } : {}}
              whileTap={inputText.trim() !== '' ? { scale: 0.98 } : {}}
              onClick={handleSendMessage}
              disabled={inputText.trim() === ''}
            >
              Send
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPanel;