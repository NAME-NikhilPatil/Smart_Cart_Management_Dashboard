import React from 'react';

// --- Icon Components for Analytics ---
const RevenueIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2mc-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" /></svg>;
const ShoppersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BasketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;

// --- TypeScript Interface for StatCard Props ---
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

// --- Reusable Stat Card Component ---
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
    <div className={`p-6 rounded-xl shadow-lg flex items-center space-x-4 ${bgColor}`}>
        <div className="text-white bg-black bg-opacity-20 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-white text-sm font-medium opacity-80">{title}</p>
            <p className="text-white text-3xl font-bold">{value}</p>
        </div>
    </div>
);

// --- Main Analytics Page Component ---
const AnalyticsPage = () => {
  const topProducts = [
    { name: 'Organic Valley Milk', sales: 152, revenue: 758.48 },
    { name: 'Free-Range Eggs (Dozen)', sales: 121, revenue: 664.29 },
    { name: 'Whole Wheat Bread', sales: 98, revenue: 371.42 },
    { name: 'Avocado', sales: 85, revenue: 169.15 },
  ];

  return (
    <div className="p-8">
      {/* --- Main Analytics Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column: Charts --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Peak Shopping Hours</h2>
            <div className="h-80 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-gray-500">[Bar Chart: Shoppers per Hour Data]</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Store Hotspots (Most Visited Aisles)</h2>
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-gray-500">[Heatmap on Store Layout]</p>
            </div>
          </div>
        </div>

        {/* --- Right Column: Top Products & Cart Status --- */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Selling Products</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-sm font-semibold text-gray-600">Product</th>
                  <th className="py-2 text-sm font-semibold text-gray-600 text-right">Sales</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(product => (
                  <tr key={product.name} className="border-b">
                    <td className="py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="py-3 text-gray-600 text-right">{product.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Live Cart Status</h2>
            <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-gray-500">[Pie Chart: In Use vs. Available vs. Charging]</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
