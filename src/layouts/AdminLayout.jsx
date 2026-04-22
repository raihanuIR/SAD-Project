import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout(true);
        navigate('/admin/login');
    };

    const navLinks = [
        { name: 'Analytics', path: '/admin/dashboard', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { name: 'Categories', path: '/admin/categories', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
        { name: 'Brands', path: '/admin/brands', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
        { name: 'Inventory', path: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Campaigns', path: '/admin/offers', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
        { name: 'Promotions', path: '/admin/coupons', icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0-5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z' },
        { name: 'Orders', path: '/admin/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
        { name: 'Intelligence', path: '/admin/reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-600 font-sans selection:bg-indigo-100">

            {/* Light Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50 shadow-sm">
                <div className="h-20 flex items-center px-8 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                            <span className="text-white font-black text-xl">R</span>
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">
                            Raihan<span className="text-indigo-600">Shop</span>
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">Core Management</div>
                    <nav className="space-y-1.5">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                                        isActive 
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                <svg 
                                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                                </svg>
                                <span className="font-bold text-sm tracking-tight">{link.name}</span>
                                {({ isActive }) => isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-10 pt-10 border-t border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-4">System Console</div>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group font-bold"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-sm">Terminate Session</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-black text-slate-900 truncate uppercase tracking-tight">{user?.name || 'Administrator'}</div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Master Access</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen">
                
                {/* Clean Header */}
                <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                    <div>
                        <h1 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Operational Node</h1>
                        <div className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Control <span className="text-indigo-600">Center</span></div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Protocol Active</span>
                        </div>
                    </div>
                </header>

                <main className="p-8 pb-20">
                    <div className="max-w-screen-2xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}