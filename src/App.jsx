import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/frontend/Home';
import Login from './pages/auth/Login';
import { CartProvider } from './context/CartContext';
import Cart from './pages/frontend/Cart';
import ProductIndex from './pages/frontend/ProductIndex';
import Checkout from './pages/frontend/Checkout';
import Dashboard from './pages/admin/Dashboard';
import ProductForm from './pages/admin/ProductForm';
import OrderManager from './pages/admin/OrderManager';
import Profile from './pages/frontend/Profile';
import ProductShow from './pages/frontend/ProductShow';
import Register from './pages/auth/Register';
import CategoryManager from './pages/admin/CategoryManager';
import CouponManager from './pages/admin/CouponManager';
import Contact from './pages/frontend/Contact';
import About from './pages/frontend/About';
import PrivacyPolicy from './pages/frontend/PrivacyPolicy';

// We will build these layout files next!
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Temporary placeholder components to prevent errors
const Placeholder = ({ title }) => <div className="p-10 text-2xl text-center">{title}</div>;

// The Protected Route Wrapper
const ProtectedRoute = ({ children, requireRole }) => {
  const { user, loading, hasRole } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to={requireRole === 'admin' ? '/admin/login' : '/auth/login'} />;
  if (requireRole && !hasRole(requireRole)) return <Navigate to="/" />;
  return children;
};

import ScrollToTop from './components/ScrollToTop';

import ProductManager from './pages/admin/ProductManager';
import BrandManager from './pages/admin/BrandManager';
import OfferManager from './pages/admin/OfferManager';
import ReportManager from './pages/admin/ReportManager';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>

          {/* FRONTEND STORE ECOSYSTEM */}
          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductIndex />} />
            <Route path="/products/:slug" element={<ProductShow />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
          </Route>  

          {/* ADMIN ECOSYSTEM */}
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={
            <ProtectedRoute requireRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="products/create" element={<ProductForm />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="brands" element={<BrandManager />} />
            <Route path="offers" element={<OfferManager />} />
            <Route path="coupons" element={<CouponManager />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="reports" element={<ReportManager />} />
          </Route>

        </Routes>
      </BrowserRouter>
      </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}