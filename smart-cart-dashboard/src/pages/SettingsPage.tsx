// import React, { useState, useEffect } from 'react';

// // --- TypeScript Type for Settings ---
// interface Settings {
//   storeName: string;
//   lowBatteryThreshold: number;
//   idleCartTimeout: number;
//   notificationEmail: string;
//   // Add other settings fields as needed
// }

// // --- Main Settings Page Component ---
// const SettingsPage = () => {
//   const [settings, setSettings] = useState<Settings | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saveStatus, setSaveStatus] = useState(''); // To show "Saved!" message

//   // **IMPORTANT**: Replace with your actual Azure Function URL
//   const settingsUrl = 'https://smart-cart-management-backend-hqhedudtd4cnfng8.centralindia-01.azurewebsites.net/api/settings?';

//   // Fetch existing settings on load
//   useEffect(() => {
//     const fetchSettings = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(settingsUrl);
//         if (!response.ok) throw new Error('Failed to fetch settings.');
//         const data = await response.json();
//         setSettings(data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchSettings();
//   }, []);

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setSettings(prevSettings => {
//         if (!prevSettings) return null;
//         return {
//             ...prevSettings,
//             [name]: type === 'checkbox' ? checked : value,
//         };
//     });
//   };

//   // Handle form submission
//   const handleSave = async () => {
//     if (!settings) return;
//     setIsLoading(true);
//     setSaveStatus('');
//     setError(null);
//     try {
//       const response = await fetch(settingsUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(settings)
//       });
//       if (!response.ok) throw new Error('Failed to save settings.');
//       setSaveStatus('Settings saved successfully!');
//       setTimeout(() => setSaveStatus(''), 3000); // Clear message after 3 seconds
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading && !settings) {
//     return <div className="p-8 text-center text-gray-500">Loading Settings...</div>;
//   }
  
//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Settings</h1>
//       <p className="text-gray-600 mb-8">Manage your store profile and cart configurations.</p>
      
//       <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Store Name</label>
//           <input name="storeName" value={settings?.storeName || ''} onChange={handleChange} type="text" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Low Battery Threshold (%)</label>
//           <input name="lowBatteryThreshold" value={settings?.lowBatteryThreshold || ''} onChange={handleChange} type="number" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Idle Cart Timeout (minutes)</label>
//           <input name="idleCartTimeout" value={settings?.idleCartTimeout || ''} onChange={handleChange} type="number" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Notification Email</label>
//           <input name="notificationEmail" value={settings?.notificationEmail || ''} onChange={handleChange} type="email" className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3" />
//         </div>
//       </div>

//       <div className="mt-8 flex justify-end items-center">
//         {saveStatus && <p className="text-green-600 mr-4">{saveStatus}</p>}
//         {error && <p className="text-red-600 mr-4">{error}</p>}
//         <button 
//           onClick={handleSave}
//           disabled={isLoading}
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300"
//         >
//           {isLoading ? 'Saving...' : 'Save All Changes'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;













import React, { useState, useEffect } from 'react';

// 1. We accept userId as a prop so we know WHO to fetch
const SettingsPage = ({ userId }: { userId: string }) => {
    
    // --- State ---
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        storeName: 'MaGCoff Mumbai #01', 
        managerEmail: '', // Starts empty, will fill from Server
        batteryThreshold: '15',
        idleTimeout: '10'
    });

    // --- API Configuration ---
    const API_BASE = 'https://smart-cart-management-backend-hqhedudtd4cnfng8.centralindia-01.azurewebsites.net/api/profile';

    // --- Fetch Real User Data ---
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                // Use the passed userId. If it's missing, we can't fetch.
                const targetId = userId || '66eb1234567890abcdef1234'; 
                
                console.log(`Fetching settings for ID: ${targetId}...`);

                const response = await fetch(`${API_BASE}/${targetId}`);
                
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }

                const data = await response.json();
                
                // SUCCESS: Update state with the REAL email from the backend
                setFormData(prev => ({
                    ...prev,
                    managerEmail: data.email || '', // The real email
                    storeName: data.storeName || prev.storeName // If backend has storeName, use it too
                }));

            } catch (error) {
                console.error("Failed to fetch user email:", error);
                // Optional: If fetch fails, you might want to keep the field empty 
                // or show a placeholder, but we won't force the "demo" email here.
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // --- Handle Input Changes ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Saving to server:", formData);
        // Add your PUT/POST logic here to save changes back to the database
        alert("Changes saved!");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-lime-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Store Configurations</h2>
            
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Store Name</label>
                        <input 
                            type="text" 
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-lime-500 outline-none transition-all" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Manager Email</label>
                        {/* Bound to state: shows the fetched email */}
                        <input 
                            type="email" 
                            name="managerEmail"
                            value={formData.managerEmail}
                            onChange={handleChange}
                            placeholder="fetching email..."
                            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-lime-500 outline-none transition-all" 
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Cart Parameters</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Low Battery Threshold (%)</label>
                            <input 
                                type="number" 
                                name="batteryThreshold"
                                value={formData.batteryThreshold}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-lime-500" 
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Idle Timeout (Min)</label>
                            <input 
                                type="number" 
                                name="idleTimeout"
                                value={formData.idleTimeout}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-lime-500" 
                            />
                         </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button 
                        onClick={handleSave}
                        className="px-6 py-3 bg-lime-600 text-white font-bold rounded-xl hover:bg-lime-700 transition-colors shadow-md shadow-lime-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;