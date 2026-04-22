import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session from cookies via API on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (err) {
                // User is not logged in or backend is down
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials, isAdminRoute = false) => {
        try {
            const endpoint = isAdminRoute ? '/admin/login' : '/auth/login';
            const response = await api.post(endpoint, credentials);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            throw new Error(message);
        }
    };

    const logout = async () => {
        try {
            // Depending on which route they are on, but we can just call /admin/logout or similar
            // Our backend logout route is at /api/admin/logout or we can make a general /api/auth/logout
            await api.post('/admin/logout');
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setUser(null);
            // Redirect to home or login after logout
            window.location.href = '/';
        }
    };

    const hasRole = (roleName) => {
        return user?.roles?.includes(roleName);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);