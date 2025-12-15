import React from 'react';

const NotificationsPanel = () => {
    
    // Mock Data
    const notifications = [
        { id: 1, title: "Low Battery Warning", desc: "Cart-01 is at 14% battery. Needs charging.", time: "2 min ago", type: "alert" },
        { id: 2, title: "Unusual Activity", desc: "Cart-04 has been idle in Aisle 3 for 20 mins.", time: "15 min ago", type: "warning" },
        { id: 3, title: "System Update", desc: "Firmware v2.4.0 installed successfully.", time: "1 hr ago", type: "success" },
        { id: 4, title: "Shift Handover", desc: "Morning shift summary report is ready.", time: "3 hrs ago", type: "info" },
    ];

    return (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-fade-in-up transform origin-top-right">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center backdrop-blur-sm">
                <h3 className="font-bold text-slate-800">Notifications</h3>
                <button className="text-xs font-bold text-lime-600 hover:text-lime-700">Mark all read</button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="flex items-start space-x-3">
                            {/* Icon based on type */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1
                                ${notif.type === 'alert' ? 'bg-red-100 text-red-600' : 
                                  notif.type === 'warning' ? 'bg-orange-100 text-orange-600' : 
                                  notif.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                
                                {notif.type === 'alert' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                                {notif.type === 'warning' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                {notif.type === 'success' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                {notif.type === 'info' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800 group-hover:text-lime-700 transition-colors">{notif.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.desc}</p>
                                <p className="text-[10px] text-slate-400 mt-2 font-mono">{notif.time}</p>
                            </div>
                            
                            {/* Unread Dot */}
                            {notif.id <= 2 && (
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 text-center">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">View All Notifications</button>
            </div>
        </div>
    );
};

export default NotificationsPanel;