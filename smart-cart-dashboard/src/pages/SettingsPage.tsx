import React, { useState, useEffect } from 'react';

// --- TypeScript Type for Settings ---
interface Settings {
  storeName: string;
  lowBatteryThreshold: number;
  idleCartTimeout: number;
  notificationEmail: string;
  // Add other settings fields as needed
}

// --- Main Settings Page Component ---
const SettingsPage = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState(''); // To show "Saved!" message

  // **IMPORTANT**: Replace with your actual Azure Function URL
  const settingsUrl = 'https://smart-cart-management-erddb6awbrbtfgdh.centralindia-01.azurewebsites.net/api/settings?';

  // Fetch existing settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(settingsUrl);
        if (!response.ok) throw new Error('Failed to fetch settings.');
        const data = await response.json();
        setSettings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => {
        if (!prevSettings) return null;
        return {
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value,
        };
    });
  };

  // Handle form submission
  const handleSave = async () => {
    if (!settings) return;
    setIsLoading(true);
    setSaveStatus('');
    setError(null);
    try {
      const response = await fetch(settingsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!response.ok) throw new Error('Failed to save settings.');
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000); // Clear message after 3 seconds
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !settings) {
    return <div className="p-8 text-center text-gray-500">Loading Settings...</div>;
  }
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your store profile and cart configurations.</p>
      
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Name</label>
          <input name="storeName" value={settings?.storeName || ''} onChange={handleChange} type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Low Battery Threshold (%)</label>
          <input name="lowBatteryThreshold" value={settings?.lowBatteryThreshold || ''} onChange={handleChange} type="number" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Idle Cart Timeout (minutes)</label>
          <input name="idleCartTimeout" value={settings?.idleCartTimeout || ''} onChange={handleChange} type="number" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notification Email</label>
          <input name="notificationEmail" value={settings?.notificationEmail || ''} onChange={handleChange} type="email" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
        </div>
      </div>

      <div className="mt-8 flex justify-end items-center">
        {saveStatus && <p className="text-green-600 mr-4">{saveStatus}</p>}
        {error && <p className="text-red-600 mr-4">{error}</p>}
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
