import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import AboutUsView from './components/AboutUsView';
import AuthView from './components/AuthView';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentView, setCurrentView] = useState('chat'); // 'chat' | 'about'
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Persistent User state management
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('garhwali_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('garhwali_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem('sidebar_open');
    return savedState !== null ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebar_open', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('garhwali_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const handleNewChat = () => {
    setMessages([]);
  };

  const handleSignInSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('garhwali_active_session', JSON.stringify(user));
    setShowAuthModal(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('garhwali_active_session');
    setCurrentView('chat');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0c0f14] flex text-slate-100 font-sans antialiased relative">
      <AnimatePresence mode="wait">
        <Sidebar
          isOpen={isSidebarOpen}
          onNewChat={handleNewChat}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onSignInClick={() => setShowAuthModal(true)}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </AnimatePresence>

      {currentView === 'chat' ? (
        <MainPanel
          messages={messages}
          setMessages={setMessages}
          currentUser={currentUser}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onNavigateAbout={() => setCurrentView('about')}
        />
      ) : (
        <AboutUsView onBack={() => setCurrentView('chat')} />
      )}

      <AnimatePresence>
        {showAuthModal && (
          <AuthView 
            registeredUsers={registeredUsers}
            setRegisteredUsers={setRegisteredUsers}
            onAuthSuccess={handleSignInSuccess}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;