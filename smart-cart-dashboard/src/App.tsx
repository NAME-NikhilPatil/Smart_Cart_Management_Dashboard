import React, { useState } from 'react';
import logo from './assets/logo.png'; 

// --- Component Imports ---
import DashboardPage from './pages/DashboardPage';
import MetricDetailPage from './pages/MetricDetailPage';
import CartsPage from './pages/CartsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotificationsPanel from './components/NotificationsPanel'; 

// --- Navigation Icon Component ---
interface NavIconProps {
    name: string;
    active: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ name, active }) => {
    const colorClass = active ? "text-lime-600" : "text-slate-500 group-hover:text-slate-700";
    
    const icons: Record<string, React.ReactNode> = {
        'Dashboard': <path d="M3 13.2V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7.2M3 13.2l7.5 4.3a3 3 0 0 0 3 0l7.5-4.3M3 13.2l7.5-4.3a3 3 0 0 1 3 0l7.5 4.3" />,
        'Live Fleet': <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-2.7 8.5c-.2.7.3 1.6 1.1 1.6H2" />,
        'Analytics': <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" />,
        'Settings': <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
        'Profile': <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 ${colorClass}`}>
            {icons[name] || icons['Dashboard']}
        </svg>
    );
}

// --- Main App Component ---
const App = () => {
  
  // 1. AUTH STATE
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [userId, setUserId] = useState<string | null>(() => {
      return localStorage.getItem('userId') || '66eb1234567890abcdef1234';
  });

  // 2. UI STATE
  const [currentPage, setCurrentPage] = useState<string>('Dashboard');
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMetricId, setSelectedMetricId] = useState<string>('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // NEW: Initialize userName from localStorage so it persists on reload
  const [userName, setUserName] = useState<string>(() => {
      return localStorage.getItem('userName') || 'demo';
  });

  // 3. HANDLERS
  const handleAuthSuccess = (id: string) => {
      setUserId(id);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userId', id);
  };

  // NEW: Function to update user name from Profile Page
  const handleUpdateUser = (name: string) => {
      setUserName(name);
      localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setUserId(null);
      setUserName('demo'); // Reset name on logout
      setCurrentPage('Dashboard');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
  };

  const handleNavigation = (page: string, metricId?: string) => {
      setCurrentPage(page);
      if (metricId) {
          setSelectedMetricId(metricId);
      }
  };

  if (!isAuthenticated) {
    return authView === 'login' 
      ? <LoginPage onLoginSuccess={handleAuthSuccess} onSwitchToSignUp={() => setAuthView('signup')} />
      : <SignUpPage onSignUpSuccess={handleAuthSuccess} onSwitchToLogin={() => setAuthView('login')} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-lg shadow-slate-100 z-20">
        <div className="h-40 flex items-center justify-center px-2 border-b border-slate-100 bg-white"> 
            <img src={logo} alt="MaGCoff Logo" className="w-64 object-contain mix-blend-multiply filter contrast-125 brightness-110" />
        </div>

        <div className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Command Center</p>
            {['Dashboard', 'Live Fleet', 'Analytics'].map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group relative ${
                        currentPage === page ? 'bg-lime-50 text-lime-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                >
                    <NavIcon name={page} active={currentPage === page} />
                    <span className="ml-3 tracking-wide">{page}</span>
                    {currentPage === page && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-lime-600 rounded-l-full"></div>}
                </button>
            ))}
            
            <div className="mt-8">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">System</p>
                {['Settings', 'Profile'].map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-full flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group relative ${
                            currentPage === page ? 'bg-lime-50 text-lime-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                        }`}
                    >
                        <NavIcon name={page} active={currentPage === page} />
                        <span className="ml-3 tracking-wide">{page}</span>
                        {currentPage === page && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-lime-600 rounded-l-full"></div>}
                    </button>
                ))}
            </div>
        </div>

        {/* USER PROFILE SECTION IN SIDEBAR */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-lime-600 flex items-center justify-center text-white font-bold shadow-md shadow-lime-200">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="ml-3">
                    <p className="text-sm font-bold text-slate-800 capitalize">{userName}</p>
                    <p className="text-xs text-slate-500 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Store Manager
                    </p>
                </div>
            </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-50">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {currentPage === 'MetricDetail' ? 'Analytics Detail' : currentPage}
                </h2>
                <span className="mx-4 text-slate-300">|</span>
                <span className="text-sm text-slate-500">Mumbai Central Store #084</span>
            </div>
            <div className="flex items-center space-x-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-lime-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-lime-600 w-64 transition-all" placeholder="Search ID, Product, or Alert..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="relative">
                    <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className={`relative p-2 transition-colors ${isNotificationsOpen ? 'text-lime-600 bg-lime-50 rounded-full' : 'text-slate-400 hover:text-slate-600'}`}>
                        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white animate-ping"></span>
                        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                    {isNotificationsOpen && (
                        <>
                            <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsNotificationsOpen(false)}></div>
                            <NotificationsPanel />
                        </>
                    )}
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10 max-w-8xl mx-auto">
                {currentPage === 'Dashboard' && <DashboardPage onNavigate={handleNavigation} />}
                {currentPage === 'MetricDetail' && <MetricDetailPage metricId={selectedMetricId} onBack={() => setCurrentPage('Dashboard')} />}
                {currentPage === 'Live Fleet' && <CartsPage searchQuery={searchQuery} />}
                {currentPage === 'Analytics' && <AnalyticsPage />}
                {currentPage === 'Settings' && <SettingsPage userId={userId || ''} />}
                
                {/* UPDATED: Passed handleUpdateUser to ProfilePage */}
                {currentPage === 'Profile' && (
                    <ProfilePage 
                        userId={userId || ''} 
                        onLogout={handleLogout} 
                        onUpdateUser={handleUpdateUser} 
                    />
                )}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;