import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getBrands, createProduct } from '../../services/api';

export default function ProductForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        short_description: '',
        price: '',
        sale_price: '',
        stock_quantity: '',
        category_id: '',
        brandId: '',
        status: 'In Stock',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    });

    useEffect(() => {
        const initData = async () => {
            try {
                const [cats, brandsData] = await Promise.all([getCategories(), getBrands()]);
                setCategories(cats);
                setBrands(brandsData);
            } catch (error) {
                console.error('Failed to fetch initialization data:', error);
            }
        };
        initData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Mapping frontend snake_case to backend camelCase if necessary, 
            // but the API specifically uses these field names in the POST route
            await createProduct({
                ...formData,
                categoryId: parseInt(formData.category_id),
                brandId: formData.brandId ? parseInt(formData.brandId) : null,
                price: parseFloat(formData.price),
                salePrice: formData.sale_price ? parseFloat(formData.sale_price) : null,
                stockQuantity: parseInt(formData.stock_quantity) // Consistent with API expectation
            });
            navigate('/admin/products');
        } catch (error) {
            alert('Failed to save product specification');
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 outline-none transition-all shadow-sm";
    const labelClasses = "block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2";

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">Node Configuration</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Initialize new inventory node parameters</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/products')}
                    className="text-slate-400 hover:text-slate-900 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Abort Protocol
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                            <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight italic flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs not-italic shadow-inner">01</span>
                                General Specification
                            </h2>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className={labelClasses}>Entity Identity *</label>
                                    <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter model designation..." className={inputClasses} />
                                </div>

                                <div>
                                    <label className={labelClasses}>Technical Abstract</label>
                                    <textarea name="short_description" rows="4" value={formData.short_description} onChange={handleChange} placeholder="Brief functional overview..." className={inputClasses}></textarea>
                                </div>
                                
                                <div>
                                    <label className={labelClasses}>Visual Uplink (Image URL)</label>
                                    <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className={inputClasses} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight italic flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-xs not-italic shadow-inner">02</span>
                                Financials
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Standard Value (৳) *</label>
                                    <input required type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className={inputClasses} />
                                </div>

                                <div>
                                    <label className={labelClasses}>Promotional Value (৳)</label>
                                    <input type="number" min="0" step="0.01" name="sale_price" value={formData.sale_price} onChange={handleChange} placeholder="0.00" className={inputClasses} />
                                </div>

                                <div>
                                    <label className={labelClasses}>Inventory Load (Stock) *</label>
                                    <input required type="number" min="0" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} placeholder="Units in stock" className={inputClasses} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight italic flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs not-italic shadow-inner">03</span>
                                Classification
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Primary Sector *</label>
                                    <select required name="category_id" value={formData.category_id} onChange={handleChange} className={inputClasses}>
                                        <option value="">Select Sector</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClasses}>Corporate Parent</label>
                                    <select name="brandId" value={formData.brandId} onChange={handleChange} className={inputClasses}>
                                        <option value="">Select Entity</option>
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-end gap-4 pt-10 border-t border-slate-200">
                    <button 
                        type="button" 
                        onClick={() => navigate('/admin/products')} 
                        className="px-10 py-4 rounded-2xl border border-slate-200 text-slate-400 font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={isLoading} 
                        className="px-12 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                        {isLoading ? 'Processing...' : 'Confirm Initialization'}
                    </button>
                </div>
            </form>
        </div>
    );
}

