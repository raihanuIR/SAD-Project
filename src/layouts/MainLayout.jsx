import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Buttons';

export default function MainLayout() {
    const { user, logout } = useAuth();
    const { cartCount: cartItemCount } = useCart();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">

            {/* Premium Announcement Bar */}
            <div className="bg-[#111111] text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5">
                <div className="container mx-auto px-6 py-2.5 flex justify-between items-center">
                    <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Complimentary Global Logistics on Orders Over ৳10,000
                    </p>
                    <div className="hidden md:flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                        <a href="#" className="hover:text-white transition-colors">Tracking</a>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <header className="bg-white/95 dark:bg-[#0F0F12]/95 backdrop-blur-2xl shadow-2xl shadow-black/5 sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 dark:border-white/5">
                <div className="container mx-auto px-6 py-5 flex items-center justify-between">

                    {/* Left Nav */}
                    <nav className="flex-1 hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        <Link to="/products?category=Electronics" className="hover:text-amber-500 dark:hover:text-amber-500 transition-all hover:-translate-y-0.5">Electronics</Link>
                        <Link to="/products?category=Fashion" className="hover:text-amber-500 dark:hover:text-amber-500 transition-all hover:-translate-y-0.5">Fashion</Link>
                        <Link to="/products?category=Sneakers" className="hover:text-amber-500 dark:hover:text-amber-500 transition-all hover:-translate-y-0.5">Footwear</Link>
                    </nav>

                    {/* Center Brand */}
                    <div className="flex-1 flex justify-center">
                        <Link to="/" className="group relative flex items-center gap-3">
                            <div className="text-3xl font-black tracking-[-0.05em] uppercase text-zinc-900 dark:text-white italic">
                                RAIHAN<span className="text-amber-500">SHOP</span>
                            </div>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-500"></div>
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <div className="flex-1 flex items-center justify-end gap-8">
                        {/* Search Input - Minimalist */}
                        <form onSubmit={handleSearch} className="relative hidden sm:block group">
                            <input 
                                type="text" 
                                placeholder="Universal Search..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-44 lg:w-56 bg-zinc-100 dark:bg-white/5 border border-transparent focus:border-amber-500/50 text-[11px] font-bold uppercase tracking-widest rounded-full py-2.5 pl-5 pr-10 outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-amber-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </form>

                        <div className="flex items-center gap-6">
                            <Link to={user ? "/profile" : "/auth/login"} className="text-zinc-700 dark:text-zinc-300 hover:text-amber-500 transition-all hover:scale-110">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </Link>

                            <Link to="/cart" className="relative text-zinc-700 dark:text-zinc-300 hover:text-amber-500 transition-all hover:scale-110">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Pages render here */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Premium Footer */}
            <footer className="bg-white dark:bg-[#09090B] text-zinc-600 dark:text-zinc-400 border-t border-gray-100 dark:border-white/5 mt-32">
                
                <div className="container mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        
                        {/* Brand Column */}
                        <div className="md:col-span-4">
                            <div className="text-2xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white italic mb-8">
                                RAIHAN<span className="text-amber-500">SHOP</span>
                            </div>
                            <p className="text-sm leading-[1.8] mb-10 text-zinc-500">
                                Curating the world's most exceptional digital and physical artifacts. Our mission is to bridge the gap between premium design and accessible technology.
                            </p>
                            <div className="flex gap-4">
                                {['FB', 'TW', 'IG', 'LI'].map(social => (
                                    <a key={social} href="#" className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-black hover:bg-amber-500 hover:text-black transition-all duration-500">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="md:col-span-2">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white mb-8 italic">Collective</h5>
                            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                                <li><Link to="/products" className="hover:text-amber-500 transition-colors">Catalog</Link></li>
                                <li><Link to="/about" className="hover:text-amber-500 transition-colors">Legacy</Link></li>
                                <li><a href="#" className="hover:text-amber-500 transition-colors">Editorial</a></li>
                                <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Concierge</Link></li>
                            </ul>
                        </div>

                        <div className="md:col-span-2">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white mb-8 italic">Legal</h5>
                            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                                <li><Link to="/privacy-policy" className="hover:text-amber-500 transition-colors">Privacy</Link></li>
                                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-amber-500 transition-colors">Ethics</a></li>
                            </ul>
                        </div>

                        {/* Newsletter Section */}
                        <div className="md:col-span-4 bg-zinc-100 dark:bg-white/[0.02] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900 dark:text-white mb-4 italic">Newsletter</h5>
                            <p className="text-xs font-bold text-zinc-500 mb-8 uppercase tracking-widest">Join the inner circle</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Access Token (Email)"
                                    className="w-full bg-white dark:bg-black border border-transparent focus:border-amber-500/50 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none transition-all"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-zinc-900 dark:bg-zinc-800 text-white px-6 rounded-xl hover:bg-amber-500 hover:text-black transition-all">
                                    &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 dark:border-white/5 py-8">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                        <div>
                            &copy; 2026 RAIHANSHOP SYSTEM. ALL RIGHTS RESERVED.
                        </div>
                        <div className="flex items-center gap-6 mt-6 md:mt-0">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-6 h-4 bg-zinc-200 dark:bg-white/5 rounded-[2px]"></div>
                                ))}
                            </div>
                            <span>Encrypted Connection</span>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}