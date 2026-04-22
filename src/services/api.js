import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;

const categories = ['Electronics', 'Fashion', 'Home and Living', 'Beauty', 'Sneakers'];

const catImages = {
    'Electronics': [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop', 
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop'
    ],
    'Fashion': [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop', 
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop'
    ],
    'Home and Living': [
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop', 
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop'
    ],
    'Beauty': [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', 
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
    ],
    'Sneakers': [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop'
    ]
};

// Generate mock data once
const generateMockData = () => {
    const products = [
        {
            id: 9991,
            name: 'iPhone 15 Pro Max',
            slug: 'iphone-15-pro-max',
            price: 124999,
            sale_price: 114999,
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'
            ],
            category: 'Electronics',
            brand: 'Apple',
            product_code: 'RS-IP15',
            status: 'In Stock',
            stock_quantity: 25,
            star_points: 1249,
            short_description: 'The ultimate iPhone experience with a groundbreaking new camera system, advanced display, and the revolutionary A17 Pro chip.',
            features: [
                { label: 'Display', value: '6.7-inch Super Retina XDR' },
                { label: 'Processor', value: 'A17 Pro Bionic' },
                { label: 'Camera', value: '48MP Main + 12MP Ultra Wide' }
            ]
        },
        {
            id: 9992,
            name: 'Nike Air Max 270',
            slug: 'nike-air-max-270',
            price: 8500,
            sale_price: 6999,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop'
            ],
            category: 'Fashion',
            brand: 'Nike',
            product_code: 'RS-NK270',
            status: 'In Stock',
            stock_quantity: 40,
            star_points: 85,
            short_description: 'The Nike Air Max 270 delivers visible cushioning under every step. Updated for modern comfort, it pays homage to the original.',
            features: [
                { label: 'Material', value: 'Breathable Mesh' },
                { label: 'Sole', value: 'Air Max Cushioning' },
                { label: 'Style', value: 'Lifestyle Running' }
            ]
        },
        {
            id: 9993,
            name: 'Minimalist Wood Desk',
            slug: 'minimalist-wood-desk',
            price: 12500,
            sale_price: null,
            image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop'
            ],
            category: 'Home and Living',
            brand: 'IKEA',
            product_code: 'RS-WD100',
            status: 'In Stock',
            stock_quantity: 10,
            star_points: 125,
            short_description: 'A beautiful, minimalist wooden desk that fits perfectly into any modern home office. Features a durable surface and sturdy legs.',
            features: [
                { label: 'Material', value: 'Solid Oak Wood' },
                { label: 'Dimensions', value: '120cm x 60cm x 75cm' },
                { label: 'Assembly', value: 'Required (Easy)' }
            ]
        },
        {
            id: 9994,
            name: 'Sony WH-1000XM5',
            slug: 'sony-wh-1000xm5',
            price: 35000,
            sale_price: 32000,
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
            images: [
                'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'
            ],
            category: 'Electronics',
            brand: 'Sony',
            product_code: 'RS-SNYXM5',
            status: 'In Stock',
            stock_quantity: 30,
            star_points: 350,
            short_description: 'Industry-leading noise cancellation. The WH-1000XM5 headphones rewrite the rules for distraction-free listening and impeccable call clarity.',
            features: [
                { label: 'Battery', value: 'Up to 30 hours' },
                { label: 'Noise Cancellation', value: 'Active Noise Cancelling (ANC)' },
                { label: 'Connectivity', value: 'Bluetooth 5.2 / Multipoint' }
            ]
        }
    ];
    let idCounter = 1;

    categories.forEach(cat => {
        for(let i = 1; i <= 12; i++) {
            const price = Math.floor(Math.random() * 50000) + 1000;
            const isSale = i % 3 === 0;
            const sale_price = isSale ? Math.floor(price * 0.8) : null;
            
            products.push({
                id: idCounter,
                name: `Premium ${cat} Item ${i}`,
                slug: `premium-${cat.toLowerCase().replace(/ /g, '-')}-item-${i}`,
                price: price,
                sale_price: sale_price,
                image: catImages[cat][i % 2],
                images: [
                    catImages[cat][i % 2],
                    catImages[cat][(i + 1) % 2],
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'
                ],
                category: cat,
                brand: 'RaihanShop Brands',
                product_code: `RS-${10000 + idCounter}`,
                status: i % 7 === 0 ? 'Out of Stock' : 'In Stock',
                stock_quantity: i % 7 === 0 ? 0 : Math.floor(Math.random() * 50) + 5,
                star_points: Math.floor(price / 100),
                short_description: `This is a premium ${cat} item designed to offer the best quality and value. It features top-notch materials and cutting-edge design, perfect for your daily needs.`,
                features: [
                    { label: 'Model', value: `Premium ${cat} Gen ${i}` },
                    { label: 'Material', value: 'High-quality synthetic / natural blend' },
                    { label: 'Warranty', value: '1 Year Manufacturer Warranty' },
                    { label: 'Dimensions', value: 'Standard Size' },
                    { label: 'Weight', value: '1.2 kg' }
                ]
            });
            idCounter++;
        }
    });
    return products;
};

const MOCK_PRODUCTS = generateMockData();

// Simulated Network Delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (category = 'All', searchQuery = '') => {
    await delay(600); // Simulate network latency
    let results = MOCK_PRODUCTS;
    
    if (category && category !== 'All') {
        results = results.filter(p => p.category === category);
    }
    
    if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        results = results.filter(p => p.name.toLowerCase().includes(lowerQuery));
    }
    
    return results;
};

export const getProductById = async (id) => {
    await delay(400); // Simulate network latency
    const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return product;
};

export const getProductBySlug = async (slug) => {
    await delay(400);
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    if (!product) throw new Error('Product not found');
    return product;
};