import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase'; 

const AuthView = ({ initialMode = 'login', onAuthSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('garhwali_oauth_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('garhwali_oauth_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const handleGoogleAuthAction = async () => {
    if (isAuthenticating) return; 

    setErrorMessage('');
    setSuccessMessage('');
    setIsAuthenticating(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const userEmail = googleUser.email.toLowerCase();

      if (isLogin) {
        const accountMatch = registeredUsers.find(u => u.email.toLowerCase() === userEmail);

        if (!accountMatch) {
          setErrorMessage('Authentication Failed: This Google account is not registered yet.');
          return;
        }

        onAuthSuccess({
          name: googleUser.displayName || 'Google User',
          email: googleUser.email,
          avatar: googleUser.photoURL,
          isGuest: false
        });
      } else {
        const accountExists = registeredUsers.some(u => u.email.toLowerCase() === userEmail);

        if (accountExists) {
          setErrorMessage('Registration Conflict: This Google account is already registered. Please sign in.');
          return;
        }

        const newUserProfile = {
          name: googleUser.displayName || 'Google User',
          email: googleUser.email,
          avatar: googleUser.photoURL,
          isGuest: false
        };

        setRegisteredUsers(prev => [...prev, newUserProfile]);
        setSuccessMessage('Registration Successful! You can now use "Continue with Google" to Sign In.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Firebase Handshake Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Authentication canceled: Login popup closed.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setErrorMessage('A login request is already in progress. Please use the open window.');
      } else {
        setErrorMessage('Google Authentication failed. Please check network configurations.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleGuestLogin = () => {
    onAuthSuccess({
      name: 'Guest User',
      email: 'guest@ecosystem.internal',
      isGuest: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-md bg-[#0f0a1c] border border-purple-950/40 rounded-2xl p-8 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition text-sm cursor-pointer">✕</button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-[#00c48d] via-[#22d3ee] to-[#8b5cf6] bg-clip-text text-transparent tracking-wider">मि Garhwali</h2>
          <p className="text-slate-400 text-xs mt-1.5 uppercase tracking-widest font-bold">Language Infrastructure Platform</p>
        </div>

        {errorMessage && (
          <div className="p-3 text-xs font-semibold rounded-xl text-center mb-4 bg-red-500/10 text-red-400 border border-red-500/20">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 text-xs font-semibold rounded-xl text-center mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {successMessage}
          </div>
        )}

        <div className="space-y-4">
          <motion.button
            type="button"
            onClick={handleGoogleAuthAction}
            disabled={isAuthenticating}
            whileHover={isAuthenticating ? {} : { scale: 1.01, borderColor: '#8b5cf6' }}
            whileTap={isAuthenticating ? {} : { scale: 0.99 }}
            className={`w-full flex items-center justify-center gap-3 py-3 font-bold rounded-xl transition text-sm border shadow-sm ${
              isAuthenticating ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60' : 'bg-white text-slate-900 border-slate-200 cursor-pointer'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {isAuthenticating ? 'Connecting Safely...' : isLogin ? 'Continue with Google' : 'Register via Google'}
          </motion.button>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-purple-950/30"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-purple-400/60 uppercase tracking-widest">OR</span>
            <div className="flex-grow border-t border-purple-950/30"></div>
          </div>

          <motion.button
            type="button"
            onClick={handleGuestLogin}
            whileHover={{ scale: 1.01, backgroundColor: '#4c1d95' }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 bg-[#6d28d9] text-slate-100 font-bold rounded-xl transition text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-purple-950/20"
          >
            Continue as Guest
          </motion.button>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 border-t border-purple-950/30 pt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setErrorMessage(''); setSuccessMessage(''); }}
            className="text-purple-400 hover:underline font-bold ml-1 cursor-pointer bg-transparent border-none outline-none"
          >
            {isLogin ? 'Register via Google' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthView;