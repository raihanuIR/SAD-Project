import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // If the user is trying to access /admin/login, we use the admin flow
    const isAdminLogin = location.pathname.includes('/admin');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password }, isAdminLogin);
            // Redirect based on where they logged in
            navigate(isAdminLogin ? '/admin/dashboard' : '/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isAdminLogin ? 'bg-gray-900' : 'bg-slate-50'}`}>
            <div className={`max-w-md w-full space-y-8 p-10 rounded-2xl shadow-xl ${isAdminLogin ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-gray-100 text-slate-900'}`}>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        {isAdminLogin ? 'Admin Portal' : 'Welcome Back'}
                    </h2>
                    <p className={`mt-2 text-sm ${isAdminLogin ? 'text-gray-400' : 'text-slate-500'}`}>
                        {isAdminLogin ? 'Sign in to manage your store' : 'Sign in to your SiamStore account'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Email address</label>
                            <input
                                type="email"
                                required
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${isAdminLogin
                                        ? 'bg-gray-900 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-slate-900 focus:ring-rose-500'
                                    }`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                required
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${isAdminLogin
                                        ? 'bg-gray-900 border-gray-700 text-white focus:ring-blue-500'
                                        : 'bg-white border-gray-300 text-slate-900 focus:ring-rose-500'
                                    }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isAdminLogin
                                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                                : 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
                            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                {!isAdminLogin && (
                    <div className="text-center mt-4">
                        <span className="text-sm text-slate-500">Don't have an account? </span>
                        <Link to="/auth/register" className="text-sm font-medium text-rose-600 hover:text-rose-500">
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}