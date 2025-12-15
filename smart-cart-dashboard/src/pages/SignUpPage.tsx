import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Make sure this path is correct for your logo

// --- PROPS INTERFACE ---
// FIXED: This interface now correctly expects onSignUpSuccess
interface SignUpPageProps {
    onSignUpSuccess: (userId: string) => void;
    onSwitchToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUpSuccess, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = 'https://smart-cart-management-backend-hqhedudtd4cnfng8.centralindia-01.azurewebsites.net/api';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.body || data.message || 'Signup failed. Please try again.');
            }

            // FIXED: Calling the prop correctly
            onSignUpSuccess(data.userId);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans overflow-hidden">
            {/* --- Left Side: Clean Branding Area with Seamless Blend --- */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center p-12 bg-white"> 
                
                {/* Subtle Ambient Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-96 h-96 bg-lime-400 rounded-full blur-3xl opacity-5 animate-pulse-light-subtle"></div>
                </div>

                <div className="relative z-10 text-center flex flex-col items-center">
                    {/* MaGCoff Logo */}
                    <img 
                        src={logo} 
                        alt="MaGCoff Logo" 
                        className="w-[450px] h-auto object-contain mb-10 animate-fade-in-down mix-blend-multiply filter contrast-125 brightness-110"
                    />
                    
                    {/* Taglines */}
                    <h2 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-up">
                        Unlock Smart Retail
                    </h2>
                    <p className="text-xl text-gray-600 font-light max-w-md leading-relaxed animate-fade-in-up animation-delay-500">
                        Experience the future of seamless shopping and intelligent management.
                    </p>
                </div>
            </div>

            {/* --- Right Side: Signup Form Area --- */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-gray-50 relative z-20 shadow-inner">
                <div className="w-full max-w-md space-y-10 animate-fade-in-right">
                    
                    {/* Header Text */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                            Join the Future
                        </h2>
                        <p className="mt-3 text-gray-600 text-lg">
                            Create your admin account to get started.
                        </p>
                    </div>

                    {/* The Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-transparent focus:bg-white focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all outline-none font-medium text-gray-900 placeholder-gray-400 shadow-sm" 
                                placeholder="e.g. Nikhil Patil" 
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-transparent focus:bg-white focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all outline-none font-medium text-gray-900 placeholder-gray-400 shadow-sm" 
                                placeholder="admin@magcoff.com" 
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                                Password
                            </label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-transparent focus:bg-white focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all outline-none font-medium text-gray-900 placeholder-gray-400 shadow-sm" 
                                placeholder="••••••••" 
                            />
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl text-center font-medium animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={loading} 
                            className="w-full py-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-2xl shadow-lg shadow-lime-500/40 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-lg mt-4"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Switch to Log In */}
                    <div className="text-center text-gray-500 font-medium">
                        Already have an account?{' '}
                        <button 
                            onClick={onSwitchToLogin} 
                            className="font-bold text-lime-600 hover:text-lime-700 hover:underline ml-1 focus:outline-none"
                        >
                            Log In Here
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUpPage;