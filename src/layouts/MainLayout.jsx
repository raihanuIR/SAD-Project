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

            {/* Announcement Bar */}
            <div className="bg-black text-white text-xs">
                <div className="container mx-auto px-4 py-2 flex justify-center items-center">
                    <p>Buy now get 50% discount on Products.</p>
                </div>
            </div>

            {/* Navbar */}
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-200 border-b border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                    {/* Left Nav */}
                    <nav className="flex-1 hidden md:flex space-x-6 text-sm font-medium">
                        <Link to="/products?category=Electronics" className="text-slate-500 hover:text-[#C5A059] transition-colors uppercase tracking-wider text-xs">Electronics</Link>
                        <Link to="/products?category=Fashion" className="text-slate-500 hover:text-[#C5A059] transition-colors uppercase tracking-wider text-xs">Fashion</Link>
                        <Link to="/products?category=Home%20and%20Living" className="text-slate-500 hover:text-[#C5A059] transition-colors uppercase tracking-wider text-xs">Home</Link>
                        <Link to="/products?category=Beauty" className="text-slate-500 hover:text-[#C5A059] transition-colors uppercase tracking-wider text-xs">Beauty</Link>
                        <Link to="/products?category=Sneakers" className="text-slate-500 hover:text-[#C5A059] transition-colors uppercase tracking-wider text-xs">Sneakers</Link>
                    </nav>

                    {/* Center Brand */}
                    <div className="flex-1 flex justify-center">
                        <Link to="/" className="text-2xl font-black tracking-widest uppercase text-slate-900 dark:text-white">
                            RAIHANSHOP
                        </Link>
                    </div>

                    {/* Right Nav */}
                    <div className="flex-1 flex items-center justify-end space-x-5">
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="relative hidden sm:flex items-center">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-32 lg:w-48 bg-gray-100 dark:bg-gray-700 text-sm rounded-full py-1.5 pl-4 pr-8 focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all text-slate-800 dark:text-slate-200"
                            />
                            <button type="submit" className="absolute right-2.5 text-slate-500 hover:text-[#C5A059] transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </form>

                        {/* User Icon */}
                        <Link to={user ? "/profile" : "/auth/login"} className="text-xl text-slate-700 dark:text-slate-300 hover:text-[#C5A059] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        </Link>

                        {/* Cart Icon (Shopping Bag style) */}
                        <Link to="/cart" className="relative text-xl text-slate-700 dark:text-slate-300 hover:text-[#C5A059] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Pages render here */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-zinc-50 dark:bg-zinc-900 text-slate-700 dark:text-slate-300 transition-colors duration-200 border-t border-zinc-200 dark:border-zinc-800 mt-12">
                
                {/* Newsletter Section */}
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className="text-3xl font-semibold mb-2">Get 20% off on your first order</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Join our email list for exclusive offers and the latest news.</p>
                    <div className="flex justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your E-Mail"
                            className="flex-grow px-4 py-3 bg-white dark:bg-gray-700 border border-transparent focus:border-gray-300 dark:focus:border-gray-500 outline-none"
                        />
                        <button className="bg-zinc-900 hover:bg-black text-white px-6 py-3 transition-colors">
                            &rarr;
                        </button>
                    </div>
                </div>

                <div className="container mx-auto px-4 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <h4 className="text-xl font-black tracking-widest uppercase mb-4 text-black dark:text-white">RaihanShop</h4>
                            <p className="opacity-80 text-sm leading-relaxed mb-6">
                                Lorem ipsum dolor sit amet, consectet adipiscing elit. Gravida volutpat sapien viverra. Etiam id sit donec integer tincidunt vestibulum
                            </p>
                            <div className="flex space-x-4 opacity-60">
                                {/* Simple social placeholders */}
                                <a href="#" className="hover:text-[#C5A059] hover:opacity-100">f</a>
                                <a href="#" className="hover:text-[#C5A059] hover:opacity-100">t</a>
                                <a href="#" className="hover:text-[#C5A059] hover:opacity-100">y</a>
                                <a href="#" className="hover:text-[#C5A059] hover:opacity-100">p</a>
                                <a href="#" className="hover:text-[#C5A059] hover:opacity-100">i</a>
                            </div>
                        </div>

                        {/* Account */}
                        <div>
                            <h5 className="font-semibold mb-4 text-black dark:text-white">Account</h5>
                            <ul className="space-y-3 text-sm opacity-80">
                                <li><Link to="/profile" className="hover:text-[#C5A059]">My Account</Link></li>
                                <li><Link to="/products?specials=true" className="hover:text-[#C5A059]">Specials</Link></li>
                                <li><Link to="/profile/orders" className="hover:text-[#C5A059]">Order History</Link></li>
                                <li><a href="#" className="hover:text-[#C5A059]">Newsletter</a></li>
                                <li><Link to="/contact" className="hover:text-[#C5A059]">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Information */}
                        <div>
                            <h5 className="font-semibold mb-4 text-black dark:text-white">Information</h5>
                            <ul className="space-y-3 text-sm opacity-80">
                                <li><Link to="/about" className="hover:text-[#C5A059]">About Us</Link></li>
                                <li><a href="#" className="hover:text-[#C5A059]">Information</a></li>
                                <li><Link to="/privacy-policy" className="hover:text-[#C5A059]">Privacy Policy</Link></li>
                                <li><a href="#" className="hover:text-[#C5A059]">Terms Of Use</a></li>
                                <li><Link to="/privacy-policy" className="hover:text-[#C5A059]">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h5 className="font-semibold mb-4 text-black dark:text-white">Contact Information</h5>
                            <div className="text-sm opacity-80 space-y-4">
                                <p><strong className="block text-black dark:text-white">Location:</strong> 4005 Silver Business Point India</p>
                                <p><strong className="block text-black dark:text-white">Contact Us:</strong> 123456789</p>
                                <p><strong className="block text-black dark:text-white">Email:</strong> demoexample@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm opacity-70">
                        <div>
                            Powered By OpenCart Your Store &copy; 2023
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                            {/* Dummy payment icons block */}
                            <div className="flex space-x-1">
                                <div className="w-8 h-5 bg-blue-600 rounded"></div>
                                <div className="w-8 h-5 bg-orange-500 rounded"></div>
                                <div className="w-8 h-5 bg-yellow-400 rounded"></div>
                                <div className="w-8 h-5 bg-blue-400 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}