import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 
             (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:3000/api' 
                : 'https://raihanshop.vercel.app/api'),
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const MOCK_PRODUCTS = [
    {
        id: 101,
        name: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max",
        price: 124999,
        sale_price: 114999,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
        category: "Electronics",
        brand: "Apple",
        product_code: "RS-IP15",
        status: "In Stock",
        stock_quantity: 25,
        short_description: "The ultimate iPhone experience with a groundbreaking new camera system and A17 Pro chip.",
        features: [{ label: "Display", value: "6.7-inch Super Retina XDR" }, { label: "Processor", value: "A17 Pro" }]
    },
    {
        id: 102,
        name: "Sony WH-1000XM5",
        slug: "sony-wh-1000xm5",
        price: 35000,
        sale_price: 32000,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
        category: "Electronics",
        brand: "Sony",
        product_code: "RS-SNYXM5",
        status: "In Stock",
        stock_quantity: 30,
        short_description: "Industry-leading noise cancellation headphones with exceptional sound quality.",
        features: [{ label: "Battery Life", value: "Up to 30 hours" }, { label: "Connectivity", value: "Bluetooth 5.2" }]
    },
    {
        id: 103,
        name: "Nike Air Max 270",
        slug: "nike-air-max-270",
        price: 8500,
        sale_price: 6999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        category: "Sneakers",
        brand: "Nike",
        product_code: "RS-NK270",
        status: "In Stock",
        stock_quantity: 40,
        short_description: "Visible cushioning under every step. Modern design meets lightweight athletic comfort.",
        features: [{ label: "Material", value: "Breathable Mesh" }, { label: "Sole", value: "Rubber sole" }]
    },
    {
        id: 104,
        name: "Minimalist Wood Desk",
        slug: "minimalist-wood-desk",
        price: 12500,
        sale_price: null,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop",
        category: "Home and Living",
        brand: "IKEA",
        product_code: "RS-WD100",
        status: "In Stock",
        stock_quantity: 10,
        short_description: "Beautiful minimalist wooden desk for any modern home office.",
        features: [{ label: "Material", value: "Solid Oak Wood" }, { label: "Dimensions", value: "120cm x 60cm" }]
    },
    {
        id: 105,
        name: "Premium Leather Jacket",
        slug: "premium-leather-jacket",
        price: 15000,
        sale_price: 13500,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        category: "Fashion",
        brand: "RaihanShop Brands",
        product_code: "RS-LJ101",
        status: "In Stock",
        stock_quantity: 15,
        short_description: "Crafted from 100% genuine top-grain leather. A timeless classic designed for style and durability.",
        features: [{ label: "Material", value: "100% Genuine Leather" }, { label: "Lining", value: "Polyester" }]
    },
    {
        id: 106,
        name: "Hydrating Face Serum",
        slug: "hydrating-face-serum",
        price: 2500,
        sale_price: null,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        category: "Beauty",
        brand: "RaihanShop Brands",
        product_code: "RS-FS202",
        status: "In Stock",
        stock_quantity: 50,
        short_description: "Intense hydration with hyaluronic acid and vitamin C for glowing skin.",
        features: [{ label: "Skin Type", value: "All skin types" }, { label: "Volume", value: "50ml" }]
    }
];

function getMockProducts(category, searchQuery) {
    return MOCK_PRODUCTS.filter(product => {
        const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
        const matchesSearch = !searchQuery || 
                             product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             product.short_description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// ─── Auth ───
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

// ─── Brands ───
export const getBrands = async () => {
    const response = await api.get('/brands');
    return response.data;
};

export const createBrand = async (name) => {
    const response = await api.post('/brands', { name });
    return response.data;
};

export const deleteBrand = async (id) => {
    const response = await api.delete(`/brands/${id}`);
    return response.data;
};

// ─── Offers ───
export const getOffers = async () => {
    const response = await api.get('/offers');
    return response.data;
};

export const createOffer = async (data) => {
    const response = await api.post('/offers', data);
    return response.data;
};

export const deleteOffer = async (id) => {
    const response = await api.delete(`/offers/${id}`);
    return response.data;
};

// ─── Products ───
export const getProducts = async (category = 'All', searchQuery = '') => {
    try {
        const response = await api.get('/products', {
            params: { category, search: searchQuery }
        });
        if (response.data && response.data.length > 0) {
            return response.data;
        }
        return getMockProducts(category, searchQuery);
    } catch (error) {
        console.error("Failed to fetch products, using fallback static products:", error);
        return getMockProducts(category, searchQuery);
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch product by slug, using fallback:", error);
        const fallback = MOCK_PRODUCTS.find(p => p.slug === slug);
        if (fallback) return fallback;
        throw error;
    }
};

// ─── Categories ───
export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const createCategory = async (name) => {
    const response = await api.post('/categories', { name });
    return response.data;
};

export const updateCategory = async (id, name) => {
    const response = await api.patch(`/categories/${id}`, { name });
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
};

// ─── Coupons ───
export const getCoupons = async () => {
    const response = await api.get('/coupons');
    return response.data;
};

export const createCoupon = async (couponData) => {
    const response = await api.post('/coupons', couponData);
    return response.data;
};

export const deleteCoupon = async (id) => {
    const response = await api.delete(`/coupons/${id}`);
    return response.data;
};

export const validateCoupon = async (code, amount) => {
    const response = await api.post('/coupons/validate', { code, amount });
    return response.data;
};

// ─── Admin Dashboard ───
export const getAdminStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data;
};

export const getReports = async () => {
    const response = await api.get('/admin/reports');
    return response.data;
};

// ─── Admin Orders ───
export const getAdminOrders = async () => {
    const response = await api.get('/admin/orders');
    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.patch(`/admin/orders/${orderId}`, { status });
    return response.data;
};

// ─── Admin Products ───
export const getAdminProducts = async () => {
    const response = await api.get('/admin/products');
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await api.patch(`/admin/products/${productId}`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
};

// ─── User Profile ───
export const getUserOrders = async () => {
    const response = await api.get('/user/orders');
    return response.data;
};

export default api;