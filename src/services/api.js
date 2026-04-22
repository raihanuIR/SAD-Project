import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

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
    const response = await api.get('/products', {
        params: { category, search: searchQuery }
    });
    return response.data;
};

export const getProductBySlug = async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
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