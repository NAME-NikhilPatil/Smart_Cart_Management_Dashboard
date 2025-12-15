import React, { useState, useEffect } from 'react';

// --- Types ---
interface UserProfile {
    _id: string;
    name: string;
    email: string;
    role?: string;
    department?: string;
    joinDate?: string;
    avatarUrl?: string;
    stats?: {
        actionsPerformed: number;
        hoursOnline: number;
        alertsResolved: number;
    };
    recentActivity?: {
        id: number;
        action: string;
        target: string;
        time: string;
    }[];
}

// --- Components ---
const StatBadge = ({ label, value, icon, color }: any) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className={`p-3 rounded-full ${color} mb-2`}>
            {icon}
        </div>
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
    </div>
);

// UPDATED: Added onUpdateUser prop
const ProfilePage = ({ userId, onLogout, onUpdateUser }: { userId: string, onLogout: () => void, onUpdateUser?: (name: string) => void }) => {
    
    // Mock Data
    const mockProfile: UserProfile = {
        _id: userId || 'mock-id-001',
        name: 'demo', 
        email: 'demo@gmail.com',
        role: 'Store Manager',
        department: 'R&D Engineering',
        joinDate: 'Nov 2023',
        avatarUrl: '', 
        stats: {
            actionsPerformed: 124,
            hoursOnline: 42,
            alertsResolved: 15
        },
        recentActivity: [
            { id: 1, action: 'Manual Unlock', target: 'Cart-005', time: '2 hours ago' },
            { id: 2, action: 'Resolved Alert', target: 'Cart-012 (Battery)', time: '5 hours ago' },
            { id: 3, action: 'Updated Firmware', target: 'Fleet Group A', time: '1 day ago' },
        ]
    };

    const [profile, setProfile] = useState<UserProfile | null>(mockProfile);
    const [loading, setLoading] = useState(false); 
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: mockProfile.name, email: mockProfile.email });
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const API_BASE = 'https://smart-cart-management-backend-hqhedudtd4cnfng8.centralindia-01.azurewebsites.net/api/profile';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const targetId = userId || '66eb1234567890abcdef1234';
                const response = await fetch(`${API_BASE}/${targetId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    setProfile(prev => ({
                        ...prev!,
                        ...data,
                        avatarUrl: data.avatarUrl || '', 
                    }));
                    setEditForm({ name: data.name || 'demo', email: data.email || 'demo@gmail.com' });
                    
                    // NEW: Update the parent App's state with the fetched name
                    if (onUpdateUser && data.name) {
                        onUpdateUser(data.name);
                    }
                }
            } catch (err) {
                console.log("Staying with mock profile due to connection issue.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleSaveProfile = async () => {
        if (!profile) return;
        setLoading(true);
        setSuccessMsg(null);

        try {
            const response = await fetch(`${API_BASE}/${profile._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }

            setProfile({ ...profile, ...editForm });
            
            // NEW: Update sidebar immediately when saving
            if (onUpdateUser) onUpdateUser(editForm.name);

            setIsEditing(false);
            setSuccessMsg("Profile updated successfully!");
            setTimeout(() => setSuccessMsg(null), 3000);

        } catch (err: any) {
            console.error(err);
            setProfile({ ...profile, ...editForm });
             // NEW: Update sidebar immediately (demo mode)
            if (onUpdateUser) onUpdateUser(editForm.name);

            setIsEditing(false);
            setSuccessMsg("Profile updated (Demo Mode)");
            setTimeout(() => setSuccessMsg(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profile) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            
            {/* Header Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-100">
                <div className="h-32 bg-gradient-to-r from-lime-500 to-green-600 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                
                <div className="px-8 pb-8 relative">
                    {/* AVATAR */}
                    <div className="absolute -top-16 left-8 p-1 bg-white rounded-full shadow-lg">
                         <div className="w-32 h-32 bg-gradient-to-br from-lime-400 to-green-600 rounded-full flex items-end justify-center border-4 border-white relative overflow-hidden shadow-inner group cursor-pointer">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <svg className="w-full h-full text-lime-100 opacity-90 translate-y-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-4">
                        {isEditing ? (
                            <div className="flex space-x-2 mr-2">
                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors">Cancel</button>
                                <button onClick={handleSaveProfile} className="px-4 py-2 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-lime-500/30">Save Changes</button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors mr-2">Edit Profile</button>
                        )}
                        <button onClick={onLogout} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Sign Out
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="mt-4 md:ml-40">
                        {successMsg && <div className="mb-3 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg inline-block">{successMsg}</div>}
                        
                        {isEditing ? (
                            <div className="space-y-3 max-w-md">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase">Email</label>
                                    <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-extrabold text-slate-800">{profile.name}</h1>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-slate-500">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                        {profile.department}
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        {profile.email}
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-lime-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Joined {profile.joinDate}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats & Activity Grid - (Keeping rest of the code same as before) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatBadge label="Actions Performed" value={profile.stats?.actionsPerformed || 0} color="bg-blue-50 text-blue-600" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                <StatBadge label="Hours Online" value={profile.stats?.hoursOnline || 0} color="bg-purple-50 text-purple-600" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatBadge label="Alerts Resolved" value={profile.stats?.alertsResolved || 0} color="bg-lime-50 text-lime-600" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>

            {/* Account Details & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Account Details</h3>
                    <div className="space-y-4">
                        {/* Details Mapping */}
                        <div className="flex flex-col border-b border-slate-50 pb-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</span>
                            <span className="text-sm font-medium text-slate-700">{profile.name}</span>
                        </div>
                        <div className="flex flex-col border-b border-slate-50 pb-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                            <span className="text-sm font-medium text-slate-700">{profile.email}</span>
                        </div>
                        <div className="flex flex-col border-b border-slate-50 pb-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">User ID</span>
                            <span className="text-sm font-medium text-slate-700 font-mono">{profile._id}</span>
                        </div>
                        <div className="flex flex-col border-b border-slate-50 pb-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Role</span>
                            <span className="self-start px-2 py-1 bg-lime-100 text-lime-700 text-xs font-bold rounded uppercase">{profile.role}</span>
                        </div>
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</span>
                            <span className="text-sm font-medium text-slate-700">Mumbai, India</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                        <button className="text-lime-600 text-sm font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {profile.recentActivity?.map((activity, index) => (
                            <div key={activity.id} className="flex relative">
                                {index !== (profile.recentActivity?.length || 0) - 1 && <div className="absolute left-2.5 top-8 bottom-0 w-0.5 bg-slate-100"></div>}
                                <div className="relative flex-shrink-0 w-5 h-5 bg-lime-100 rounded-full border-2 border-white shadow-sm mt-1 mr-4 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">{activity.action} <span className="font-bold text-slate-900">"{activity.target}"</span></p>
                                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
