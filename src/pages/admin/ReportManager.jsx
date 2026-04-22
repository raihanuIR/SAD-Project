import { useEffect, useState } from 'react';
import { getReports } from '../../services/api';

export default function ReportManager() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reports = await getReports();
                setData(reports);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!data) return <div className="p-12 text-center text-red-600 font-bold bg-red-50 rounded-2xl border border-red-100">Telemetry Link Failed. Unable to aggregate data.</div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Business Intelligence</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Global performance audit & fiscal telemetry</p>
                </div>
                <div className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-6 py-2 rounded-full uppercase tracking-widest shadow-sm">
                    Sync State: {new Date().toLocaleTimeString()}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Aggregate Revenue</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">৳{data.totalSales.toLocaleString()}</p>
                    <div className="mt-6 flex items-center gap-2">
                        <div className="flex items-center text-emerald-500 text-[10px] font-black uppercase">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            +12.5% Velocity
                        </div>
                    </div>
                </div>
                {data.ordersByStatus.map(s => (
                    <div key={s.status} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{s.status} Status</p>
                        <p className="text-3xl font-black text-slate-900 tracking-tighter">{s._count.id}</p>
                        <div className="mt-6 h-1.5 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-indigo-600 w-2/3 opacity-60"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Best Sellers */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-tight italic flex items-center gap-3">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        High Velocity Nodes
                    </h2>
                    <div className="space-y-4">
                        {data.bestSellers.map((product, idx) => (
                            <div key={idx} className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-[1.5rem] transition-all border border-transparent hover:border-slate-100 group">
                                <div className="flex items-center gap-5">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${idx === 0 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-400 border border-slate-100 shadow-inner'}`}>
                                        {idx + 1}
                                    </div>
                                    <span className="font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{product.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block font-black text-xl text-slate-900 tracking-tighter">{product._sum.quantity}</span>
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Units Shifted</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-tight italic flex items-center gap-3">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Entity Feed
                    </h2>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="text-[10px] text-slate-400 uppercase font-black tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="pb-6">Identity</th>
                                    <th className="pb-6">Valuation</th>
                                    <th className="pb-6 text-right">State</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-slate-50 transition-colors">
                                        <td className="py-6">
                                            <p className="font-black text-slate-900 uppercase tracking-tight">{order.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{order.city}</p>
                                        </td>
                                        <td className="py-6">
                                            <span className="text-lg font-black text-slate-900 tracking-tighter">৳{order.total.toLocaleString()}</span>
                                        </td>
                                        <td className="py-6 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
