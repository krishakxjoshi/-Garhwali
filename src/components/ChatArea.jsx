import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatArea = ({ messages, isLoading, onPromptSelect }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Modern prompt cards to fill the initial empty chat view beautifully
  const starterPrompts = [
    { label: "Translate Phrasing", text: "How do you say 'Wishing you a beautiful day ahead' in Garhwali?", icon: "🗣️" },
    { label: "Cultural Idioms", text: "What are some traditional Garhwali proverbs about mountains?", icon: "🏔️" },
    { label: "Vocabulary Check", text: "Give me common vocabulary words used for daily conversations.", icon: "📚" },
    { label: "Pronunciation Guide", text: "Explain the phonetic structure of regional Garhwali dialects.", icon: "🎙️" }
  ];

  return (
    <div className="h-full w-full relative overflow-hidden bg-transparent">
      
      {/* Cyber Dot-Matrix Overlay Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.04] filter invert brightness-200 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#00c48d 1.5px, transparent 1.5px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="h-full overflow-y-auto px-4 py-6 sm:px-8 relative z-10 custom-scrollbar pb-32 box-border">
        
        {/* Empty State: Rendered only when there are zero messages */}
        {messages.length === 0 && (
          <div className="max-w-3xl mx-auto h-full flex flex-col justify-center pt-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-black bg-gradient-to-r from-[#00c48d] to-cyan-400 bg-clip-text text-transparent tracking-wide mb-2">
                New Conversation Matrix
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Select an engineering prompt profile below or type directly into the input deck to execute real-time language syntheses.
              </p>
            </motion.div>

            {/* Premium Interactive Node Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {starterPrompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group border border-slate-900 bg-[#0c1220]/40 hover:bg-[#00c48d]/5 hover:border-[#00c48d]/40 backdrop-blur-md rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between h-28 box-border"
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onPromptSelect && onPromptSelect(prompt.text)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase group-hover:text-[#00c48d] transition-colors">
                      {prompt.label}
                    </span>
                    <span className="text-sm group-hover:scale-110 transition-transform">{prompt.icon}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    "{prompt.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Message Bubble Engine Layout Frame */}
        {messages.length > 0 && (
          <div className="space-y-6 max-w-3xl mx-auto w-full">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-xl flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    {isUser && msg.mode && (
                      <span className="text-[10px] text-[#00c48d] font-black uppercase tracking-widest mb-1.5 mr-1 drop-shadow-[0_0_10px_rgba(0,196,141,0.2)]">
                        ⚡ {msg.mode}
                      </span>
                    )}

                    <div
                      className={`p-4 rounded-2xl shadow-xl text-sm leading-relaxed border backdrop-blur-md transition-all ${
                        isUser
                          ? 'bg-[#00c48d]/10 text-slate-100 border-[#00c48d]/30 rounded-tr-none shadow-[#00c48d]/5'
                          : 'bg-slate-950/50 text-slate-200 border-slate-900/60 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Gemini Kinetic Wave Processing State Block */}
        {isLoading && (
          <div className="max-w-3xl mx-auto w-full mt-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 max-w-md w-full pl-2 transition-all"
            >
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-[#00c48d] rounded-full animate-pulse" />
                <span>Mi-Garhwali Core Synthesis</span>
              </div>

              {/* Kinetic Fluid Gradient Bar Track */}
              <div className="relative w-full h-[6px] bg-slate-900/60 rounded-full overflow-hidden border border-slate-800/40 backdrop-blur-sm">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 w-[40%] rounded-full bg-gradient-to-r from-transparent via-[#00c48d] to-[#06b6d4]"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 w-[30%] rounded-full bg-gradient-to-r from-transparent via-[#8b5cf6] to-[#00c48d] opacity-70"
                  animate={{ x: ['-150%', '350%'] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatArea;