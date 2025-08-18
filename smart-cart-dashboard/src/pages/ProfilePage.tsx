import React, { useState } from 'react';

interface ProfilePageProps {
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Manager Name');
    const [email, setEmail] = useState('manager@smartstore.com');

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4">
                        M
                    </div>

                    {isEditing ? (
                        <div className="w-full space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-left">Name</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-left">Email Address</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold">{name}</h2>
                            <p className="text-gray-500">{email}</p>
                        </div>
                    )}
                    <div className="flex space-x-4 mt-6">
                        <button 
                            onClick={handleEditClick} 
                            className={`px-6 py-2 font-semibold rounded-md transition-colors duration-200 ${
                                isEditing 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
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
