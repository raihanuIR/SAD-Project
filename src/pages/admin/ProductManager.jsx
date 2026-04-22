import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminProducts, deleteProduct } from '../../services/api';

export default function ProductManager() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAdminProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            alert('Failed to delete product');
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Inventory Ledger</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Comprehensive record of all product entities</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/products/create')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-widest px-8 py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                    </svg>
                    Initialize Node
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black bg-slate-50/50">
                                <th className="p-8">Node Identity</th>
                                <th className="p-8">Classification</th>
                                <th className="p-8">Valuation</th>
                                <th className="p-8">Availability</th>
                                <th className="p-8 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                    <td className="p-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-105 transition-transform duration-500 bg-white p-1">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-slate-900 font-black tracking-tight uppercase">{product.name}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{product.product_code}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                                            {product.category}
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col">
                                            <span className="text-xl font-black text-indigo-600 tracking-tighter">৳{product.price.toLocaleString()}</span>
                                            {product.sale_price && (
                                                <span className="text-[10px] text-slate-400 line-through font-bold">৳{product.sale_price.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            product.status === 'In Stock' 
                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                            : 'bg-red-50 text-red-600 border border-red-100'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'In Stock' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                                            {product.status} ({product.stock_quantity})
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button 
                                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)} 
                                                className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 transition-all shadow-sm"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
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

