import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatArea = ({ messages, isLoading }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-10 py-8 space-y-8 max-w-6xl mx-auto w-full custom-chat-scroll bg-[#0f0a1c]">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-4xl rounded-2xl px-6 py-4 text-base shadow-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl ${
            msg.sender === 'user'
              ? 'bg-[#00c48d] text-slate-950 font-medium rounded-tr-none border border-emerald-400/30 hover:bg-[#00d69a]'
              : 'bg-[#17112a] text-slate-200 border border-purple-950/40 rounded-tl-none hover:border-purple-900/40'
          }`}>
            {msg.text}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex w-full justify-start items-start gap-4 pt-4">
          <div className="w-full max-w-xl bg-gradient-to-br from-[#17112a] via-[#120d22] to-[#0d0918] p-6 rounded-2xl border border-purple-950/40 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-purple-900/40">
            
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/10 via-[#00c48d]/10 to-cyan-500/10 blur-xl opacity-70 animate-pulse pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00c48d]"></span>
                  </div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                    Synthesizing Dialect
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 1, 0.3] 
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'easeInOut',
                        delay: i * 0.2
                      }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative h-2.5 w-full bg-purple-950/20 rounded-md overflow-hidden border border-purple-950/30">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00c48d]/25 via-cyan-400/15 to-transparent w-full"
                  />
                </div>
                <div className="relative h-2.5 w-3/4 bg-purple-950/20 rounded-md overflow-hidden border border-purple-950/30">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.25 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 via-[#00c48d]/20 to-transparent w-full"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;