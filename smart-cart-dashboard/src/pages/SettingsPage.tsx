import React, { useState } from 'react';

// --- Main Settings Page Component ---
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <StoreProfileSettings />;
      case 'Cart':
        return <CartConfigSettings />;
      case 'Notifications':
        return <NotificationSettings />;
      default:
        return <StoreProfileSettings />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your store profile, cart configurations, and user settings.</p>

      <div className="flex space-x-8 border-b-2 border-gray-200 mb-8">
        <TabButton title="Store Profile" isActive={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
        <TabButton title="Cart Configuration" isActive={activeTab === 'Cart'} onClick={() => setActiveTab('Cart')} />
        <TabButton title="Notifications" isActive={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
      </div>

      <div>
        {renderContent()}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save All Changes
        </button>
      </div>
    </div>
  );
};

// --- Tab Button Component ---
type TabButtonProps = {
    title: string;
    isActive: boolean;
    onClick: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`py-3 px-1 text-lg font-semibold transition-colors duration-200 ${isActive ? 'text-blue-600 border-b-4 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
    >
        {title}
    </button>
);

// --- Individual Settings Panels ---
const StoreProfileSettings = () => (
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 animate-fade-in">
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Name</label>
          <input type="text" defaultValue="My Local Store" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Address</label>
          <input type="text" defaultValue="123 Market St, San Francisco, CA 94103" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
);

const CartConfigSettings = () => (
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 animate-fade-in">
        <div>
          <label className="block text-sm font-medium text-gray-700">Low Battery Threshold (%)</label>
          <input type="number" defaultValue="20" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          <p className="mt-2 text-xs text-gray-500">Carts will be flagged for charging when their battery drops below this level.</p>
        </div>
         <div>
          <label className="block text-sm font-medium text-gray-700">Idle Cart Timeout (minutes)</label>
          <input type="number" defaultValue="15" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
           <p className="mt-2 text-xs text-gray-500">Time before an inactive, in-use cart sends an alert for potential abandonment.</p>
        </div>
    </div>
);

const NotificationSettings = () => (
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 animate-fade-in">
        <div>
          <label className="block text-sm font-medium text-gray-700">Notification Email</label>
          <input type="email" defaultValue="manager@smartstore.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <fieldset>
          <legend className="text-base font-medium text-gray-900">Enable Alerts For:</legend>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5"><input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded" /></div>
              <div className="ml-3 text-sm"><label className="font-medium text-gray-700">Assistance Requests</label></div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5"><input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded" /></div>
              <div className="ml-3 text-sm"><label className="font-medium text-gray-700">Low Battery Warnings</label></div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" /></div>
              <div className="ml-3 text-sm"><label className="font-medium text-gray-700">Cart Offline</label></div>
            </div>
          </div>
        </fieldset>
    </div>
);


export default SettingsPage;
