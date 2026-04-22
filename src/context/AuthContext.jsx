import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is already logged in when the app loads
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (credentials, isAdminRoute = false) => {
        const endpoint = isAdminRoute ? '/admin/login' : '/auth/login';
        // Laravel requires a CSRF token before login
        await api.get('/sanctum/csrf-cookie');
        const response = await api.post(endpoint, credentials);
        setUser(response.data.user);
        return response.data;
    };

    const logout = async (isAdminRoute = false) => {
        const endpoint = isAdminRoute ? '/admin/logout' : '/auth/logout';
        await api.post(endpoint);
        setUser(null);
    };

    const hasRole = (roleName) => {
        // Check if the user has the required Spatie role
        return user?.roles?.includes(roleName);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);