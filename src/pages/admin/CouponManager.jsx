import { useEffect, useState } from 'react';
import { getCoupons, createCoupon, deleteCoupon } from '../../services/api';

export default function CouponManager() {
    const [coupons, setCoupons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: '',
        minOrder: '0',
        maxUses: '',
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const data = await getCoupons();
            setCoupons(data);
        } catch (error) {
            console.error('Failed to fetch coupons:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCoupon({
                ...formData,
                value: parseFloat(formData.value),
                minOrder: parseFloat(formData.minOrder),
                maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
            });
            setShowForm(false);
            setFormData({ code: '', type: 'percentage', value: '', minOrder: '0', maxUses: '' });
            fetchCoupons();
        } catch (error) {
            alert('Failed to create coupon');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteCoupon(id);
            fetchCoupons();
        } catch (error) {
            alert('Failed to delete coupon');
        }
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Voucher Control</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Manage fiscal incentives and discount protocols</p>
                </div>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className={`${showForm ? 'bg-slate-100 text-slate-600' : 'bg-indigo-600 text-white shadow-indigo-100'} font-black uppercase text-xs tracking-widest px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95`}
                >
                    {showForm ? 'Abort Protocol' : 'Initialize Voucher'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm animate-in slide-in-from-top-4 duration-500">
                    <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight italic">Generate Voucher</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Voucher Code</label>
                            <input required type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 font-black tracking-widest focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner uppercase" placeholder="SAVE50" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Yield Model</label>
                            <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner">
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount (৳)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Yield Value</label>
                            <input required type="number" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner" placeholder="10" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Usage Threshold</label>
                            <input type="number" value={formData.maxUses} onChange={e => setFormData({ ...formData, maxUses: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-inner" placeholder="∞" />
                        </div>
                        <button type="submit" className="md:col-span-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95">
                            Confirm Initialization
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black bg-slate-50/50">
                                <th className="p-8">Voucher Code</th>
                                <th className="p-8">Yield Configuration</th>
                                <th className="p-8">Usage Status</th>
                                <th className="p-8">Operational State</th>
                                <th className="p-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                    <td className="p-8">
                                        <div className="inline-flex px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 font-black tracking-widest rounded-xl text-xs">
                                            {coupon.code}
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <span className="text-slate-900 font-black uppercase tracking-tight">
                                            {coupon.type === 'percentage' ? `${coupon.value}% Reduction` : `৳${coupon.value} Reduction`}
                                        </span>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-black text-slate-900 tracking-tighter">{coupon.usedCount}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/ {coupon.maxUses || '∞'} Hits</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            coupon.isActive 
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                            : 'bg-red-50 text-red-600 border border-red-100'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${coupon.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                                            {coupon.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button 
                                            onClick={() => handleDelete(coupon.id)} 
                                            className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 transition-all duration-300 shadow-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
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
