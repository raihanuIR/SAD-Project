import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCards';
import Button from '../../components/Buttons';
import { getProducts } from '../../services/api';

export default function ProductIndex() {
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const initialSearch = searchParams.get('search') || '';
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Categories exactly as requested
    const categories = ['All', 'Electronics', 'Fashion', 'Home and Living', 'Beauty', 'Sneakers'];

    // Update active category from URL
    useEffect(() => {
        const cat = searchParams.get('category');
        const search = searchParams.get('search');
        setActiveCategory(cat || 'All');
        setSearchQuery(search || '');
    }, [searchParams]);

    // Fetch Products via API
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts(activeCategory, searchQuery);
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeCategory, searchQuery]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen py-8 transition-colors duration-200">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 sticky top-24 transition-colors">
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map(category => (
                                <li key={category}>
                                    <Button
                                        variant={activeCategory === category ? 'primary' : 'ghost'}
                                        onClick={() => handleCategoryClick(category)}
                                        className="w-full text-left justify-start"
                                    >
                                        {category}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory} Products`}
                        </h1>
                        {!loading && (
                            <span className="text-zinc-500 dark:text-zinc-400 text-sm">{products.length} items found</span>
                        )}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-zinc-800 rounded-xl h-96 border border-zinc-200 dark:border-zinc-700"></div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} onAdd={addToCart} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-zinc-500 dark:text-zinc-400">
                            No products found in this category.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}