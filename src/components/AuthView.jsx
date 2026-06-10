import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthView = ({ registeredUsers, setRegisteredUsers, onAuthSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Enforce zero state retention when moving across workflows as shown in image_f0c815.png
  const handleTabToggle = (targetMode) => {
    setIsLogin(targetMode);
    setEmail('');
    setPassword('');
    setName('');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isLogin) {
      const userMatch = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!userMatch) {
        setErrorMessage('Authentication Failed: This email account does not exist. Please register first.');
        return;
      }
      if (userMatch.password !== password) {
        setErrorMessage('Authentication Failed: Invalid password coordinates provided.');
        return;
      }
      onAuthSuccess(userMatch);
    } else {
      const userExists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setErrorMessage('Registration Conflict: This email address is already linked with an account.');
        return;
      }
      const newProfile = { name, email, password };
      setRegisteredUsers([...registeredUsers, newProfile]);
      handleTabToggle(true);
      setErrorMessage('Registration Successful! Use those new credentials to log in.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="w-full max-w-md bg-[#0d1117] border border-slate-900/90 rounded-2xl p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition text-sm cursor-pointer">✕</button>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black bg-gradient-to-r from-[#00c48d] via-[#22d3ee] to-[#8b5cf6] bg-clip-text text-transparent tracking-wider">मि Garhwali</h2>
          <p className="text-slate-500 text-xs mt-1.5 uppercase tracking-widest font-bold">Language Infrastructure Platform</p>
        </div>

        {errorMessage && (
          <div className={`p-3 text-xs font-semibold rounded-xl text-center mb-4 ${errorMessage.includes('Successful') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your identity" className="w-full bg-[#13171e] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#00c48d]/60 transition" />
            </div>
          )}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full bg-[#13171e] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#00c48d]/60 transition" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#13171e] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#00c48d]/60 transition" />
          </div>

          <motion.button type="submit" whileHover={{ scale: 1.01, backgroundColor: '#00e0a1' }} whileTap={{ scale: 0.99 }} className="w-full py-3 bg-[#00c48d] text-slate-950 font-bold rounded-xl transition text-xs uppercase tracking-wider mt-4">
            {isLogin ? 'Sign In' : 'Register Profile'}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-900/80 pt-5">
          {isLogin ? "New to the project ecosystem?" : "Already have an active credential?"}{' '}
          <button type="button" onClick={() => handleTabToggle(!isLogin)} className="text-emerald-400 hover:underline font-bold ml-1 cursor-pointer">
            {isLogin ? 'Register Account' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthView;