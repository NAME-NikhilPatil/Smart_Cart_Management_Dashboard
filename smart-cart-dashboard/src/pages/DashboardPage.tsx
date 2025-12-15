// import React, { useState } from 'react';

// // --- Interfaces ---
// interface KpiData {
//   liveShoppers: number;
//   cartsInUse: number;
//   totalCarts: number;
//   avgBasketSize: number;
//   todaysRevenue: number;
//   totalProductsSold: number;
//   productsInCarts: number;
//   productsInStore: number;
// }

// interface Activity {
//   time: string;
//   text: string;
//   type: 'add' | 'success' | 'remove' | 'alert' | 'info';
// }

// // --- KPI Card Component ---
// interface KpiCardProps {
//     id: string;
//     title: string;
//     value: string | number;
//     subtext: string;
//     icon: React.ReactNode;
//     trend?: number;
//     color: 'blue' | 'green' | 'purple' | 'orange' | 'lime' | 'indigo' | 'rose' | 'cyan';
//     chartData: number[];
//     onClick: (id: string) => void;
// }

// const KpiCard: React.FC<KpiCardProps> = ({ id, title, value, subtext, icon, trend, color, chartData, onClick }) => {
    
//     const styleMap = {
//         lime:   { iconBg: "bg-lime-100", iconText: "text-lime-700", bar: "bg-lime-500", badge: "bg-lime-100 text-lime-700" },
//         blue:   { iconBg: "bg-blue-100", iconText: "text-blue-700", bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
//         orange: { iconBg: "bg-orange-100", iconText: "text-orange-700", bar: "bg-orange-500", badge: "bg-orange-100 text-orange-700" },
//         purple: { iconBg: "bg-purple-100", iconText: "text-purple-700", bar: "bg-purple-500", badge: "bg-purple-100 text-purple-700" },
//         green:  { iconBg: "bg-emerald-100", iconText: "text-emerald-700", bar: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
//         indigo: { iconBg: "bg-indigo-100", iconText: "text-indigo-700", bar: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700" },
//         cyan:   { iconBg: "bg-cyan-100", iconText: "text-cyan-700", bar: "bg-cyan-500", badge: "bg-cyan-100 text-cyan-700" },
//         rose:   { iconBg: "bg-rose-100", iconText: "text-rose-700", bar: "bg-rose-500", badge: "bg-rose-100 text-rose-700" },
//     };

//     const theme = styleMap[color];

//     return (
//         <div 
//             onClick={() => onClick(id)}
//             className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-pointer"
//         >
//             <div className="flex justify-between items-start mb-4">
//                 <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.iconText}`}>
//                     {icon}
//                 </div>
//                 {trend !== undefined && (
//                     <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                         {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
//                     </span>
//                 )}
//             </div>
            
//             <div className="relative z-10">
//                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
//                 <h3 className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">{value}</h3>
//                 <p className="text-slate-400 text-xs mt-1 font-medium">{subtext}</p>
//             </div>

//             <div className="flex items-end space-x-1 h-10 mt-4">
//                 {chartData.map((h, i) => (
//                     <div 
//                         key={i} 
//                         style={{ height: `${h}%` }} 
//                         className={`flex-1 rounded-t-sm ${theme.bar} opacity-60 group-hover:opacity-100 transition-all duration-300`}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // --- Main Dashboard Page ---
// interface DashboardPageProps {
//     onNavigate: (page: string, metricId?: string) => void;
// }

// const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
    
//     const [kpi] = useState<KpiData>({
//         liveShoppers: 84, cartsInUse: 35, totalCarts: 50, avgBasketSize: 851,
//         todaysRevenue: 45230, totalProductsSold: 1240, productsInCarts: 312, productsInStore: 15400
//     });

//     const [activities] = useState<Activity[]>([
//         { time: '10:42 AM', text: 'Cart-04: Added "Organic Milk" (₹78)', type: 'add' },
//         { time: '10:41 AM', text: 'Cart-12: Checkout Initiated', type: 'success' },
//         { time: '10:38 AM', text: 'Cart-08: Removed "Bread"', type: 'remove' },
//         { time: '10:35 AM', text: 'Cart-01: Low Battery Warning (14%)', type: 'alert' },
//         { time: '10:30 AM', text: 'System: New price sync completed', type: 'info' },
//     ]);

