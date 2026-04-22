import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/api';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await registerUser(formData);
            alert(data.message || 'Account created!');
            navigate('/auth/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900 mb-2">Create Account</h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        Initialize your identity in the RaihanShop system
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner"
                            placeholder="Full Name"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Identity</label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Secure Key</label>
                        <input
                            required
                            type="password"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest py-5 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Initializing...' : 'Confirm Registration'}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        Already have an account?{' '}
                        <Link to="/auth/login" className="text-indigo-600 hover:underline">Log In</Link>
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50">
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                        <p className="text-[9px] font-black text-amber-700 uppercase leading-relaxed text-center">
                            Note: The first user registered in a new deployment will automatically be granted Admin privileges.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
