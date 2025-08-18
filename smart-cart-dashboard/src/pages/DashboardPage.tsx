import React, { useState, useEffect, useRef } from 'react';

// --- TypeScript Type Definitions ---
interface Cart {
  id: string;
  status: 'In Use' | 'Available' | 'Charging' | 'Low Battery' | 'Assistance';
  battery: number;
  items: number;
  shopperName?: string;
  since?: string;
  itemsList?: { name: string, price: number }[];
}

interface Alert {
  id: number;
  type: 'Assistance' | 'Offline';
  title: string;
  subtitle: string;
}

interface KpiCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconTextColor: string;
}

// --- Icon Components ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const DollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2mc-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.636-1.21 2.273-1.21 2.91 0l5.25 10.001c.636 1.21-.242 2.65-1.455 2.65H4.462c-1.213 0-2.091-1.44-1.455-2.65l5.25-10.001zM10 14a1 1 0 110-2 1 1 0 010 2zm0-7a1 1 0 00-1 1v2a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const OfflineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L6.18 9.42a1.5 1.5 0 001.34 2.08h4.96a1.5 1.5 0 001.34-2.08l-2.33-6.25zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>;
const InUseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const AvailableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ChargingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const LowBatteryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const AssistanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 8V5a2 2 0 012-2z" /></svg>;
const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const CollectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const ViewBoardsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;