//     const Icons = {
//         Revenue: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2mc-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></svg>,
//         Carts: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
//         Basket: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
//         Shoppers: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
//         Products: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
//         Inventory: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
//         InCart: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
//         Alert: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//     };

//     const handleCardClick = (id: string) => {
//         onNavigate('MetricDetail', id);
//     };

//     return (
//         <div className="space-y-8 animate-fade-in pb-12">
            
//             {/* 1. 8-Grid Widgets */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <KpiCard id="revenue" onClick={handleCardClick} title="Live Revenue" value={`₹${kpi.todaysRevenue.toLocaleString()}`} subtext="Net sales today" icon={Icons.Revenue} trend={12.5} color="lime" chartData={[40, 60, 55, 80, 65, 90, 75, 95, 100]} />
//                 <KpiCard id="carts" onClick={handleCardClick} title="Active Carts" value={`${kpi.cartsInUse} / ${kpi.totalCarts}`} subtext="70% Utilization" icon={Icons.Carts} trend={5.2} color="blue" chartData={[20, 30, 45, 50, 60, 70, 65, 70, 72]} />
//                 <KpiCard id="basket" onClick={handleCardClick} title="Avg. Basket" value={`₹${kpi.avgBasketSize}`} subtext="Per active session" icon={Icons.Basket} trend={-2.4} color="orange" chartData={[80, 75, 70, 72, 68, 65, 70, 72, 68]} />
//                 <KpiCard id="products" onClick={handleCardClick} title="Live Products" value={kpi.productsInCarts} subtext="Items currently in carts" icon={Icons.InCart} trend={8.1} color="purple" chartData={[10, 20, 30, 50, 70, 80, 85, 90, 95]} />
                
//                 <KpiCard id="sales" onClick={handleCardClick} title="Total Sales" value={kpi.totalProductsSold} subtext="Units sold today" icon={Icons.Products} trend={15.4} color="green" chartData={[30, 45, 60, 75, 80, 85, 90, 95, 100]} />
//                 <KpiCard id="footfall" onClick={handleCardClick} title="Footfall" value={kpi.liveShoppers} subtext="Shoppers in-store" icon={Icons.Shoppers} trend={3.2} color="indigo" chartData={[20, 40, 50, 55, 60, 58, 62, 65, 60]} />
//                 <KpiCard id="inventory" onClick={handleCardClick} title="Inventory" value={(kpi.productsInStore/1000).toFixed(1) + 'k'} subtext="SKUs on floor" icon={Icons.Inventory} trend={0} color="cyan" chartData={[100, 98, 96, 94, 92, 90, 88, 86, 84]} />
//                 <KpiCard id="health" onClick={handleCardClick} title="Cart Health" value="98%" subtext="Fleet operational" icon={Icons.Alert} trend={-1.0} color="rose" chartData={[100, 100, 98, 98, 96, 98, 98, 97, 98]} />
//             </div>

//             {/* 2. Heatmap & Feed Split */}
//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
//                 {/* Left: Store Heatmap - REDESIGNED */}
//                 <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-lg p-8 flex flex-col overflow-hidden">
//                     <div className="flex justify-between items-center mb-6">
//                         <div>
//                             <h3 className="font-extrabold text-slate-800 text-2xl tracking-tight">Live Store Map</h3>
//                             <p className="text-sm text-slate-500 font-medium mt-1">Real-time cart positioning & zones</p>
//                         </div>
//                         <div className="flex space-x-2">
//                             {['High', 'Med', 'Low'].map((level, i) => (
//                                 <div key={i} className="flex items-center px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
//                                     <div className={`w-2.5 h-2.5 rounded-full mr-2 ${level === 'High' ? 'bg-red-500' : level === 'Med' ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
//                                     <span className="text-xs font-bold text-slate-600">{level}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
                    
//                     {/* Map Visualization Container */}
//                     <div className="flex-1 bg-slate-50/50 rounded-2xl relative overflow-hidden border border-slate-200 min-h-[450px] shadow-inner">
//                         {/* Floor Grid Pattern */}
//                         <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

