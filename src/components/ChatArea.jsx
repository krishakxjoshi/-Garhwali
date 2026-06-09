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
    /* Increased layout view limits to max-w-5xl matching your native full screen grid constraints */
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-6 max-w-5xl mx-auto w-full custom-chat-scroll">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-3xl rounded-2xl px-5 py-3.5 text-sm shadow-xl transition-all duration-300 ${
            msg.sender === 'user'
              ? 'bg-[#00c48d] text-slate-950 font-medium rounded-tr-none border border-emerald-400/20'
              : 'bg-[#13171e] text-slate-200 border border-slate-800/80 rounded-tl-none'
          }`}>
            {msg.text}
          </div>
        </div>
      ))}

      {/* Modern Ambient Neural Intelligence Loading Grid */}
      {isLoading && (
        <div className="flex w-full justify-start items-start gap-4 pt-4">
          <div className="w-full max-w-md bg-gradient-to-br from-[#12161f] via-[#0f121a] to-[#0a0d14] p-5 rounded-2xl border border-slate-800/80 shadow-2xl relative overflow-hidden group">
            
            {/* Blurry Background Chromatic Glow */}
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/10 via-[#00c48d]/10 to-cyan-500/10 blur-xl opacity-70 animate-pulse pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c48d]"></span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                    Synthesizing Dialect
                  </span>
                </div>

                {/* Micro Digital Heartbeat Sparkles */}
                <div className="flex items-center gap-1">
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
                      className="w-1 h-1 rounded-full bg-cyan-400"
                    />
                  ))}
                </div>
              </div>

              {/* Multi-tier Organic Fluid Shimmer Lines */}
              <div className="space-y-2.5">
                <div className="relative h-2 w-full bg-slate-900/60 rounded-md overflow-hidden border border-slate-800/40">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00c48d]/25 via-cyan-400/15 to-transparent w-full"
                  />
                </div>
                <div className="relative h-2 w-3/4 bg-slate-900/60 rounded-md overflow-hidden border border-slate-800/40">
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