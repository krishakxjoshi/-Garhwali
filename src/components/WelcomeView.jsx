import React from 'react';
import { motion } from 'framer-motion';

const WelcomeView = ({ onStartChat }) => {
  return (
    <div className="flex-1 h-full flex flex-col justify-center items-start px-8 sm:px-16 overflow-y-auto relative bg-transparent z-10">
      <div className="flex flex-col items-start w-full max-w-xl">
        <motion.div 
          className="flex flex-col items-start mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-6xl font-black bg-gradient-to-r from-[#00c48d] via-[#06b6d4] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,196,141,0.25)] text-left tracking-tight mb-2"
          >
            Mi-Garhwali
          </motion.h1>
        </motion.div>

        <div className="text-xl font-bold text-slate-200 mb-2 text-left tracking-wide">Preserving Language Through AI</div>
        <div className="text-sm text-slate-400 mb-8 text-left max-w-sm leading-relaxed font-medium">Translate, Learn, and Converse in Garhwali using advanced artificial intelligence models.</div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full box-border">
          {[
            { name: 'English to Garhwali', desc: 'Convert text fluidly' },
            { name: 'Garhwali to English', desc: 'Understand local dialects' },
            { name: 'Text to Speech', desc: 'Listen to native pronunciation' },
            { name: 'Speech to Text', desc: 'Transcribe spoken words' }
          ].map((option, index) => (
            <motion.div
              key={index}
              className="group border border-slate-800/60 hover:border-[#00c48d]/60 bg-[#0f172a]/40 backdrop-blur-md rounded-2xl transition-all cursor-pointer p-6 flex flex-col items-start justify-center text-left h-28 box-border"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartChat(option.name)}
            >
              <div className="text-sm font-black text-slate-100 group-hover:text-[#00c48d] transition-colors tracking-wide w-full truncate">
                {option.name}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold mt-1 w-full truncate">
                {option.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;