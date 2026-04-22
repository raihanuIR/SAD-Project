import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Buttons';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout(true);
        navigate('/admin/login');
    };

    const navLinks = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { name: 'Categories', path: '/admin/categories', icon: '📁' },
        { name: 'Brands', path: '/admin/brands', icon: '🏷️' },
        { name: 'Products', path: '/admin/products', icon: '📦' },
        { name: 'Banners', path: '/admin/banners', icon: '🖼️' },
        { name: 'Offers', path: '/admin/offers', icon: '🎁' },
        { name: 'Coupons', path: '/admin/coupons', icon: '✂️' },
        { name: 'Orders', path: '/admin/orders', icon: '🛒' },
        { name: 'Reports', path: '/admin/reports', icon: '📈' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">

            {/* Sidebar (Matches your .sidebar background #1f2937) */}
            <aside className="w-64 bg-gray-800 text-gray-300 flex flex-col shadow-xl">
                <div className="p-4 bg-gray-900 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white tracking-wider">SiamStore Admin</h2>
                </div>

                <nav className="flex-1 py-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block px-6 py-3 transition-colors ${isActive ? 'bg-gray-700 text-white border-l-4 border-blue-500' : 'hover:bg-gray-700 hover:text-white'
                                        }`
                                    }
                                >
                                    <span className="mr-3">{link.icon}</span>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Navbar */}
                <header className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center text-white">
                    <div className="font-semibold text-lg">Control Panel</div>
                    <div className="flex items-center space-x-4">
                        <span>{user?.name || 'Admin User'}</span>
                        <Button
                            variant="danger"
                            onClick={handleLogout}
                            className="px-4 py-2 rounded text-sm transition-colors"
                        >
                            Logout
                        </Button>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}