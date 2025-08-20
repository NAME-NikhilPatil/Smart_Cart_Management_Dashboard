import React, { useState, useEffect } from 'react';

interface ProfilePageProps {
  userId: string; // Now receives the userId as a prop
  onLogout: () => void;
}

// Define the structure of the user data
interface UserProfile {
    name: string;
    email: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userId, onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Construct the API URL dynamically using the userId prop
    const profileUrl = `https://smart-cart-management-erddb6awbrbtfgdh.centralindia-01.azurewebsites.net/api/profile/${userId}`;

    // Fetch user data when the page loads
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(profileUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data.');
                }
                const data = await response.json();
                setProfile({ name: data.name, email: data.email });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [profileUrl]); // Re-run if the URL changes (though it won't in this setup)

    const handleEditClick = async () => {
        if (isEditing) {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(profileUrl, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profile)
                });
                if (!response.ok) {
                    throw new Error('Failed to save profile changes.');
                }
                setIsEditing(false); // Exit editing mode on success
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsEditing(true); // Enter editing mode
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center">Loading Profile...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'M'}
                    </div>

                    {isEditing ? (
                        <div className="w-full space-y-4 text-left">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input 
                                    type="text" 
                                    value={profile.name}
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    value={profile.email}
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold">{profile.name}</h2>
                            <p className="text-gray-500">{profile.email}</p>
                        </div>
                    )}
                    
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    <div className="flex space-x-4 mt-6">
                        <button 
                            onClick={handleEditClick} 
                            disabled={isLoading}
                            className={`px-6 py-2 font-semibold rounded-md transition-colors duration-200 disabled:bg-gray-300 ${
                                isEditing 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            {isLoading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Edit Profile')}
                        </button>
                        <button 
                            onClick={onLogout} 
                            className="px-6 py-2 font-semibold rounded-md transition-colors duration-200 bg-red-500 text-white hover:bg-red-600"
                        >
                           Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
