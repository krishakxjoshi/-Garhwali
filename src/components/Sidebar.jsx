import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { VscSignOut } from 'react-icons/vsc';

const Sidebar = ({ isOpen, onNewChat, onHistoryItemClick, history = [], isLoggedIn, setIsSidebarOpen }) => {
  // Defensive array fallback to absolutely guarantee .length and .map never read undefined
  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="h-full bg-[#0d1117] border-r border-slate-900/90 flex flex-col justify-between p-4 shrink-0 overflow-hidden z-30 select-none"
        >
          <div className="flex flex-col w-full">
            {isLoggedIn && (
              <div className="flex flex-col gap-2.5 mb-4">
                
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#161b22] border border-transparent hover:border-slate-800/60 transition-all duration-300 ease-in-out group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold tracking-wider shadow-md">
                      P
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-semibold text-slate-200 truncate">Piyush Kumar</span>
                      <span className="text-[10px] text-slate-500 font-medium truncate">Premium Member</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoChevronDown className="text-slate-500 text-xs transition-transform duration-300 group-hover:text-slate-300" />
                    
                    <motion.button
                      whileHover={{ scale: 1.15, backgroundColor: '#1e2530', color: '#f1f5f9' }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSidebarOpen(false);
                      }}
                      className="text-slate-500 p-1 rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      <FiX className="text-xs" />
                    </motion.button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ backgroundColor: '#161b22', borderColor: '#475569', scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-[#11141a] text-slate-300 text-xs font-medium border border-slate-800/80 transition-all duration-300 rounded-xl py-2.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <VscSignOut className="text-sm text-slate-400" />
                  <span>Sign Out</span>
                </motion.button>
              </div>
            )}

            <motion.button
              className="w-full bg-[#00c48d] text-slate-950 text-xs font-bold transition-all duration-300 rounded-xl py-3 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/5"
              whileHover={{ scale: 1.02, backgroundColor: '#00e0a1', boxShadow: "0 12px 24px -4px rgba(0, 196, 141, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onNewChat}
            >
              <span className="text-base font-semibold leading-none">+</span>
              <span>New Chat</span>
            </motion.button>
          </div>

          <div className="flex-1 w-full flex flex-col mt-8 overflow-hidden">
            <div className="text-[10px] font-bold tracking-widest text-slate-500 mb-3 uppercase px-2">
              Recent Chats
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-sidebar-scroll">
              {safeHistory.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 4, backgroundColor: '#161b22', borderColor: 'rgba(255,255,255,0.01)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="p-2.5 rounded-xl border border-transparent cursor-pointer flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-100 truncate transition-colors"
                  onClick={() => onHistoryItemClick(item)}
                >
                  <FiMessageSquare className="text-slate-500 text-xs shrink-0" />
                  <span className="truncate tracking-wide font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;