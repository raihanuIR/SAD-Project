import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Buttons';
import { getUserOrders } from '../../services/api';

export default function Profile() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchOrders = async () => {
                try {
                    const data = await getUserOrders();
                    setOrders(data);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <div className="bg-slate-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                {user.name.charAt(0)}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
                            <p className="text-slate-500 text-sm mb-6">{user.email}</p>

                            <div className="space-y-2">
                                <Button variant="ghost" className="w-full text-left justify-start bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 shadow-none">Order History</Button>
                                <Button variant="ghost" className="w-full text-left justify-start">Saved Addresses</Button>
                                <Button variant="ghost" className="w-full text-left justify-start">Account Settings</Button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Orders</h2>

                            {isLoading ? (
                                <p className="text-slate-500">Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <p className="text-slate-500">You haven't placed any orders yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Order ID</span>
                                                <span className="font-medium text-slate-900 dark:text-white">{order.id}</span>
                                                <div className="text-sm text-slate-500 mt-1">{order.date} &bull; {order.items} Items</div>
                                            </div>

                                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="text-left sm:text-right">
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">৳{order.total.toLocaleString()}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}