// --- Helper to get status styles (used by modal and fleet status) ---
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
const CartDetailsModal = ({ cart, onClose }: { cart: Cart; onClose: () => void; }) => {
    if (!cart) return null;
    const statusStyles = getStatusStyles(cart.status);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Cart-{cart.id} Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusStyles.bg} ${statusStyles.text}`}>
                        {statusStyles.icon} {cart.status}
                    </div>
                    {cart.shopperName && <p><strong>Shopper:</strong> {cart.shopperName}</p>}
                    {cart.since && <p><strong>Since:</strong> {cart.since}</p>}
                    <p><strong>Battery:</strong> {cart.battery}%</p>
                    <p><strong>Items in Cart:</strong> {cart.items}</p>
                    
                    {cart.itemsList && cart.itemsList.length > 0 && (
                        <div>
                            <h4 className="font-semibold mt-4 mb-2">Items List:</h4>
                            <ul className="list-disc list-inside bg-gray-50 p-3 rounded-md max-h-40 overflow-y-auto">
                                {cart.itemsList.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span>${item.price.toFixed(2)}</span>
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


const DashboardPage = () => {
    const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: 1, type: 'Assistance', title: 'Assistance Requested', subtitle: 'Cart-033 in Aisle 7' },
        { id: 2, type: 'Offline', title: 'Cart-019 Offline', subtitle: 'Last seen near checkout' },
    ]);

    const fleet: Cart[] = [
        { id: '042', status: 'In Use', battery: 85, items: 12, shopperName: 'Jane Doe', itemsList: [{name: 'Milk', price: 4.99}] },
        { id: '112', status: 'Available', battery: 100, items: 0 },
        { id: '007', status: 'Low Battery', battery: 18, items: 5, shopperName: 'John Smith', itemsList: [{name: 'Eggs', price: 5.49}] },
        { id: '023', status: 'Charging', battery: 65, items: 0 },
        { id: '033', status: 'Assistance', battery: 55, items: 8, shopperName: 'Emily White', itemsList: [{name: 'Cereal', price: 6.20}] },
    ];

    const dismissAlert = (alertId: number) => {
        setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== alertId));
    };

    return (
        <div className="py-8">
            {selectedCart && <CartDetailsModal cart={selectedCart} onClose={() => setSelectedCart(null)} />}
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <KpiCard title="Live Shoppers" value="78" icon={<UserIcon />} iconBgColor="bg-blue-100" iconTextColor="text-blue-600" />
                 <KpiCard title="Carts in Use" value="78 / 150" icon={<CartIcon />} iconBgColor="bg-green-100" iconTextColor="text-green-600" />
                 <KpiCard title="Avg. Basket Size" value="$45.32" icon={<DollarIcon />} iconBgColor="bg-yellow-100" iconTextColor="text-yellow-600" />
                 <KpiCard title="Today's Revenue" value="$12,480" icon={<ChartIcon />} iconBgColor="bg-purple-100" iconTextColor="text-purple-600" />
                 <KpiCard title="Total Products Sold" value="1,204" icon={<TagIcon />} iconBgColor="bg-pink-100" iconTextColor="text-pink-600" />
                 <KpiCard title="Products in Carts" value="932" icon={<CubeIcon />} iconBgColor="bg-indigo-100" iconTextColor="text-indigo-600" />
                 <KpiCard title="Products in Store" value="8,750" icon={<CollectionIcon />} iconBgColor="bg-teal-100" iconTextColor="text-teal-600" />
                 <AisleProductCard />
            </div>

            {/* Dashboard Grid */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Store Map */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Store Map</h3>
                    <div className="h-96 bg-gray-50 rounded-md relative flex items-center justify-center border">
                        <p className="text-gray-400">Map Placeholder</p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    {/* Critical Alerts */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Alerts</h3>
                        <div className="space-y-4">
                            {alerts.map(alert => (
                                <div key={alert.id} className={`p-4 rounded-lg flex items-start justify-between ${alert.type === 'Assistance' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                                    <div className="flex items-start space-x-3">
                                        {alert.type === 'Assistance' ? <AlertTriangleIcon /> : <OfflineIcon />}
                                        <div>
                                            <p className={`text-sm font-semibold ${alert.type === 'Assistance' ? 'text-red-800' : 'text-yellow-800'}`}>{alert.title}</p>
                                            <p className={`text-xs ${alert.type === 'Assistance' ? 'text-red-600' : 'text-yellow-600'}`}>{alert.subtitle}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => dismissAlert(alert.id)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                                </div>
                            ))}
                            {alerts.length === 0 && <p className="text-sm text-gray-500 text-center">No active alerts.</p>}
                        </div>
                    </div>

                    {/* Cart Fleet Status */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Fleet Status</h3>
                        <ul className="space-y-2">
                            {fleet.map(cart => (
                                <CartStatusItem key={cart.id} cart={cart} onDetailsClick={() => setSelectedCart(cart)} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Components with TypeScript props ---
const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, iconBgColor, iconTextColor }) => (
    <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${iconBgColor} ${iconTextColor}`}>{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

// --- New Interactive Aisle Product Card ---
const AisleProductCard = () => {
    const aisleData: { [key: string]: number } = {
        'Aisle 1': 150, 'Aisle 2': 210, 'Aisle 3': 180,
        'Aisle 4': 95, 'Aisle 5': 250, 'Aisle 6': 130, 'Aisle 7': 125,
    };
    const totalProducts = Object.values(aisleData).reduce((sum, count) => sum + count, 0);
    const [selectedAisle, setSelectedAisle] = useState('All Aisles');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleAisleSelect = (aisle: string) => {
        setSelectedAisle(aisle);
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    const filteredAisles = Object.keys(aisleData).filter(aisle => 
        aisle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);


    return (
        <div className="bg-white rounded-lg shadow p-5 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <ViewBoardsIcon />
            </div>
            <div className="flex-1">
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        className="flex items-center justify-between w-full text-sm text-gray-500 font-medium hover:text-gray-800 p-1 rounded-md"
                    >
                        <span>{selectedAisle === 'All Aisles' ? 'Total Aisle Products' : `Products in ${selectedAisle}`}</span>
                        <ChevronDownIcon />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full mt-2 w-56 bg-white border rounded-lg shadow-xl z-10">
                            <div className="p-2">
                                <input 
                                    type="text"
                                    placeholder="Search aisle..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="max-h-48 overflow-y-auto">
                                <a href="#" onClick={() => handleAisleSelect('All Aisles')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">All Aisles</a>
                                {filteredAisles.map(aisle => (
                                    <a href="#" key={aisle} onClick={() => handleAisleSelect(aisle)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        {aisle}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-2xl font-bold text-gray-900">
                    {selectedAisle === 'All Aisles' ? totalProducts : aisleData[selectedAisle]}
                </p>
            </div>
        </div>
    );
};


const CartStatusItem = ({ cart, onDetailsClick }: { cart: Cart, onDetailsClick: () => void }) => {
    const batteryColor = cart.battery > 50 ? 'bg-green-500' : cart.battery > 20 ? 'bg-yellow-500' : 'bg-red-500';
    const statusStyles = getStatusStyles(cart.status);
    return (
        <li className="flex items-center space-x-4 py-4 border-b last:border-b-0">
            <div className={`p-3 rounded-full ${statusStyles.bg} ${statusStyles.text}`}>
                {statusStyles.icon}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-gray-900">Cart-{cart.id}</p>
                    <p className="text-sm font-medium text-gray-600">{cart.items} Items</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${batteryColor} h-2 rounded-full`} style={{ width: `${cart.battery}%` }}></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 w-10 text-right">{cart.battery}%</span>
                </div>
            </div>
            <div>
                <button onClick={onDetailsClick} className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline">Details</button>
            </div>
        </li>
    );
};

export default DashboardPage;
