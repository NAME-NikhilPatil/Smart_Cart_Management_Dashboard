import { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CartsPage from './pages/CartsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPanel from './components/NotificationsPanel';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Define the possible page names
type Page = 'Dashboard' | 'Analytics' | 'Carts' | 'Settings' | 'Profile';

function App() {
  // --- New State Management ---
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Is the user logged in?
  const [authPage, setAuthPage] = useState<'login' | 'signup'>('login'); // Which auth page to show

  // --- Dashboard State (from previous steps) ---
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // --- Page Rendering Logic ---
  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard': return <DashboardPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Carts': return <CartsPage searchQuery={searchQuery} />;
      case 'Settings': return <SettingsPage />;
      case 'Profile': return <ProfilePage onLogout={handleLogout} />; // Pass logout handler
      default: return <DashboardPage />;
    }
  };

  // --- Event Handlers ---
  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setSearchQuery('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage('Carts');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('Dashboard'); // Reset to default page after logout
  };

  // --- Main Render Logic ---
  // If the user is logged in, show the dashboard. Otherwise, show the auth pages.
  if (isLoggedIn) {
    return (
      <div className="bg-gray-100 min-h-screen font-sans">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-10">
                <h1 className="text-xl font-bold text-gray-800">Smart Cart Management</h1>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" onClick={() => handleNavClick('Dashboard')} className={`text-sm font-medium pb-1 ${currentPage === 'Dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Dashboard</a>
                  <a href="#" onClick={() => handleNavClick('Analytics')} className={`text-sm font-medium pb-1 ${currentPage === 'Analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Analytics</a>
                  <a href="#" onClick={() => handleNavClick('Carts')} className={`text-sm font-medium pb-1 ${currentPage === 'Carts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Carts</a>
                  <a href="#" onClick={() => handleNavClick('Settings')} className={`text-sm font-medium pb-1 ${currentPage === 'Settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Settings</a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Find a cart..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <button onClick={() => handleNavClick('Profile')} className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">M</button>
              </div>
            </div>
          </div>
        </header>
        
        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderPage()}
        </main>
      </div>
    );
  } else {
    // User is not logged in, show either Login or SignUp page
    return (
      authPage === 'login'
        ? <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} onSwitchToSignUp={() => setAuthPage('signup')} />
        : <SignUpPage onSignUpSuccess={() => setIsLoggedIn(true)} onSwitchToLogin={() => setAuthPage('login')} />
    );
  }
}

export default App;