//                         {/* --- ZONE: PRODUCE (Top Left) --- */}
//                         <div className="absolute top-6 left-6 w-[25%] h-40 bg-green-50/50 border-2 border-green-100 rounded-xl flex items-center justify-center">
//                              <span className="text-green-300 font-black tracking-widest text-xs uppercase rotate-0">Fresh Produce</span>
//                         </div>

//                         {/* --- ZONE: BAKERY/DAIRY (Top Right) --- */}
//                         <div className="absolute top-6 right-6 w-[25%] h-40 bg-orange-50/50 border-2 border-orange-100 rounded-xl flex items-center justify-center">
//                              <span className="text-orange-300 font-black tracking-widest text-xs uppercase rotate-0">Bakery & Dairy</span>
//                         </div>

//                         {/* --- ZONE: CENTER AISLES (Middle) --- */}
//                         {/* Aisle 1 */}
//                         <div className="absolute top-52 left-[15%] w-[18%] h-40 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
//                             <span className="text-slate-300 font-black tracking-widest text-xs rotate-90">AISLE 1</span>
//                         </div>
//                         {/* Aisle 2 */}
//                         <div className="absolute top-52 left-[41%] w-[18%] h-40 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
//                             <span className="text-slate-300 font-black tracking-widest text-xs rotate-90">AISLE 2</span>
//                         </div>
//                         {/* Aisle 3 */}
//                         <div className="absolute top-52 right-[15%] w-[18%] h-40 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
//                             <span className="text-slate-300 font-black tracking-widest text-xs rotate-90">AISLE 3</span>
//                         </div>

//                         {/* --- ZONE: CHECKOUT (Bottom) --- */}
//                         <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-dashed border-slate-300 flex justify-center items-center">
//                              <div className="flex space-x-12">
//                                 <div className="w-16 h-10 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-bold">REG 1</div>
//                                 <div className="w-16 h-10 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-bold">REG 2</div>
//                                 <div className="w-16 h-10 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-bold">REG 3</div>
//                              </div>
//                              <span className="absolute bottom-2 right-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">Exit</span>
//                         </div>

//                         {/* --- ACTIVE CARTS (Animated Dots) --- */}
                        
//                         {/* Cart: Produce Section (Moving) */}
//                         <div className="absolute top-16 left-20 w-4 h-4 flex items-center justify-center group cursor-pointer">
//                              <div className="absolute w-full h-full bg-lime-500 rounded-full animate-ping opacity-75"></div>
//                              <div className="relative w-3 h-3 bg-lime-600 rounded-full border-2 border-white shadow-md"></div>
//                              {/* Tooltip */}
//                              <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Cart-02</div>
//                         </div>

//                         {/* Cart: Aisle 2 (Static) */}
//                         <div className="absolute top-64 left-[48%] w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md group cursor-pointer">
//                             <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Cart-22</div>
//                         </div>

//                         {/* Cart: Checkout (Pulsing Red - Alert?) */}
//                         <div className="absolute bottom-10 left-[45%] w-4 h-4 flex items-center justify-center group cursor-pointer">
//                              <div className="absolute w-full h-full bg-red-500 rounded-full animate-pulse opacity-75"></div>
//                              <div className="relative w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md"></div>
//                              <div className="absolute -top-8 bg-red-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Cart-12 (Payment)</div>
//                         </div>

//                         {/* Cart: Bakery */}
//                         <div className="absolute top-24 right-24 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                        
//                     </div>
//                 </div>

//                 {/* Right: Feed & Battery */}
//                 <div className="space-y-8">
                    
//                     {/* Live Feed - Timeline Style */}
//                     <div className="bg-white rounded-3xl border border-slate-100 shadow-lg flex flex-col h-[450px] overflow-hidden">
//                          <div className="p-6 border-b border-slate-100 bg-white z-10">
//                             <div className="flex justify-between items-center">
//                                 <h3 className="font-extrabold text-slate-800 text-lg">Activity Log</h3>
//                                 <span className="flex items-center text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
//                                     <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
//                                     LIVE
//                                 </span>
//                             </div>
//                         </div>
                        
