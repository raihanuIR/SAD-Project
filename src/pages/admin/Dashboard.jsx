import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAdminStats } from '../../services/api';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAdminStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );
    
    if (!stats) return <div className="p-12 text-center text-red-600 font-bold bg-red-50 rounded-2xl border border-red-100">Critical: Data link failure. System check required.</div>;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Executive Summary</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Real-time performance analytics & telemetry</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Daily Revenue", value: `৳${stats.todaySales.toLocaleString()}`, color: "indigo", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m-1.414-2.586l.244.244" },
                    { label: "Order Flow", value: stats.todayOrders, color: "blue", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
                    { label: "Product Nodes", value: stats.totalProducts, color: "emerald", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                    { label: "Active Entities", value: stats.totalUsers, color: "purple", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }
                ].map((kpi, i) => (
                    <div key={i} className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-indigo-600/50 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${kpi.color}-500/5 blur-[80px] group-hover:bg-indigo-600/5 transition-colors`}></div>
                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-50 flex items-center justify-center mb-6 border border-${kpi.color}-100 group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                <svg className={`w-6 h-6 text-${kpi.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={kpi.icon} />
                                </svg>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{kpi.label}</p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Area */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 lg:col-span-2 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Real-time Stream</span>
                        </div>
                    </div>
                    
                    <h2 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-tight italic">Order Distribution Matrix</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.orderStats} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8}/>
                                        <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                                />
                                <Tooltip 
                                    cursor={{ fill: '#f8fafc', opacity: 1 }} 
                                    contentStyle={{ 
                                        backgroundColor: '#ffffff', 
                                        borderRadius: '16px', 
                                        border: '1px solid #e2e8f0', 
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                        color: '#0f172a',
                                        fontWeight: 'bold'
                                    }} 
                                />
                                <Bar dataKey="count" fill="url(#barGradient)" radius={[10, 10, 0, 0]} barSize={45} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Growth Analysis */}
                <div className="space-y-6">
                    <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 blur-[40px]"></div>
                        <h2 className="text-lg font-black uppercase tracking-tight mb-8 italic relative z-10">Velocity Metrics</h2>
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Aggregate Orders</span>
                                <span className="font-black text-xl tracking-tighter">{stats.totalOrders}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Efficiency Index</span>
                                <span className="font-black text-xl tracking-tighter">98.4%</span>
                            </div>
                            <div className="pt-4">
                                <div className="text-[40px] font-black tracking-tighter leading-none mb-1">+12.5%</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Monthly Surge</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            Infrastructure Status
                        </h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-emerald-500 w-full opacity-60"></div>
                                    </div>
                                    <span className="text-[8px] font-black text-emerald-600 uppercase">Optimal</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
