import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeView from './WelcomeView';
import ChatArea from './ChatArea';
import { FaMicrophone, FaBars } from 'react-icons/fa';
import { IoSend, IoChevronDown } from 'react-icons/io5';

const MainPanel = ({ messages = [], setMessages, setHistory, isSidebarOpen, setIsSidebarOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('English to Garhwali');
  const [subGreeting, setSubGreeting] = useState('How can I help you today?');

  const dynamicPhrases = [
    'How can I help you today?',
    'What would you like to translate or discover today?',
    'Ask me anything in Garhwali or English.',
    'Let’s craft, translate, or learn something new today.',
    'Need help with vocabulary, grammar, or regional phrasing?',
    'Explore the depth of the Garhwali language with me.',
    'Tell me what you want to communicate, and let’s translate it.',
    'Looking to convert expressions or learn idioms? Type away.',
    'I’m ready. What are we translating or exploring right now?',
    'Type a phrase here to see its local dialect equivalent.',
    'Let’s practice conversations or build clear vocabulary lists.',
    'Curious about a specific word or regional sentence pattern?',
    'What ideas can I help you write down or translate today?',
    'Bring your text or queries; let’s map them out beautifully.',
    'Ready for your next linguistic translation. What have you got?'
  ];

  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    const randomPhrase = dynamicPhrases[Math.floor(Math.random() * dynamicPhrases.length)];
    setSubGreeting(randomPhrase);
  }, [safeMessages.length]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      mode: selectedOption
    };

    const updatedMessages = [...safeMessages, userMessage];
    if (typeof setMessages === 'function') {
      setMessages(updatedMessages);
    }
    setInputText('');
    setIsLoading(true);

    if (typeof setHistory === 'function') {
      setHistory(prev => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const summaryText = inputText.length > 28 ? `${inputText.substring(0, 28)}...` : inputText;
        if (!safePrev.some(item => item.text === summaryText)) {
          return [{ id: Date.now().toString(), text: summaryText }, ...safePrev];
        }
        return safePrev;
      });
    }

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `This is a simulated AI response for your "${selectedOption}" request: "${userMessage.text}"`
      };
      if (typeof setMessages === 'function') {
        setMessages([...updatedMessages, botMessage]);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderInputBar = () => (
    /* Length adjusted to max-w-2xl for a compact, Gemini-like footprint */
    <div className="w-full max-w-2xl mt-10 px-4 flex justify-center">
      <div className="w-full bg-[#13171e] border border-slate-800/90 rounded-2xl flex items-center gap-4 pl-6 pr-3 py-2.5 shadow-2xl transition-all duration-300 ease-in-out focus-within:border-emerald-500/50 focus-within:ring-4 focus-within:ring-emerald-500/5 focus-within:shadow-[0_0_40px_rgba(16,185,129,0.05)] hover:border-slate-700/80">
        
        <div className="relative flex items-center shrink-0 group">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="appearance-none bg-transparent font-bold border-r border-slate-800 pr-7 pl-1 py-1 text-xs text-slate-400 group-hover:text-slate-100 cursor-pointer outline-none transition-colors duration-300 ease-in-out"
          >
            {/* Added system-level dark background and dark text colors to keep options visible inside native dropdown bounds */}
            <option className="bg-[#13171e] text-slate-200" value="English to Garhwali">English to Garhwali</option>
            <option className="bg-[#13171e] text-slate-200" value="Garhwali to English">Garhwali to English</option>
            <option className="bg-[#13171e] text-slate-200" value="Text to Speech">Text to Speech</option>
            <option className="bg-[#13171e] text-slate-200" value="Speech to Text">Speech to Text</option>
          </select>
          <IoChevronDown className="pointer-events-none absolute right-2.5 text-[10px] text-slate-500 group-hover:text-slate-200 transition-colors duration-300" />
        </div>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent outline-none text-sm text-slate-100 placeholder-slate-600 px-1 transition-all"
        />

        <div className="flex items-center gap-2 shrink-0">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#1c212b', borderColor: '#475569' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-2 rounded-xl bg-slate-800/30 text-slate-400 hover:text-slate-100 border border-slate-800/40 transition-all duration-300 cursor-pointer"
          >
            <FaMicrophone className="text-xs" />
          </motion.button>

          <motion.button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            whileHover={inputText.trim() ? { scale: 1.05, boxShadow: "0 0 20px rgba(0, 196, 141, 0.3)" } : {}}
            whileTap={inputText.trim() ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
            className={`p-2 rounded-xl transition-all duration-300 cursor-pointer ${
              inputText.trim()
                ? 'bg-[#00c48d] text-slate-950 hover:bg-[#00e0a1]'
                : 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
            }`}
          >
            <IoSend className="text-xs" />
          </motion.button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex-1 h-full flex flex-col relative bg-[#0c0f14] overflow-hidden transition-colors duration-500 ease-in-out">
      <div className="w-full bg-gradient-to-r from-[#0f131a] to-[#0d1117] border-b border-slate-900 h-20 flex items-center justify-between px-8 z-20 relative shadow-lg">
        <div className="flex items-center gap-6">
          <AnimatePresence>
            {!isSidebarOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 rounded-xl bg-[#13171e] hover:bg-[#1c212b] border border-slate-800 text-slate-400 hover:text-slate-100 shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.08, borderColor: '#475569', boxShadow: "0 0 15px rgba(255,255,255,0.03)" }}
                whileTap={{ scale: 0.92 }}
              >
                <FaBars className="text-xs" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.div 
            className="flex items-center gap-3 select-none px-2 py-1 rounded-xl transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-xl font-black bg-gradient-to-r from-[#00c48d] via-[#22d3ee] to-[#8b5cf6] bg-clip-text text-transparent tracking-wider filter drop-shadow-[0_2px_10px_rgba(0,196,141,0.15)]">
              <span className="font-sans mr-1.5">मि</span> Garhwali
            </span>
          </motion.div>
        </div>

        <div>
          <motion.button 
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(0, 196, 141, 0.12)', borderColor: '#00c48d', boxShadow: '0 0 20px rgba(0, 196, 141, 0.15)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-2 rounded-xl text-xs font-bold border border-slate-800 text-[#00c48d] bg-slate-900/40 tracking-wider transition-all duration-300 cursor-pointer"
          >
            About Us
          </motion.button>
        </div>
      </div>

      <div className="w-full flex-1 overflow-hidden relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {safeMessages.length === 0 ? (
            <motion.div
              key="welcome-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full h-full flex flex-col justify-center items-center px-6 pb-16"
            >
              <WelcomeView subGreeting={subGreeting} />
              {renderInputBar()}
            </motion.div>
          ) : (
            <motion.div
              key="chat-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full flex flex-col justify-between pb-8"
            >
              <ChatArea messages={safeMessages} isLoading={isLoading} />
              <div className="w-full flex flex-col items-center">
                {renderInputBar()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainPanel;