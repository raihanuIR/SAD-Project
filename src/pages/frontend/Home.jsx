import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCards';

export default function Home() {
    // Data matched exactly from your Laravel DatabaseSeeder
    const banners = [
        {
            id: 1,
            title: 'Summer Collection 2026',
            description: 'Discover the latest trends in fashion. Get up to 50% off on selected items.',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop',
        }
    ];

    const featuredProducts = [
        {
            id: 9991,
            name: 'iPhone 15 Pro Max',
            slug: 'iphone-15-pro-max',
            price: 124999,
            sale_price: 114999,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
            category: 'Electronics'
        },
        {
            id: 9992,
            name: 'Nike Air Max 270',
            slug: 'nike-air-max-270',
            price: 8500,
            sale_price: 6999,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            category: 'Fashion'
        },
        {
            id: 9993,
            name: 'Minimalist Wood Desk',
            slug: 'minimalist-wood-desk',
            price: 12500,
            image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
            category: 'Home and Living'
        },
        {
            id: 9994,
            name: 'Sony WH-1000XM5',
            slug: 'sony-wh-1000xm5',
            price: 35000,
            sale_price: 32000,
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
            category: 'Electronics'
        }
    ];

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen transition-colors duration-200">

            {/* Hero Banner Section */}
            {/* Premium Cinematic Hero Banner */}
            <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=800&fit=crop" 
                        alt="Store Background" 
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent dark:from-black/90 dark:via-black/60 dark:to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
                    <div className="max-w-2xl text-left">
                        {/* Subtle Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#C5A059] mr-2 animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-widest text-white uppercase">New Collection 2026</span>
                        </div>
                        
                        {/* Main Typography */}
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
                            ELEVATE YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C07B]">LIFESTYLE</span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-slate-200 mb-10 font-light max-w-lg leading-relaxed">
                            Discover the perfect blend of modern aesthetics and unparalleled quality. Shop our exclusively curated selection of fashion, tech, and beauty.
                        </p>
                        
                        {/* Call to Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/products" className="inline-flex justify-center items-center px-8 py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-none shadow-lg shadow-white/10 transition-all hover:-translate-y-1">
                                SHOP COLLECTION
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                            <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-none transition-all hover:-translate-y-1">
                                EXPLORE LOOKBOOK
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70">
                    <span className="text-white text-xs font-medium tracking-widest uppercase mb-2">Scroll</span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
            </section>


            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10">Product Categories</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    {/* Top Row: 3 Cards (Span 2, Span 1, Span 1) */}
                    
                    {/* Home and Living - Span 2 */}
                    <Link to="/products?category=Home%20and%20Living" className="md:col-span-2 min-h-[225px] bg-zinc-200 dark:bg-zinc-800 rounded-2xl p-8 relative overflow-hidden group flex flex-col justify-center hover:shadow-xl transition-all cursor-pointer block">
                        <div className="relative z-10 max-w-[50%]">
                            <h3 className="text-4xl font-black text-slate-500 mb-4 mt-1">HOME AND<br/>LIVING</h3>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop" 
                            alt="Home and Living" 
                            className="absolute right-0 bottom-0 w-64 h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500 rounded-l-[4rem]"
                        />
                    </Link>

                    {/* Fashion - Span 1 */}
                    <Link to="/products?category=Fashion" className="bg-zinc-300 min-h-[225px] dark:bg-zinc-700 rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-center hover:shadow-xl transition-all cursor-pointer block">
                        <div className="relative z-10 max-w-[70%]">
                            <h3 className="text-2xl font-black text-slate-500 mb-2 mt-1">FASHION</h3>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop" 
                            alt="Fashion" 
                            className="absolute -right-4 -bottom-4 w-36 h-36 object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 drop-shadow-xl rounded-tl-[3rem]"
                        />
                    </Link>

                    {/* Electronics - Span 1 */}
                    <Link to="/products?category=Electronics" className="bg-zinc-100 min-h-[225px] dark:bg-zinc-800 rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-center hover:shadow-xl transition-all cursor-pointer block">
                        <div className="relative z-10 max-w-[70%]">
                            <h3 className="text-2xl font-black text-slate-500 mb-2 mt-1">ELECTRONICS</h3>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop" 
                            alt="Electronics" 
                            className="absolute -right-4 -bottom-4 w-36 h-36 object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 drop-shadow-xl rounded-tl-[3rem]"
                        />
                    </Link>

                    {/* Bottom Row: 2 Cards (Span 2, Span 2) */}
                    
                    {/* Beauty - Span 2 */}
                    <Link to="/products?category=Beauty" className="md:col-span-2 min-h-[240px] bg-zinc-300 dark:bg-zinc-800 rounded-2xl p-8 relative overflow-hidden group flex flex-col justify-center hover:shadow-xl transition-all cursor-pointer block">
                        <div className="relative z-10 max-w-[50%]">
                            <h3 className="text-4xl font-black text-slate-500 mb-4 mt-1">BEAUTY</h3>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop" 
                            alt="Beauty" 
                            className="absolute -right-10 bottom-0 w-72 h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-l-[4rem]"
                        />
                    </Link>

                    {/* Sneakers - Span 2 */}
                    <Link to="/products?category=Sneakers" className="md:col-span-2 min-h-[240px] bg-zinc-200 dark:bg-zinc-900 rounded-2xl p-8 relative overflow-hidden group flex flex-col justify-center hover:shadow-xl transition-all cursor-pointer block">
                        <div className="relative z-10 max-w-[50%]">
                            <h3 className="text-4xl font-black text-slate-500 mb-4 mt-1">SNEAKERS</h3>
                        </div>
                        <img 
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" 
                            alt="Sneakers" 
                            className="absolute right-0 bottom-0 w-72 h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl rounded-tl-[4rem]"
                        />
                    </Link>

                </div>
            </section>

            {/* Featured Products Grid */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">New Arrivals</h2>
                        <p className="text-slate-500 dark:text-gray-400 mt-2">Check out our newest products</p>
                    </div>
                    <Link to="/products" className="text-[#C5A059] hover:text-[#b08d4a] font-medium hover:underline">View All &rarr;</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onAdd={() => alert("Added to cart")} />
                    ))}
                </div>
            </section>


        </div>
    );
}