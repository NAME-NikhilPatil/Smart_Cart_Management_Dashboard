import React, { useState } from 'react';

// --- Types ---
interface Cart {
    _id: string;
    cartId: string;
    status: 'In Use' | 'Available' | 'Charging' | 'Low Battery' | 'Assistance';
    battery: number;
    items: number;
    shopper: string;
    location: string;
    lastActive: string;
}

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'In Use': "bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/30",
        'Available': "bg-lime-50 text-lime-700 border-lime-100 ring-lime-500/30",
        'Charging': "bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/30",
        'Low Battery': "bg-orange-50 text-orange-700 border-orange-100 ring-orange-500/30",
        'Assistance': "bg-red-50 text-red-700 border-red-100 ring-red-500/30",
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ring-1 ${styles[status] || styles['Available']}`}>
            {status}
        </span>
    );
};

const CircularBattery = ({ level }: { level: number }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;
    
    let color = "text-lime-500";
    if (level < 50) color = "text-orange-500";
    if (level < 20) color = "text-red-500";

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 transform -rotate-90">
                <circle className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="24" cy="24" />
                <circle 
                    className={`${color} transition-all duration-1000 ease-out`} 
                    strokeWidth="4" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={offset} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r={radius} 
                    cx="24" 
                    cy="24" 
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-600">{level}%</span>
        </div>
    );
};

// --- Main Page Component ---
const CartsPage = ({ searchQuery }: { searchQuery: string }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock Data
    const mockCarts: Cart[] = [
        { _id: '1', cartId: 'C-001', status: 'In Use', battery: 85, items: 12, shopper: 'Nikhil P.', location: 'Aisle 4', lastActive: 'Just now' },
        { _id: '2', cartId: 'C-002', status: 'Available', battery: 100, items: 0, shopper: '-', location: 'Docking Stn', lastActive: '15m ago' },
        { _id: '3', cartId: 'C-003', status: 'Charging', battery: 45, items: 0, shopper: '-', location: 'Charging Bay', lastActive: '2h ago' },
        { _id: '4', cartId: 'C-004', status: 'Assistance', battery: 12, items: 5, shopper: 'Guest', location: 'Checkout', lastActive: '5m ago' },
        { _id: '5', cartId: 'C-005', status: 'In Use', battery: 67, items: 24, shopper: 'Amit S.', location: 'Aisle 2', lastActive: '1m ago' },
        { _id: '6', cartId: 'C-006', status: 'Available', battery: 92, items: 0, shopper: '-', location: 'Docking Stn', lastActive: '30m ago' },
    ];

    const filteredCarts = mockCarts.filter(c => {
        const matchesSearch = c.cartId.toLowerCase().includes(searchQuery.toLowerCase()) || c.shopper.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex h-full relative">
            {/* Main Content */}
            <div className={`flex-1 space-y-6 transition-all duration-300 ${selectedCart ? 'mr-96' : ''}`}>
                
                {/* Controls Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                        {['All', 'In Use', 'Available', 'Charging', 'Assistance'].map(status => (
                            <button 
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                                    filterStatus === status 
                                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/20' 
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-lime-600' : 'text-slate-400'}`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-lime-600' : 'text-slate-400'}`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCarts.map(cart => (
                            <div key={cart._id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                                {/* Selection Border */}
                                {selectedCart?._id === cart._id && <div className="absolute inset-0 border-2 border-lime-500 rounded-2xl pointer-events-none"></div>}

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-extrabold text-slate-800">{cart.cartId}</h3>
                                        <p className="text-xs text-slate-400 flex items-center mt-1">
                                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {cart.location}
                                        </p>
                                    </div>
                                    <StatusBadge status={cart.status} />
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <CircularBattery level={cart.battery} />
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Items</p>
                                            <p className="text-xl font-bold text-slate-800">{cart.items}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                            {cart.shopper === '-' ? '—' : cart.shopper.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium text-slate-600 truncate w-20">{cart.shopper}</span>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedCart(cart)}
                                        className="text-xs font-bold text-lime-600 hover:text-lime-700 hover:underline"
                                    >
                                        View Log
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left">
                             <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    {['Cart ID', 'Status', 'Battery', 'Location', 'Shopper', 'Items', 'Actions'].map(h => (
                                        <th key={h} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCarts.map(cart => (
                                    <tr key={cart._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-bold text-slate-800">{cart.cartId}</td>
                                        <td className="p-4"><StatusBadge status={cart.status} /></td>
                                        <td className="p-4 text-sm font-medium text-slate-600">{cart.battery}%</td>
                                        <td className="p-4 text-sm text-slate-500">{cart.location}</td>
                                        <td className="p-4 text-sm text-slate-600">{cart.shopper}</td>
                                        <td className="p-4 font-bold text-slate-800">{cart.items}</td>
                                        <td className="p-4">
                                            <button onClick={() => setSelectedCart(cart)} className="text-lime-600 font-bold text-xs hover:underline">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- Slide-out Details Panel --- */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 border-l border-slate-100 ${selectedCart ? 'translate-x-0' : 'translate-x-full'}`}>
                {selectedCart && (
                    <div className="h-full flex flex-col">
                        
                        {/* FIXED: Replaced black bg with white bg and border */}
                        <div className="p-6 bg-white border-b border-slate-100 flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">{selectedCart.cartId}</h2>
                                <p className="text-sm text-slate-500 flex items-center mt-1">
                                    <span className="w-2 h-2 bg-lime-500 rounded-full mr-2 animate-pulse"></span>
                                    Online • {selectedCart.location}
                                </p>
                            </div>
                            <button onClick={() => setSelectedCart(null)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Panel Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            
                            {/* Simulated Camera Feed */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Camera Feed</h4>
                                <div className="aspect-video bg-black rounded-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500">
                                        <span className="text-xs">Camera Stream Placeholder</span>
                                    </div>
                                    {/* Overlay */}
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-[10px] text-white font-mono backdrop-blur-sm">
                                        FPS: 30 | AI: Active
                                    </div>
                                </div>
                            </div>

                            {/* Cart Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-400 font-bold">Battery</p>
                                    <p className="text-xl font-bold text-slate-800 mt-1">{selectedCart.battery}%</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-400 font-bold">Items</p>
                                    <p className="text-xl font-bold text-slate-800 mt-1">{selectedCart.items}</p>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remote Actions</h4>
                                <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    Ping / Ring Cart
                                </button>
                                <button className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors flex items-center justify-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    Lock Wheels
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay Backdrop for Mobile */}
            {selectedCart && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setSelectedCart(null)}
                ></div>
            )}
        </div>
    );
};

export default CartsPage;