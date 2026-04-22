import { useState } from 'react';
import Button from '../../components/Buttons';

export default function OrderManager() {
    // Dummy data representing orders from your database
    const [orders, setOrders] = useState([
        {
            id: 1001,
            order_number: 'ORD-20260415-A1B2C',
            customer: 'Test Customer',
            date: '2026-04-15 10:30 AM',
            total: 125060,
            status: 'pending',
            payment_status: 'cod'
        },
        {
            id: 1002,
            order_number: 'ORD-20260414-X9Y8Z',
            customer: 'Jane Smith',
            date: '2026-04-14 02:15 PM',
            total: 8560,
            status: 'processing',
            payment_status: 'paid'
        },
        {
            id: 1003,
            order_number: 'ORD-20260412-M4N5P',
            customer: 'John Doe',
            date: '2026-04-12 09:00 AM',
            total: 35000,
            status: 'shipped',
            payment_status: 'paid'
        }
    ]);

    const handleStatusChange = (orderId, newStatus) => {
        // In a real app, this would be an API call: await api.put(`/admin/orders/${orderId}/status`, { status: newStatus })
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[status]}`}>{status}</span>;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Order Management</h1>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search order ID..." className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 outline-none" />
                    <Button variant="ghost" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium">Filter</Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="p-4 font-medium">Order ID</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Customer</th>
                            <th className="p-4 font-medium">Total</th>
                            <th className="p-4 font-medium">Payment</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{order.order_number}</td>
                                <td className="p-4 text-gray-500">{order.date}</td>
                                <td className="p-4 text-gray-800">{order.customer}</td>
                                <td className="p-4 font-bold text-gray-900">৳{order.total.toLocaleString()}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                                        {order.payment_status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">{getStatusBadge(order.status)}</td>
                                <td className="p-4 text-right">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="border border-gray-300 rounded bg-white text-xs px-2 py-1 mr-2 cursor-pointer outline-none focus:border-blue-500"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <Button variant="ghost" className="text-blue-600 hover:underline text-xs font-medium px-2 py-1">View Details</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}