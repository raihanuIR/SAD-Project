import { useState } from 'react';
import Button from '../../components/Buttons';

export default function CategoryManager() {
    // Dummy data representing categories from your database
    const [categories, setCategories] = useState([
        { id: 1, name: 'Electronics', slug: 'electronics', parent: null, status: true, products_count: 45 },
        { id: 2, name: 'Smartphones', slug: 'smartphones', parent: 'Electronics', status: true, products_count: 12 },
        { id: 3, name: 'Fashion', slug: 'fashion', parent: null, status: true, products_count: 120 },
        { id: 4, name: 'Home & Living', slug: 'home-living', parent: null, status: true, products_count: 34 },
        { id: 5, name: 'Winter Collection', slug: 'winter-collection', parent: 'Fashion', status: false, products_count: 0 },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
                <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 shadow-sm rounded-md px-4 py-2">
                    + Add Category
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Category Name</th>
                                <th className="p-4 font-medium">Slug</th>
                                <th className="p-4 font-medium">Parent</th>
                                <th className="p-4 font-medium">Products</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 text-xs">
                                            📁
                                        </div>
                                        {category.name}
                                    </td>
                                    <td className="p-4 text-gray-500">{category.slug}</td>
                                    <td className="p-4">
                                        {category.parent ? (
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{category.parent}</span>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Top Level</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-600 font-medium">{category.products_count}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${category.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {category.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 font-medium text-sm px-2 py-1">Edit</Button>
                                        <Button variant="ghost" className="text-red-600 hover:text-red-800 font-medium text-sm px-2 py-1">Delete</Button>
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