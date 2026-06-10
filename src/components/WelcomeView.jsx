import React from 'react';

const WelcomeView = ({ subGreeting, currentUser }) => {
  return (
    <div className="text-center flex flex-col justify-center items-center select-none pointer-events-none">
      <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-[#00c48d] via-[#4ade80] to-[#a855f7] bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <span className="font-sans mr-2">मि</span>Garhwali
      </h1>

      <h2 className="text-2xl font-bold text-slate-200 mt-8 tracking-wide">
        Let's jump in, <span className="font-extrabold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">{currentUser ? currentUser.name : 'Guest User'}!</span>
      </h2>
      
      <p className="text-sm font-medium text-slate-400 mt-3 tracking-wide max-w-xl text-center px-4 opacity-90 transition-all duration-300">
        {subGreeting}
      </p>
    </div>
  );
};

export default WelcomeView;