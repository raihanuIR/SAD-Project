import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons';

export default function ProductForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Mapped exactly to your Laravel Product model fillables
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        short_description: '',
        price: '',
        sale_price: '',
        sku: '',
        stock_quantity: '',
        category_id: '',
        brand_id: '',
        is_active: true,
        is_featured: false,
    });

    // Dummy categories based on your seeder
    const categories = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Fashion' },
        { id: 3, name: 'Home & Living' },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // In reality: await api.post('/admin/products', formData);
        console.log('Submitting Product Data:', formData);

        setTimeout(() => {
            setIsLoading(false);
            navigate('/admin/products');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Create New Product</h1>
                <Button variant="ghost" onClick={() => navigate('/admin/products')} className="text-gray-500 hover:text-gray-800">
                    Cancel &larr;
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info - Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">General Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL snippet)</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Leave blank to auto-generate" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                <textarea name="short_description" rows="2" value={formData.short_description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                                <textarea name="description" rows="5" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Inventory - Right Column */}
                    <div className="space-y-6">

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Pricing & Inventory</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
                                <input required type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (৳)</label>
                                <input type="number" min="0" step="0.01" name="sale_price" value={formData.sale_price} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                                <input required type="number" min="0" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Organization</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div className="pt-4 border-t border-gray-100 space-y-3">
                                <label className="flex items-center">
                                    <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
                                    <span className="ml-2 text-sm text-gray-700">Active (Visible to customers)</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" />
                                    <span className="ml-2 text-sm text-gray-700">Featured Product</span>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                    <Button type="button" variant="outline" onClick={() => navigate('/admin/products')} className="px-6 py-2">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={isLoading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-md">
                        {isLoading ? 'Saving...' : 'Save Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
}