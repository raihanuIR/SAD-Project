import { useEffect, useState } from 'react';
import { getBrands, createBrand, deleteBrand } from '../../services/api';

export default function BrandManager() {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newBrandName, setNewBrandName] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const data = await getBrands();
            setBrands(data);
        } catch (error) {
            console.error('Failed to fetch brands:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBrand = async () => {
        if (!newBrandName.trim()) return;
        try {
            await createBrand(newBrandName);
            setNewBrandName('');
            fetchBrands();
        } catch (error) {
            alert('Failed to add brand');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this brand?')) return;
        try {
            await deleteBrand(id);
            fetchBrands();
        } catch (error) {
            alert('Failed to delete brand');
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Brand Sovereignty</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Manage your portfolio of premium labels</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <input
                            type="text"
                            value={newBrandName}
                            onChange={(e) => setNewBrandName(e.target.value)}
                            placeholder="Identify new brand..."
                            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-sm"
                        />
                    </div>
                    <button 
                        onClick={handleAddBrand} 
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                        Initialize
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black bg-slate-50/50">
                                <th className="p-8">Identity</th>
                                <th className="p-8">System Path</th>
                                <th className="p-8">Inventory Load</th>
                                <th className="p-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {brands.map((brand) => (
                                <tr key={brand.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-110 transition-transform font-black text-xl italic">
                                                {brand.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-slate-900 font-black tracking-tight uppercase">{brand.name}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">UID: {brand.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold">
                                            /{brand.slug}
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black text-slate-900 tracking-tighter">{brand.products_count}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Units</span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button 
                                            onClick={() => handleDelete(brand.id)} 
                                            className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 transition-all duration-300 shadow-sm"
                                            title="Purge Brand"
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

