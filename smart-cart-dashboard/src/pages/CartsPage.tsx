import { useState, useEffect } from 'react';

// --- TypeScript Type Definition for a Cart ---
interface Cart {
  _id: string; // MongoDB uses _id
  cartId: string;
  status: 'In Use' | 'Available' | 'Charging' | 'Low Battery' | 'Assistance';
  battery: number;
  items: { name: string, price: number, quantity: number }[];
  shopperName?: string;
  lastUpdated?: string;
}

// --- Icon Components ---
const InUseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const AvailableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChargingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const LowBatteryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AssistanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

// --- Helper to get status styles ---
const getStatusStyles = (status: Cart['status']) => {
    switch (status) {
        case 'In Use': return { bg: 'bg-blue-100', text: 'text-blue-800', icon: <InUseIcon /> };
        case 'Available': return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <AvailableIcon /> };
        case 'Charging': return { bg: 'bg-green-100', text: 'text-green-800', icon: <ChargingIcon /> };
        case 'Low Battery': return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <LowBatteryIcon /> };
        case 'Assistance': return { bg: 'bg-red-100', text: 'text-red-800', icon: <AssistanceIcon /> };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <AvailableIcon /> };
    }
};

// --- Cart Details Modal Component ---
const CartDetailsModal = ({ cart, onClose }: { cart: Cart | null; onClose: () => void; }) => {
    if (!cart) return null;
    
    const statusStyles = getStatusStyles(cart.status);
    const totalItems = Array.isArray(cart.items) ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Cart-{cart.cartId} Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusStyles.bg} ${statusStyles.text}`}>
                        {statusStyles.icon} {cart.status}
                    </div>
                    {cart.shopperName && <p><strong>Shopper:</strong> {cart.shopperName}</p>}
                    <p><strong>Battery:</strong> {cart.battery}%</p>
                    <p><strong>Items in Cart:</strong> {totalItems}</p>
                    
                    {cart.items && cart.items.length > 0 && (
                        <div>
                            <h4 className="font-semibold mt-4 mb-2">Items List:</h4>
                            <ul className="list-disc list-inside bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
                                {cart.items.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="p-4 bg-gray-50 text-right rounded-b-lg">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">Close</button>
                </div>
            </div>
        </div>
    );
};

// --- Main CartsPage Component ---
const CartsPage = ({ searchQuery }: { searchQuery: string }) => {
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [allCarts, setAllCarts] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cartsUrl = 'https://smart-cart-management-erddb6awbrbtfgdh.centralindia-01.azurewebsites.net/api/carts?';

  useEffect(() => {
    const fetchCarts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(cartsUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch cart data.');
        }
        const data = await response.json();
        setAllCarts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarts();
  }, []);

  const filteredCarts = allCarts.filter(cart =>
    `cart-${cart.cartId}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Cart Fleet...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <CartDetailsModal cart={selectedCart} onClose={() => setSelectedCart(null)} />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Cart Fleet Management</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 border-b-2 border-slate-200">
            <tr>
              <th className="p-5 text-left text-sm font-semibold text-slate-800 uppercase tracking-wider">Cart ID</th>
              <th className="p-5 text-left text-sm font-semibold text-slate-800 uppercase tracking-wider">Status</th>
              <th className="p-5 text-left text-sm font-semibold text-slate-800 uppercase tracking-wider">Battery</th>
              <th className="p-5 text-center text-sm font-semibold text-slate-800 uppercase tracking-wider">Items</th>
              <th className="p-5 text-center text-sm font-semibold text-slate-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCarts.length > 0 ? (
              filteredCarts.map(cart => {
                const statusStyles = getStatusStyles(cart.status);
                const batteryColor = cart.battery > 50 ? 'bg-green-500' : cart.battery > 20 ? 'bg-yellow-500' : 'bg-red-500';
                // This logic now correctly calculates the total items from the array
                const totalItems = Array.isArray(cart.items) ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
                return (
                  <tr key={cart._id} className="hover:bg-slate-50 transition-colors duration-200">
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="text-base font-bold text-gray-900">Cart-{cart.cartId}</div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusStyles.bg} ${statusStyles.text}`}>
                        {statusStyles.icon}
                        {cart.status}
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-28 bg-gray-200 rounded-full h-2.5 mr-3">
                          <div className={`${batteryColor} h-2.5 rounded-full`} style={{ width: `${cart.battery}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{cart.battery}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-center">
                      <span className="text-base font-bold text-gray-900">{totalItems}</span>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-center">
                      <button 
                        onClick={() => setSelectedCart(cart)} 
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-20">
                  <h3 className="text-xl font-semibold text-gray-700">No Carts Found</h3>
                  <p className="text-gray-500 mt-2">No carts match your search for "{searchQuery}".</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartsPage;
