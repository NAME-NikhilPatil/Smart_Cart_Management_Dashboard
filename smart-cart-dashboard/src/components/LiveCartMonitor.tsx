import React, { useState, useEffect, useRef } from 'react';

// --- INTERFACES ---
interface CartItem {
    productId: string;
    name: string;
    price: number;
    qty: number;
}

interface CartData {
    _id: string;
    cartId: string;
    itemCount: number;
    totalBill: number;
    lastUpdated: string;
    items: CartItem[];
    status: string;
}

// ✅ YOUR BACKEND URL
const API_URL = "https://smart-cart-management-backend-hqhedudtd4cnfng8.centralindia-01.azurewebsites.net/api/live-carts";
const REFRESH_RATE_MS = 2000; 

const LiveCartMonitor: React.FC = () => {
  const [carts, setCarts] = useState<CartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const isFetching = useRef(false);

  const fetchLiveData = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      
      let newData: CartData[] = [];
      if (result.success && Array.isArray(result.data)) {
          newData = result.data;
      } else if (Array.isArray(result)) {
          newData = result;
      }
      setCarts(newData);
    } catch (error) {
      console.error("Sync Error:", error);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, REFRESH_RATE_MS);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-48 bg-white rounded-3xl border border-slate-100 shadow-sm mx-1">
        <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
            <div className="text-slate-400 font-medium text-sm">Connecting to Live Fleet...</div>
        </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2 pt-2">
        <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Live Fleet Monitor</h3>
            <p className="text-sm text-slate-500 mt-1">Real-time telemetry from active smart trolleys</p>
        </div>
        
        {/* Live Indicator Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Grid of Carts - Fixed Padding/Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-1 pb-4">
        {carts.map((cart) => (
          <CartCard key={cart._id || cart.cartId} cart={cart} />
        ))}
      </div>
      
      {/* Empty State */}
      {!loading && carts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-100 mx-1">
          <div className="p-4 bg-slate-50 rounded-full mb-3">
             <span className="text-3xl grayscale opacity-50">🛒</span>
          </div>
          <p className="text-slate-600 font-semibold text-lg">No Active Carts</p>
          <p className="text-sm text-slate-400 mt-1">Waiting for shopper activity...</p>
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENT: "MagCoff" Style Card ---
const CartCard: React.FC<{ cart: CartData }> = ({ cart }) => {
  const lastActiveTime = new Date(cart.lastUpdated);
  const isOnline = (new Date().getTime() - lastActiveTime.getTime()) < 60000; // 60s timeout

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full ring-1 ring-slate-50">
      
      {/* 1. Header: Clean & Minimal */}
      <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
            {/* Status Bar Indicator */}
            <div className={`w-1.5 h-10 rounded-full ${isOnline ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-300'}`}></div>
            <div>
                <h4 className="font-extrabold text-slate-800 text-lg tracking-tight">{cart.cartId}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        {isOnline ? "Online" : "Offline"}
                    </span>
                </div>
            </div>
        </div>
        <div className="text-right">
             <div className="text-2xl font-black text-slate-800 tracking-tight">₹{cart.totalBill}</div>
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{cart.itemCount} Items</div>
        </div>
      </div>

      {/* 2. Items List: Simple Table */}
      <div className="flex-1 bg-white p-0 overflow-y-auto max-h-[200px] custom-scrollbar">
         {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-slate-300 italic">
                <span className="text-xl mb-1 opacity-50">🛍️</span>
                <span className="text-xs">Cart is empty</span>
            </div>
         ) : (
            <table className="w-full text-sm text-left">
               <thead className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50/80 sticky top-0 backdrop-blur-sm z-10">
                  <tr>
                     <th className="px-5 py-2 font-bold tracking-wider">Item</th>
                     <th className="px-2 py-2 text-right tracking-wider">Qty</th>
                     <th className="px-5 py-2 text-right tracking-wider">Price</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {cart.items.map((item, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-5 py-3 font-medium text-slate-600 truncate max-w-[140px] group-hover:text-slate-900 transition-colors">
                            {item.name}
                        </td>
                        <td className="px-2 py-3 text-right font-mono text-slate-400 text-xs">
                            x{item.qty}
                        </td>
                        <td className="px-5 py-3 text-right font-bold text-slate-700">
                            ₹{item.price * item.qty}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>

      {/* 3. Footer: Subtle Timestamp */}
      <div className="px-5 py-3 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
         <span>Last Sync</span>
         <span className="font-mono">{lastActiveTime.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default LiveCartMonitor;