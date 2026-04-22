import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Try to load cart from local storage first
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('siamstore_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to local storage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('siamstore_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    // Calculate Totals
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((total, item) => total + ((item.sale_price || item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartSubtotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);