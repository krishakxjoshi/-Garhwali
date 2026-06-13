import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChevronDown } from 'react-icons/io5';
import { LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import { VscSignOut, VscSignIn } from 'react-icons/vsc';

const Sidebar = ({ isOpen, onNewChat, currentUser, onSignOut, onSignInClick, setIsSidebarOpen }) => {
  const [isHoveredOpen, setIsHoveredOpen] = useState(false);
  const isRealUser = currentUser && !currentUser.isGuest;

  return (
    <AnimatePresence mode="popLayout">
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="h-full bg-[#0d1117] border-r border-slate-900/90 flex flex-col justify-between p-4 shrink-0 overflow-hidden z-30 select-none relative"
        >
          <div className="w-[248px] flex flex-col h-full justify-between shrink-0">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between p-1.5 mb-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {isRealUser ? 'Active Profile' : 'Navigation'}
                </span>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onMouseEnter={() => setIsHoveredOpen(true)}
                  onMouseLeave={() => setIsHoveredOpen(false)}
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2.5 rounded-xl bg-[#13171e] hover:bg-[#1c212b] border border-slate-800 text-slate-400 hover:text-slate-100 shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  {isHoveredOpen ? (
                    <LuPanelLeftClose className="text-sm text-emerald-400" />
                  ) : (
                    <LuPanelLeftOpen className="text-sm" />
                  )}
                </motion.button>
              </div>

              {isRealUser ? (
                <div className="flex flex-col gap-2.5 mb-4">
                  <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#161b22] border border-transparent hover:border-slate-800/60 transition-all duration-300 ease-in-out group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold tracking-wider shadow-md uppercase">
                        {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {currentUser.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium truncate">
                          Authorized Client
                        </span>
                      </div>
                    </div>
                    <IoChevronDown className="text-slate-500 text-xs transition-transform duration-300 group-hover:text-slate-300" />
                  </div>

                  <motion.button
                    onClick={onSignOut}
                    whileHover={{ backgroundColor: '#2a1a1a', borderColor: '#ef4444/30', scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[#11141a] text-red-400 text-xs font-medium border border-slate-800/80 transition-all duration-300 rounded-xl py-2.5 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <VscSignOut className="text-sm text-red-400/80" />
                    <span>Sign Out</span>
                  </motion.button>
                </div>
              ) : (
                /* Redesigned Seamless Guest UI Panel Component to match image_de08e0.png layout */
                <div className="flex flex-col gap-2 mb-4 p-2.5 bg-[#13171e] border border-slate-800/60 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/80 opacity-70" />
                  <div className="flex items-center gap-2 pl-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guest Mode Enabled</span>
                  </div>
                  <motion.button
                    onClick={onSignInClick}
                    whileHover={{ backgroundColor: '#1c212b', borderColor: '#475569' }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[#0d1117] text-slate-200 hover:text-white text-xs font-semibold border border-slate-800 transition-all duration-200 rounded-lg py-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <VscSignIn className="text-sm text-emerald-400" />
                    <span>Sign In / Register</span>
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

            <div className="text-center text-[10px] text-slate-600 tracking-wider font-medium border-t border-slate-900/60 pt-4">
              मि Garhwali Infrastructure © 2026
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;