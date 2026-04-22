import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProductBySlug } from '../../services/api';

export default function ProductShow() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await getProductBySlug(slug);
                setProduct(data);
                setSelectedImage(0);
                setQuantity(1);
                setShowDescription(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="bg-[#f8f9fa] dark:bg-gray-900 min-h-screen py-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-[#f8f9fa] dark:bg-gray-900 min-h-screen py-24 text-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Product Not Found</h2>
                <Link to="/products" className="text-[#C5A059] hover:underline">Return to Shop</Link>
            </div>
        );
    }

    const currentPrice = product.sale_price || product.price;

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen py-12 transition-colors duration-200">
            <div className="container mx-auto px-4 max-w-[1200px]">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: Image Gallery (Takes 5 columns) */}
                    <div className="lg:col-span-5 flex flex-col">
                        {/* Main Image */}
                        <div className="w-full h-[400px] md:h-[500px] relative bg-white flex items-center justify-center mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="flex gap-2 w-full overflow-x-auto pb-2 justify-center">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-16 h-16 border flex items-center justify-center bg-white transition-all ${selectedImage === index ? 'border-[#C5A059] shadow-sm' : 'border-gray-200 opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details (Takes 7 columns) */}
                    <div className="lg:col-span-7 flex flex-col justify-start">
                        
                        <h1 className="text-2xl md:text-[28px] font-medium text-zinc-900 dark:text-white mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Info Pills Row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 py-3 px-4 rounded-full w-max">
                            <div><span className="text-gray-500">Price:</span> <span className="font-bold text-[#C5A059] text-base">৳{currentPrice.toLocaleString()}</span></div>
                            
                            {product.sale_price && (
                                <>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <div><span className="text-gray-500">Regular Price:</span> <span className="font-bold line-through">৳{product.price.toLocaleString()}</span></div>
                                </>
                            )}
                            
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div><span className="text-gray-500">Status:</span> <span className="font-bold text-slate-800 dark:text-white">{product.status}</span></div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div><span className="text-gray-500">Product Code:</span> <span className="font-bold">{product.product_code}</span></div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div><span className="text-gray-500">Brand:</span> <span className="font-bold">{product.brand}</span></div>
                        </div>

                        {/* Key Features */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Key Features</h3>
                            <ul className="space-y-2 text-sm text-slate-700 dark:text-gray-300">
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <span className="text-slate-500">{feature.label}:</span> {feature.value}
                                    </li>
                                ))}
                            </ul>
                            
                            {product.short_description && (
                                <button 
                                    onClick={(e) => { e.preventDefault(); setShowDescription(!showDescription); }}
                                    className="text-[#C5A059] text-sm font-medium mt-3 inline-block hover:underline"
                                >
                                    {showDescription ? "Hide Info" : "View More Info"}
                                </button>
                            )}

                            {showDescription && product.short_description && (
                                <div className="mt-4 p-5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-sm text-slate-700 dark:text-gray-300 leading-relaxed shadow-sm">
                                    {product.short_description}
                                </div>
                            )}
                        </div>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-wrap items-center gap-4 mt-8">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 h-12 w-32 bg-white dark:bg-gray-800 rounded">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-4 h-full text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors rounded-l"
                                >-</button>
                                <input 
                                    type="text" 
                                    value={quantity} 
                                    readOnly 
                                    className="w-full text-center border-none outline-none bg-transparent font-medium"
                                />
                                <button
                                    onClick={() => setQuantity(q => Math.min(product.stock_quantity, q + 1))}
                                    className="px-4 h-full text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors rounded-r"
                                >+</button>
                            </div>

                            {/* Buy Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock_quantity === 0}
                                className="bg-zinc-900 hover:bg-black text-white px-10 py-3 rounded font-semibold transition-colors disabled:opacity-50 h-12"
                            >
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}