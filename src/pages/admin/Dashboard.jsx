import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    // Dummy data representing what your API will return from DashboardController
    const stats = {
        todaySales: 45000,
        todayOrders: 12,
        totalProducts: 156,
        totalUsers: 843
    };

    const orderStats = [
        { name: 'Pending', count: 15 },
        { name: 'Processing', count: 8 },
        { name: 'Shipped', count: 24 },
        { name: 'Delivered', count: 145 },
        { name: 'Cancelled', count: 3 },
    ];

    const topProducts = [
        { id: 1, name: 'iPhone 15 Pro Max', sales: 42 },
        { id: 2, name: 'Sony WH-1000XM5', sales: 38 },
        { id: 3, name: 'Nike Air Max 270', sales: 25 },
        { id: 4, name: 'Minimalist Wood Desk', sales: 18 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <div className="text-sm text-gray-500">Last updated: Just now</div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Today's Sales</p>
                    <p className="text-3xl font-bold text-gray-900">৳{stats.todaySales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Today's Orders</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.todayOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Customers</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Chart Area */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Order Status Distribution</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Top Selling Products</h2>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        #{index + 1}
                                    </div>
                                    <span className="font-medium text-gray-700 truncate max-w-[150px]">{product.name}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{product.sales} sold</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}