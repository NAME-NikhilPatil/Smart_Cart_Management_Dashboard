import React from 'react';

// --- Mock Data for specific metrics ---
// In a real app, you would fetch this ID from an API
const DETAILED_DATA: any = {
    'revenue': {
        title: "Live Revenue Analysis",
        value: "₹45,230",
        trend: "+12.5%",
        description: "Total net sales generated across all active carts today.",
        color: "lime",
        columns: ["Transaction ID", "Cart ID", "Items", "Time", "Amount"],
        rows: [
            ["#TX-9821", "Cart-04", "12 items", "10:42 AM", "₹1,240"],
            ["#TX-9820", "Cart-11", "4 items", "10:38 AM", "₹450"],
            ["#TX-9819", "Cart-02", "28 items", "10:15 AM", "₹3,100"],
            ["#TX-9818", "Cart-45", "2 items", "10:10 AM", "₹120"],
            ["#TX-9817", "Cart-09", "8 items", "09:55 AM", "₹890"],
        ]
    },
    'carts': {
        title: "Active Fleet Utilization",
        value: "35 / 50",
        trend: "+5.2%",
        description: "Real-time tracking of carts currently engaged in shopping sessions.",
        color: "blue",
        columns: ["Cart ID", "Status", "Battery", "Location", "Session Time"],
        rows: [
            ["Cart-04", "Active", "82%", "Aisle 4", "42 min"],
            ["Cart-12", "Checkout", "12%", "Zone C", "15 min"],
            ["Cart-08", "Idle", "98%", "Docking", "0 min"],
            ["Cart-22", "Active", "45%", "Aisle 1", "22 min"],
            ["Cart-01", "Maintenance", "0%", "Service", "--"],
        ]
    },
    // Fallback for other widgets for demo purposes
    'default': {
        title: "Metric Analytics",
        value: "Data View",
        trend: "+0.0%",
        description: "Detailed breakdown and historical analysis of this metric.",
        color: "gray",
        columns: ["Metric ID", "Timestamp", "Event", "Status", "Value"],
        rows: [
            ["M-001", "10:00 AM", "Sync", "OK", "98%"],
            ["M-002", "09:45 AM", "Update", "OK", "95%"],
            ["M-003", "09:30 AM", "Check", "OK", "96%"],
        ]
    }
};

interface MetricDetailPageProps {
    metricId: string;
    onBack: () => void;
}

const MetricDetailPage: React.FC<MetricDetailPageProps> = ({ metricId, onBack }) => {
    // Select specific data or fallback to default
    const data = DETAILED_DATA[metricId] || DETAILED_DATA['default'];
    
    // Dynamic color classes
    const colors: any = {
        lime: "bg-lime-500 text-lime-600",
        blue: "bg-blue-500 text-blue-600",
        green: "bg-emerald-500 text-emerald-600",
        purple: "bg-purple-500 text-purple-600",
        orange: "bg-orange-500 text-orange-600",
        indigo: "bg-indigo-500 text-indigo-600",
        cyan: "bg-cyan-500 text-cyan-600",
        rose: "bg-rose-500 text-rose-600",
        gray: "bg-slate-500 text-slate-600",
    };
    
    const themeColor = data.color || 'lime';

    return (
        <div className="space-y-8 animate-fade-in-up">
            
            {/* --- Header --- */}
            <div className="flex items-center justify-between">
                <button 
                    onClick={onBack}
                    className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm group"
                >
                    <svg className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Dashboard
                </button>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">Export CSV</button>
                    <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 shadow-lg">Print Report</button>
                </div>
            </div>

            {/* --- Main Hero Card --- */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden">
                {/* Decorative BG */}
                <div className={`absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full -mr-16 -mt-16 ${colors[themeColor].split(' ')[0]}`}></div>
                
                <div className="relative z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-opacity-10 ${colors[themeColor].replace('text-', 'bg-').replace('500', '100')} ${colors[themeColor].split(' ')[1]}`}>
                        {metricId.toUpperCase()}
                    </span>
                    <h1 className="text-4xl font-extrabold text-slate-800 mt-4 mb-2">{data.value}</h1>
                    <h2 className="text-xl font-bold text-slate-600">{data.title}</h2>
                    <p className="text-slate-400 max-w-lg mt-2">{data.description}</p>
                </div>

                {/* Big Chart Visual (Mock) */}
                <div className="mt-8 md:mt-0 flex items-end space-x-3 h-32">
                    {[40, 65, 50, 80, 60, 90, 70, 95, 100, 85, 60, 75].map((h, i) => (
                        <div key={i} className="w-4 rounded-t-md bg-slate-100 relative group">
                            <div 
                                style={{ height: `${h}%` }} 
                                className={`absolute bottom-0 w-full rounded-t-md opacity-80 group-hover:opacity-100 transition-all duration-300 ${colors[themeColor].split(' ')[0]}`}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Detailed Table Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Data Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 text-lg">Recent Transactions</h3>
                        <button className="text-sm text-blue-600 font-bold hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    {data.columns.map((col: string, i: number) => (
                                        <th key={i} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.rows.map((row: string[], i: number) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-6 py-4 text-sm font-medium text-slate-700">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Insights Panel */}
                <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                        <h3 className="font-bold text-lg mb-4">AI Insights</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                                <p className="text-sm text-slate-300">Performance is <span className="text-green-400 font-bold">12% higher</span> than last week average.</p>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                                <p className="text-sm text-slate-300">Peak activity expected between <span className="text-white font-bold">4 PM - 6 PM</span>.</p>
                            </li>
                        </ul>
                        <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">Generate Report</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Configuration</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Real-time updates</span>
                                <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Email Alerts</span>
                                <div className="w-10 h-5 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MetricDetailPage;