import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeView from './WelcomeView';
import ChatArea from './ChatArea';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';
import { IoSend } from 'react-icons/io5';

const MainPanel = ({ messages = [], setMessages, currentUser, isSidebarOpen, setIsSidebarOpen, onNavigateAbout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [subGreeting, setSubGreeting] = useState('How can I help you today?');
  const [isHoveredOpen, setIsHoveredOpen] = useState(false);

  const inputRef = useRef(null);
  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    const dynamicPhrases = [
      "How can I assist you with your translations today?",
      "What's on your mind? Let’s explore the Garhwali language together.",
      "I'm here to help you translate, learn, and discover.",
      "Let’s dive into language discovery—where should we begin?",
      "Ready to translate? Tell me what you need.",
      "Ask me anything to start our conversation."
    ];
    setSubGreeting(dynamicPhrases[Math.floor(Math.random() * dynamicPhrases.length)]);
  }, [safeMessages.length]);

  useEffect(() => {
    if (safeMessages.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [safeMessages.length]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now(), sender: 'user', text: inputText };
    const updatedMessages = [...safeMessages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages([
        ...updatedMessages,
        { id: Date.now() + 1, sender: 'bot', text: `This is a processed foundational response tracking prompt payload details: "${userMessage.text}"` }
      ]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div layout className="w-full flex-1 h-full flex flex-col relative bg-[#0c0f14] overflow-hidden">
      <div className="w-full bg-gradient-to-r from-[#0f131a] to-[#0d1117] border-b border-slate-900 h-20 flex items-center justify-between px-8 z-20 relative shadow-lg">
        <div className="flex items-center gap-4">
          <AnimatePresence mode="popLayout">
            {!isSidebarOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setIsHoveredOpen(true)}
                onMouseLeave={() => setIsHoveredOpen(false)}
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 rounded-xl bg-[#13171e] hover:bg-[#1c212b] border border-slate-800 text-slate-400 hover:text-slate-100 shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
              >
                {isHoveredOpen ? <LuPanelLeftOpen className="text-sm text-emerald-400" /> : <LuPanelLeftClose className="text-sm" />}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Fixed Word Spacing to be compact exactly like the chat interface logo */}
          <div className="flex items-center gap-x-1 select-none tracking-tight font-sans">
            <span className="text-xl font-bold text-[#00c48d]">मि</span>
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00c48d] via-[#a855f7] to-[#ec4899] ml-0.5">
              Garhwali
            </span>
          </div>
        </div>

        <motion.button
          onClick={onNavigateAbout}
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(0, 196, 141, 0.12)', borderColor: '#00c48d' }}
          whileTap={{ scale: 0.96 }}
          className="px-6 py-2 rounded-xl text-xs font-bold border border-slate-800 text-[#00c48d] bg-slate-900/40 tracking-wider transition-all cursor-pointer"
        >
          About Us
        </motion.button>
      </div>

      <div className="w-full flex-1 overflow-hidden relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {safeMessages.length === 0 ? (
            <motion.div key="welcome" className="w-full h-full flex flex-col justify-center items-center px-6 pb-16">
              <WelcomeView subGreeting={subGreeting} currentUser={currentUser} />

              <div className="w-full max-w-2xl mt-10 px-4 flex justify-center">
                <motion.div
                  whileHover={{
                    scale: 1.005,
                    borderColor: 'rgba(0, 196, 141, 0.35)',
                    boxShadow: '0 20px 30px -10px rgba(0,0,0,0.7), 0 0 15px rgba(0, 196, 141, 0.03)'
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-[#13171e] hover:bg-[#161b26] border border-slate-800/90 rounded-2xl flex items-center gap-4 pl-6 pr-3 py-2.5 shadow-2xl focus-within:border-emerald-500/50 focus-within:bg-[#161b26] transition-all duration-300"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent outline-none text-sm text-slate-100 placeholder-slate-600"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    whileHover={inputText.trim() ? { scale: 1.05 } : {}}
                    whileTap={inputText.trim() ? { scale: 0.95 } : {}}
                    className={`p-2 rounded-xl transition-all ${inputText.trim() ? 'bg-[#00c48d] text-slate-950 cursor-pointer' : 'bg-slate-800/40 text-slate-600'}`}
                  >
                    <IoSend className="text-xs" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="chat" className="h-full w-full flex flex-col justify-between pb-8">
              <ChatArea messages={safeMessages} isLoading={isLoading} />

              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-2xl mt-4 px-4 flex justify-center">
                  <motion.div
                    whileHover={{
                      scale: 1.005,
                      borderColor: 'rgba(0, 196, 141, 0.35)',
                      boxShadow: '0 20px 30px -10px rgba(0,0,0,0.7), 0 0 15px rgba(0, 196, 141, 0.03)'
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-[#13171e] hover:bg-[#161b26] border border-slate-800/90 rounded-2xl flex items-center gap-4 pl-6 pr-3 py-2.5 shadow-2xl focus-within:border-emerald-500/50 focus-within:bg-[#161b26] transition-all duration-300"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent outline-none text-sm text-slate-100 placeholder-slate-600"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      whileHover={inputText.trim() ? { scale: 1.05 } : {}}
                      whileTap={inputText.trim() ? { scale: 0.95 } : {}}
                      className={`p-2 rounded-xl transition-all ${inputText.trim() ? 'bg-[#00c48d] text-slate-950 cursor-pointer' : 'bg-slate-800/40 text-slate-600'}`}
                    >
                      <IoSend className="text-xs" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MainPanel;