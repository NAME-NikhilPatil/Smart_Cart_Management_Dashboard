import React, { useState } from 'react';

// --- Components ---

// 1. Metric Card (Top Row)
const MetricCard = ({ title, value, change, isPositive, icon }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${isPositive ? 'bg-lime-50 text-lime-600' : 'bg-orange-50 text-orange-500'}`}>
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium">
            <span className={`${isPositive ? 'text-lime-600' : 'text-red-500'} flex items-center`}>
                {isPositive ? '↑' : '↓'} {change}
            </span>
            <span className="text-slate-400 ml-2">vs last week</span>
        </div>
    </div>
);

// 2. CSS Bar Chart for Revenue
const RevenueChart = () => {
    const data = [45, 70, 55, 85, 60, 95, 75];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg">Weekly Revenue</h3>
                <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-1 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last Month</option>
                </select>
            </div>
            
            <div className="flex-1 flex items-end space-x-4">
                {data.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group">
                        <div className="relative w-full bg-slate-100 rounded-t-xl overflow-hidden h-48">
                            {/* The Bar */}
                            <div 
                                style={{ height: `${h}%` }} 
                                className="absolute bottom-0 w-full bg-lime-500 rounded-t-xl opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:bg-lime-600"
                            >
                                {/* Tooltip on Hover */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    ₹{(h * 1200).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-xs font-bold text-slate-400 mt-3">{days[i]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 3. Aisle Heatmap (Simulating Computer Vision Data)
const AisleHeatmap = () => {
    const aisles = [
        { name: 'Dairy', traffic: 85, color: 'bg-red-500' },
        { name: 'Produce', traffic: 60, color: 'bg-orange-400' },
        { name: 'Bakery', traffic: 40, color: 'bg-yellow-400' },
        { name: 'Frozen', traffic: 30, color: 'bg-lime-400' },
        { name: 'Snacks', traffic: 90, color: 'bg-red-600' },
        { name: 'Drinks', traffic: 55, color: 'bg-orange-300' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg mb-1">Store Traffic Heatmap</h3>
            <p className="text-xs text-slate-400 mb-6">Real-time dwell time tracking</p>
            
            <div className="grid grid-cols-2 gap-4">
                {aisles.map((aisle, i) => (
                    <div key={i} className="relative group cursor-pointer">
                        <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                            <span>{aisle.name}</span>
                            <span>{aisle.traffic}% Load</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                style={{ width: `${aisle.traffic}%` }} 
                                className={`h-full rounded-full ${aisle.color} transition-all duration-1000`}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Visual Representation */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="grid grid-cols-3 gap-2 h-32">
                    <div className="bg-red-100 rounded-lg flex items-center justify-center text-red-800 text-xs font-bold border border-red-200">Snacks (High)</div>
                    <div className="bg-orange-100 rounded-lg flex items-center justify-center text-orange-800 text-xs font-bold border border-orange-200">Produce</div>
                    <div className="bg-lime-100 rounded-lg flex items-center justify-center text-lime-800 text-xs font-bold border border-lime-200">Frozen</div>
                    <div className="bg-red-50 rounded-lg flex items-center justify-center text-red-800 text-xs font-bold border border-red-200">Dairy (High)</div>
                    <div className="bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-xs font-bold">Checkout</div>
                    <div className="bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-800 text-xs font-bold border border-yellow-200">Bakery</div>
                </div>
            </div>
        </div>
    );
};

// 4. AI Insights Card
const AiInsights = () => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                    <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-bold text-lg">MaGCoff AI Insights</h3>
            </div>
            
            <div className="space-y-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-xs font-bold text-lime-400 uppercase mb-1">Pattern Detected</p>
                    <p className="text-sm text-slate-200">Customers buying <span className="font-bold text-white">Organic Milk</span> are 85% likely to buy <span className="font-bold text-white">Whole Wheat Bread</span>. Consider placing them closer.</p>
                </div>
                
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <p className="text-xs font-bold text-orange-400 uppercase mb-1">Stock Alert</p>
                    <p className="text-sm text-slate-200">Traffic in <span className="font-bold text-white">Aisle 3 (Snacks)</span> exceeds current stock velocity. Restock expected in 45 mins.</p>
                </div>
            </div>

            <button className="mt-5 w-full py-2.5 bg-lime-600 hover:bg-lime-500 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center">
                Generate Full AI Report
            </button>
        </div>
    </div>
);

// --- Main Page Component ---
const AnalyticsPage = () => {
    return (
        <div className="space-y-6">
            {/* 1. Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard 
                    title="Total Revenue" value="₹45,230" change="12%" isPositive={true} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2mc-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></svg>}
                />
                <MetricCard 
                    title="Avg. Dwell Time" value="24m 30s" change="5%" isPositive={false} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
                <MetricCard 
                    title="Conversion Rate" value="68.4%" change="2.1%" isPositive={true} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                />
                <MetricCard 
                    title="Active Shoppers" value="84" change="8%" isPositive={true} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
            </div>

            {/* 2. Main Visuals Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-96">
                <div className="lg:col-span-2 h-full">
                    <RevenueChart />
                </div>
                <div className="h-full">
                    <AiInsights />
                </div>
            </div>

            {/* 3. Heatmap & Products Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AisleHeatmap />
                
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="font-bold text-slate-800 text-lg">Top Performing Products</h3>
                         <button className="text-xs font-bold text-lime-600 hover:underline">View All</button>
                    </div>
                    <div className="space-y-5">
                        {[
                            { name: 'Organic Milk (1L)', sales: 450, pct: 90 },
                            { name: 'Whole Wheat Bread', sales: 320, pct: 75 },
                            { name: 'Fresh Avocados', sales: 280, pct: 60 },
                            { name: 'Basmati Rice (5kg)', sales: 150, pct: 40 },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1 font-medium">
                                    <span className="text-slate-700">{item.name}</span>
                                    <span className="text-slate-500">{item.sales} Sold</span>
                                </div>
                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        style={{ width: `${item.pct}%` }} 
                                        className="h-full bg-gradient-to-r from-lime-500 to-lime-400 rounded-full"
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;