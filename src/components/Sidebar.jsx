import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, onNewChat, onHistoryItemClick, history }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 288, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full bg-[#0f172a]/95 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0 overflow-hidden z-20"
        >
          <div className="flex flex-col w-full">
            <div className="text-xl font-black bg-gradient-to-r from-[#00c48d] via-[#06b6d4] to-[#8b5cf6] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.15)] text-center tracking-wider pt-2">
              MI-GARHWALI AI
            </div>
            <motion.button
              className="w-full bg-[#00c48d] text-slate-950 font-bold hover:bg-[#00e0a1] transition-all rounded-xl p-3 flex items-center justify-center gap-2 shadow-lg shadow-[#00c48d]/10 mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNewChat}
            >
              <span>+ New Chat</span>
            </motion.button>
          </div>

          <div className="flex-1 w-full flex flex-col mt-6 overflow-hidden">
            <div className="text-xs font-bold tracking-widest text-slate-500 mb-2 uppercase px-1">Recent Consultations</div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-sm">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  className="p-3 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 cursor-pointer transition-all flex items-center gap-2 text-slate-300 truncate"
                  whileHover={{ x: 2 }}
                  onClick={() => onHistoryItemClick(item)}
                >
                  <span className="text-slate-500 text-xs">💬</span>
                  <span className="truncate">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 mt-auto">
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-xs font-black text-white shadow-md">PK</div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-slate-200 truncate">Piyush Kumar</span>
                <span className="text-[10px] text-slate-500 truncate">Premium Member</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;