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
            setError(err.response?.data?.message || 'Invalid credentials. Please verify your identity.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${isAdminLogin ? 'bg-slate-50' : 'bg-white dark:bg-zinc-950'}`}>
            <div className={`max-w-md w-full p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 border ${
                isAdminLogin 
                ? 'bg-white border-slate-100 text-slate-900' 
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-white/5 text-zinc-900 dark:text-white'
            }`}>

                <div className="text-center mb-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${
                        isAdminLogin ? 'bg-indigo-600 shadow-indigo-100' : 'bg-amber-500 shadow-amber-500/20'
                    }`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isAdminLogin ? "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" : "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"} />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic">
                        {isAdminLogin ? 'Admin Terminal' : 'Member Access'}
                    </h2>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                        {isAdminLogin ? 'Secure Administrative Initialization' : 'Welcome to the RaihanShop Collective'}
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold border border-red-100 dark:border-red-900/30">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Identity (Email)</label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                className={`block w-full px-5 py-4 text-sm rounded-2xl outline-none transition-all border ${
                                    isAdminLogin
                                    ? 'bg-slate-50 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5'
                                    : 'bg-white dark:bg-black border-zinc-200 dark:border-white/10 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5'
                                }`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 ml-1 opacity-60">Access Key (Password)</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className={`block w-full px-5 py-4 text-sm rounded-2xl outline-none transition-all border ${
                                    isAdminLogin
                                    ? 'bg-slate-50 border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5'
                                    : 'bg-white dark:bg-black border-zinc-200 dark:border-white/10 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5'
                                }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-5 px-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white transition-all transform active:scale-95 shadow-xl ${
                            isAdminLogin
                            ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                            : 'bg-zinc-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 shadow-black/10'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Verifying...' : 'Initialize Session'}
                    </button>
                </form>

                <div className="mt-10 pt-10 border-t border-zinc-100 dark:border-white/5 text-center space-y-4">
                    {!isAdminLogin ? (
                        <>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                New to the collective? <Link to="/auth/register" className="text-amber-600 hover:underline">Join Now</Link>
                            </p>
                            <div className="pt-2">
                                <Link to="/admin/login" className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600 hover:text-indigo-800 transition-colors">
                                    Secure Admin Entry &rarr;
                                </Link>
                            </div>
                        </>
                    ) : (
                        <Link to="/auth/login" className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-600 hover:text-amber-800 transition-colors">
                            &larr; Return to Member Access
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}