import { useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus } from '../../services/api';

export default function OrderManager() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAdminOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-amber-50 text-amber-600 border-amber-100',
            processing: 'bg-blue-50 text-blue-600 border-blue-100',
            shipped: 'bg-indigo-50 text-indigo-600 border-indigo-100',
            delivered: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            cancelled: 'bg-red-50 text-red-600 border-red-100'
        };
        const s = status.toLowerCase();
        return (
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[s] || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                {status}
            </span>
        );
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Logistics Terminal</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Real-time monitoring of system throughput</p>
                </div>
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="Filter by Order ID..." 
                        className="bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all w-full md:w-64 shadow-sm"
                    />
                    <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black bg-slate-50/50">
                                <th className="p-8">Reference</th>
                                <th className="p-8">Timestamp</th>
                                <th className="p-8">Consignee</th>
                                <th className="p-8">Throughput</th>
                                <th className="p-8">Ledger</th>
                                <th className="p-8">Protocol State</th>
                                <th className="p-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                    <td className="p-8 font-black text-slate-900 tracking-tighter uppercase">{order.order_number}</td>
                                    <td className="p-8 text-slate-400 text-xs font-bold uppercase tracking-widest">{order.date}</td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                                                {order.customer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-slate-900 font-bold uppercase tracking-tight">{order.customer}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <span className="text-lg font-black text-indigo-600 tracking-tighter">৳{order.total.toLocaleString()}</span>
                                    </td>
                                    <td className="p-8">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${
                                            order.payment_status === 'paid' 
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                            : 'bg-slate-100 text-slate-400 border border-slate-200'
                                        }`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="p-8">{getStatusBadge(order.status)}</td>
                                    <td className="p-8 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <select
                                                value={order.status.toLowerCase()}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2 text-slate-600 outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-sm cursor-pointer"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <button className="p-2 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}