//                         <div className="flex-1 overflow-y-auto p-6 relative">
//                             {/* Vertical Timeline Line */}
//                             <div className="absolute left-[29px] top-0 bottom-0 w-0.5 bg-slate-100"></div>

//                             <div className="space-y-6 relative z-10">
//                                 {activities.map((act, i) => (
//                                     <div key={i} className="flex group">
//                                         {/* Timeline Dot */}
//                                         <div className="mr-4 flex-shrink-0">
//                                             <div className={`w-3 h-3 mt-1.5 rounded-full border-2 border-white shadow-sm ${
//                                                 act.type === 'alert' ? 'bg-red-500' : 
//                                                 act.type === 'success' ? 'bg-green-500' : 
//                                                 act.type === 'add' ? 'bg-lime-500' : 'bg-blue-400'
//                                             } ring-4 ring-slate-50 group-hover:ring-slate-100 transition-all`}></div>
//                                         </div>
                                        
//                                         {/* Content */}
//                                         <div className="flex-1 pb-1">
//                                             <div className="flex justify-between items-center mb-1">
//                                                 <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
//                                                      act.type === 'alert' ? 'bg-red-50 text-red-600' : 
//                                                      act.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
//                                                 }`}>{act.type}</span>
//                                                 <span className="text-[10px] font-mono text-slate-400">{act.time}</span>
//                                             </div>
//                                             <p className="text-sm text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{act.text}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Battery Widget - Dark Mode Aesthetics */}
//                     <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 relative overflow-hidden text-white">
//                         {/* Glow Effect */}
//                         <div className="absolute top-0 right-0 w-40 h-40 bg-lime-500 blur-[60px] opacity-20 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                        
//                         <div className="relative z-10">
//                             <div className="flex justify-between items-center mb-6">
//                                 <div>
//                                     <h3 className="font-bold text-lg">Fleet Power</h3>
//                                     <p className="text-xs text-slate-400">Battery health overview</p>
//                                 </div>
//                                 <div className="p-2 bg-slate-800 rounded-lg">
//                                     <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
//                                 </div>
//                             </div>
                            
//                             <div className="space-y-5">
//                                 <div>
//                                     <div className="flex justify-between text-xs font-bold mb-2 text-slate-300"><span>Optimal (&gt;70%)</span><span className="text-lime-400">25 Carts</span></div>
//                                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-lime-500 w-[65%] shadow-[0_0_8px_rgba(132,204,22,0.6)]"></div></div>
//                                 </div>
//                                 <div>
//                                     <div className="flex justify-between text-xs font-bold mb-2 text-slate-300"><span>Moderate</span><span className="text-yellow-400">15 Carts</span></div>
//                                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[30%]"></div></div>
//                                 </div>
//                                 <div>
//                                     <div className="flex justify-between text-xs font-bold mb-2 text-slate-300"><span>Critical</span><span className="text-red-400">10 Carts</span></div>
//                                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[15%] animate-pulse"></div></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;


import React, { useState } from 'react';

// @ts-ignore
import LiveCartMonitor from '../components/LiveCartMonitor';


// --- Interfaces ---
interface KpiData {
  liveShoppers: number;
  cartsInUse: number;
  totalCarts: number;
  avgBasketSize: number;
  todaysRevenue: number;
  totalProductsSold: number;
  productsInCarts: number;
  productsInStore: number;
}

interface Activity {
  time: string;
  text: string;
  type: 'add' | 'success' | 'remove' | 'alert' | 'info';
}

// --- KPI Card Component ---
interface KpiCardProps {
    id: string;
    title: string;
    value: string | number;
    subtext: string;
    icon: React.ReactNode;
    trend?: number;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'lime' | 'indigo' | 'rose' | 'cyan';
    chartData: number[];
    onClick: (id: string) => void;
}

const KpiCard: React.FC<KpiCardProps> = ({ id, title, value, subtext, icon, trend, color, chartData, onClick }) => {
    
    const styleMap = {
        lime:   { iconBg: "bg-lime-100", iconText: "text-lime-700", bar: "bg-lime-500", badge: "bg-lime-100 text-lime-700" },
        blue:   { iconBg: "bg-blue-100", iconText: "text-blue-700", bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
        orange: { iconBg: "bg-orange-100", iconText: "text-orange-700", bar: "bg-orange-500", badge: "bg-orange-100 text-orange-700" },
        purple: { iconBg: "bg-purple-100", iconText: "text-purple-700", bar: "bg-purple-500", badge: "bg-purple-100 text-purple-700" },
        green:  { iconBg: "bg-emerald-100", iconText: "text-emerald-700", bar: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
        indigo: { iconBg: "bg-indigo-100", iconText: "text-indigo-700", bar: "bg-indigo-500", badge: "bg-indigo-100 text-indigo-700" },
        cyan:   { iconBg: "bg-cyan-100", iconText: "text-cyan-700", bar: "bg-cyan-500", badge: "bg-cyan-100 text-cyan-700" },
        rose:   { iconBg: "bg-rose-100", iconText: "text-rose-700", bar: "bg-rose-500", badge: "bg-rose-100 text-rose-700" },
    };

    const theme = styleMap[color];

    return (
        <div 
            onClick={() => onClick(id)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-pointer"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.iconText}`}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
            
            <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-extrabold text-slate-800 mt-1 tracking-tight">{value}</h3>
                <p className="text-slate-400 text-xs mt-1 font-medium">{subtext}</p>
            </div>

            <div className="flex items-end space-x-1 h-10 mt-4">
                {chartData.map((h, i) => (
                    <div 
                        key={i} 
                        style={{ height: `${h}%` }} 
                        className={`flex-1 rounded-t-sm ${theme.bar} opacity-60 group-hover:opacity-100 transition-all duration-300`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

// --- Main Dashboard Page ---
interface DashboardPageProps {
    onNavigate: (page: string, metricId?: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
    
    const [kpi] = useState<KpiData>({
        liveShoppers: 84, cartsInUse: 35, totalCarts: 50, avgBasketSize: 851,
        todaysRevenue: 45230, totalProductsSold: 1240, productsInCarts: 312, productsInStore: 15400
    });

    const [activities] = useState<Activity[]>([
        { time: '10:42 AM', text: 'Cart-04: Added "Organic Milk" (₹78)', type: 'add' },
        { time: '10:41 AM', text: 'Cart-12: Checkout Initiated', type: 'success' },
        { time: '10:38 AM', text: 'Cart-08: Removed "Bread"', type: 'remove' },
        { time: '10:35 AM', text: 'Cart-01: Low Battery Warning (14%)', type: 'alert' },
        { time: '10:30 AM', text: 'System: New price sync completed', type: 'info' },
    ]);

    const Icons = {
        Revenue: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2mc-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></svg>,
        Carts: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        Basket: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
        Shoppers: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        Products: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
        Inventory: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
        InCart: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
        Alert: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    };

    const handleCardClick = (id: string) => {
        onNavigate('MetricDetail', id);
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            
            {/* 1. 8-Grid Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard id="revenue" onClick={handleCardClick} title="Live Revenue" value={`₹${kpi.todaysRevenue.toLocaleString()}`} subtext="Net sales today" icon={Icons.Revenue} trend={12.5} color="lime" chartData={[40, 60, 55, 80, 65, 90, 75, 95, 100]} />
                <KpiCard id="carts" onClick={handleCardClick} title="Active Carts" value={`${kpi.cartsInUse} / ${kpi.totalCarts}`} subtext="70% Utilization" icon={Icons.Carts} trend={5.2} color="blue" chartData={[20, 30, 45, 50, 60, 70, 65, 70, 72]} />
                <KpiCard id="basket" onClick={handleCardClick} title="Avg. Basket" value={`₹${kpi.avgBasketSize}`} subtext="Per active session" icon={Icons.Basket} trend={-2.4} color="orange" chartData={[80, 75, 70, 72, 68, 65, 70, 72, 68]} />
                <KpiCard id="products" onClick={handleCardClick} title="Live Products" value={kpi.productsInCarts} subtext="Items currently in carts" icon={Icons.InCart} trend={8.1} color="purple" chartData={[10, 20, 30, 50, 70, 80, 85, 90, 95]} />
                
                <KpiCard id="sales" onClick={handleCardClick} title="Total Sales" value={kpi.totalProductsSold} subtext="Units sold today" icon={Icons.Products} trend={15.4} color="green" chartData={[30, 45, 60, 75, 80, 85, 90, 95, 100]} />
                <KpiCard id="footfall" onClick={handleCardClick} title="Footfall" value={kpi.liveShoppers} subtext="Shoppers in-store" icon={Icons.Shoppers} trend={3.2} color="indigo" chartData={[20, 40, 50, 55, 60, 58, 62, 65, 60]} />
                <KpiCard id="inventory" onClick={handleCardClick} title="Inventory" value={(kpi.productsInStore/1000).toFixed(1) + 'k'} subtext="SKUs on floor" icon={Icons.Inventory} trend={0} color="cyan" chartData={[100, 98, 96, 94, 92, 90, 88, 86, 84]} />
                <KpiCard id="health" onClick={handleCardClick} title="Cart Health" value="98%" subtext="Fleet operational" icon={Icons.Alert} trend={-1.0} color="rose" chartData={[100, 100, 98, 98, 96, 98, 98, 97, 98]} />
            </div>

            {/* --- NEW SECTION: LIVE CART MONITOR --- */}
            {/* This injects your real-time tracking component into the dashboard flow */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                <LiveCartMonitor />
            </div>
            {/* -------------------------------------- */}

            {/* 2. Heatmap & Feed Split */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Left: Store Heatmap - REDESIGNED */}
                <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-lg p-8 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-extrabold text-slate-800 text-2xl tracking-tight">Live Store Map</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Real-time cart positioning & zones</p>
                        </div>
                        <div className="flex space-x-2">
                            {['High', 'Med', 'Low'].map((level, i) => (
                                <div key={i} className="flex items-center px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className={`w-2.5 h-2.5 rounded-full mr-2 ${level === 'High' ? 'bg-red-500' : level === 'Med' ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
                                    <span className="text-xs font-bold text-slate-600">{level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Map Visualization Container */}
                    <div className="flex-1 bg-slate-50/50 rounded-2xl relative overflow-hidden border border-slate-200 min-h-[450px] shadow-inner">
                        {/* Floor Grid Pattern */}
                        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                        {/* --- ZONE: PRODUCE (Top Left) --- */}
                        <div className="absolute top-6 left-6 w-[25%] h-40 bg-green-50/50 border-2 border-green-100 rounded-xl flex items-center justify-center">
                             <span className="text-green-300 font-black tracking-widest text-xs uppercase rotate-0">Fresh Produce</span>
                        </div>

                        {/* --- ZONE: BAKERY/DAIRY (Top Right) --- */}
                        <div className="absolute top-6 right-6 w-[25%] h-40 bg-orange-50/50 border-2 border-orange-100 rounded-xl flex items-center justify-center">
                             <span className="text-orange-300 font-black tracking-widest text-xs uppercase rotate-0">Bakery & Dairy</span>
                        </div>

                        {/* --- ZONE: CENTER AISLES (Middle) --- */}
                        {/* Aisle 1 */}
                        <div className="absolute top-52 left-[15%] w-[18%] h-40 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
                            <span className="text-slate-300 font-black tracking-widest text-xs rotate-90">AISLE 1</span>
                        </div>
                        {/* Aisle 2 */}
                        <div className="absolute top-52 left-[41%] w-[18%] h-40 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
                            <span className="text-slate-300 font-black tracking-widest text-xs rotate-90">AISLE 2</span>
                        </div>
                        {/* Aisle 3 */}
                        <div className="absolute top-52 right-[15%] w-[18%] h-40 bg-white border-2 border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
                            <span className="text-slate-300 font-black tracking-widest text-xs rotate-90">AISLE 3</span>
                        </div>

                        {/* --- ZONE: CHECKOUT (Bottom) --- */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-dashed border-slate-300 flex justify-center items-center">
                             <div className="flex space-x-12">
                                <div className="w-16 h-10 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-bold">REG 1</div>
                                <div className="w-16 h-10 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-bold">REG 2</div>
                                <div className="w-16 h-10 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center text-[10px] text-slate-400 font-bold">REG 3</div>
                             </div>
                             <span className="absolute bottom-2 right-4 text-[10px] text-slate-400 font-black uppercase tracking-widest">Exit</span>
                        </div>

                        {/* --- ACTIVE CARTS (Animated Dots) --- */}
                        
                        {/* Cart: Produce Section (Moving) */}
                        <div className="absolute top-16 left-20 w-4 h-4 flex items-center justify-center group cursor-pointer">
                             <div className="absolute w-full h-full bg-lime-500 rounded-full animate-ping opacity-75"></div>
                             <div className="relative w-3 h-3 bg-lime-600 rounded-full border-2 border-white shadow-md"></div>
                             {/* Tooltip */}
                             <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Cart-02</div>
                        </div>

                        {/* Cart: Aisle 2 (Static) */}
                        <div className="absolute top-64 left-[48%] w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md group cursor-pointer">
                            <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Cart-22</div>
                        </div>

                        {/* Cart: Checkout (Pulsing Red - Alert?) */}
                        <div className="absolute bottom-10 left-[45%] w-4 h-4 flex items-center justify-center group cursor-pointer">
                             <div className="absolute w-full h-full bg-red-500 rounded-full animate-pulse opacity-75"></div>
                             <div className="relative w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md"></div>
                             <div className="absolute -top-8 bg-red-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">Cart-12 (Payment)</div>
                        </div>

                        {/* Cart: Bakery */}
                        <div className="absolute top-24 right-24 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
                        
                    </div>
                </div>

                {/* Right: Feed & Battery */}
                <div className="space-y-8">
                    
                    {/* Live Feed - Timeline Style */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-lg flex flex-col h-[450px] overflow-hidden">
                         <div className="p-6 border-b border-slate-100 bg-white z-10">
                            <div className="flex justify-between items-center">
                                <h3 className="font-extrabold text-slate-800 text-lg">Activity Log</h3>
                                <span className="flex items-center text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                                    LIVE
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 relative">
                            {/* Vertical Timeline Line */}
                            <div className="absolute left-[29px] top-0 bottom-0 w-0.5 bg-slate-100"></div>

                            <div className="space-y-6 relative z-10">
                                {activities.map((act, i) => (
                                    <div key={i} className="flex group">
                                        {/* Timeline Dot */}
                                        <div className="mr-4 flex-shrink-0">
                                            <div className={`w-3 h-3 mt-1.5 rounded-full border-2 border-white shadow-sm ${
                                                act.type === 'alert' ? 'bg-red-500' : 
                                                act.type === 'success' ? 'bg-green-500' : 
                                                act.type === 'add' ? 'bg-lime-500' : 'bg-blue-400'
                                            } ring-4 ring-slate-50 group-hover:ring-slate-100 transition-all`}></div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 pb-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                                     act.type === 'alert' ? 'bg-red-50 text-red-600' : 
                                                     act.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                                                }`}>{act.type}</span>
                                                <span className="text-[10px] font-mono text-slate-400">{act.time}</span>
                                            </div>
                                            <p className="text-sm text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">{act.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Battery Widget - Dark Mode Aesthetics */}
                    <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 relative overflow-hidden text-white">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-lime-500 blur-[60px] opacity-20 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-lg">Fleet Power</h3>
                                    <p className="text-xs text-slate-400">Battery health overview</p>
                                </div>
                                <div className="p-2 bg-slate-800 rounded-lg">
                                    <svg className="w-5 h-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                            </div>
                            
                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-300"><span>Optimal (&gt;70%)</span><span className="text-lime-400">25 Carts</span></div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-lime-500 w-[65%] shadow-[0_0_8px_rgba(132,204,22,0.6)]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-300"><span>Moderate</span><span className="text-yellow-400">15 Carts</span></div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 w-[30%]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 text-slate-300"><span>Critical</span><span className="text-red-400">10 Carts</span></div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[15%] animate-pulse"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;