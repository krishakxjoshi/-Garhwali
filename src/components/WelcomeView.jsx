import React from 'react';
import logo from './logo.png'; // Updated import to use your transparent PNG image

const WelcomeView = ({ subGreeting, currentUser }) => {
  return (
    <div className="text-center flex flex-col justify-center items-center select-none pointer-events-none py-6 scale-105 transform origin-center">
      {/* Large-scale transparent PNG logo with a clean drop-shadow */}
      <img 
        src={logo} 
        alt="Mi Garhwali Logo" 
        className="w-[420px] h-auto filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] object-contain"
      />

      {/* Enlarged Welcoming Sentence */}
      <h2 className="text-3xl font-bold text-slate-200 mt-10 tracking-wide">
        Let's jump in, <span className="font-extrabold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">{currentUser ? currentUser.name : 'Guest User'}!</span>
      </h2>
      
      {/* Enlarged Sub-greeting description */}
      <p className="text-base font-medium text-slate-400 mt-4 tracking-wide max-w-2xl text-center px-4 opacity-90 transition-all duration-300">
        {subGreeting}
      </p>
    </div>
  );
};

export default WelcomeView;