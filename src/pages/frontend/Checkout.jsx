import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons';
import { useCart } from '../../context/CartContext';

export default function Checkout() {
    const { cartItems, cartSubtotal, clearCart } = useCart();
    const navigate = useNavigate();
    const shippingCost = cartSubtotal > 500 ? 0 : 60;
    const total = cartSubtotal + shippingCost;

    const [formData, setFormData] = useState({
        name: '', mobile: '', address: '', city: '', state: '', zip_code: '', payment_method: 'cod'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // In a real app, this sends the formData and cartItems to /api/checkout/process
        console.log('Order Placed!', { formData, items: cartItems, total });
        clearCart();
        alert('Order placed successfully!');
        navigate('/');
    };

    if (cartItems.length === 0) {
        return <div className="text-center py-20 text-xl font-bold">Your cart is empty.</div>;
    }

    return (
        <div className="bg-slate-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-200">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout</h1>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Shipping Address Form */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Shipping Details</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Full Name</label>
                                    <input required type="text" name="name" onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Mobile Number</label>
                                    <input required type="tel" name="mobile" onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Street Address</label>
                                <textarea required name="address" rows="2" onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500 outline-none"></textarea>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">City</label>
                                    <input required type="text" name="city" onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-md px-3 py-2 outline-none focus:ring-rose-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">State</label>
                                    <input required type="text" name="state" onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-md px-3 py-2 outline-none focus:ring-rose-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Zip Code</label>
                                    <input required type="text" name="zip_code" onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white rounded-md px-3 py-2 outline-none focus:ring-rose-500" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-4 mt-8 text-slate-800 dark:text-white">Payment Method</h2>
                        <div className="space-y-3">
                            <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700">
                                <input type="radio" name="payment_method" value="cod" checked={formData.payment_method === 'cod'} onChange={handleChange} className="text-rose-600 focus:ring-rose-500 h-4 w-4" />
                                <span className="ml-3 font-medium text-slate-700 dark:text-gray-300">Cash on Delivery (COD)</span>
                            </label>
                            <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-700">
                                <input type="radio" name="payment_method" value="online" checked={formData.payment_method === 'online'} onChange={handleChange} className="text-rose-600 focus:ring-rose-500 h-4 w-4" />
                                <span className="ml-3 font-medium text-slate-700 dark:text-gray-300">Pay Online (Card / Mobile Banking)</span>
                            </label>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-slate-500">{item.quantity}x</span>
                                            <span className="text-slate-800 dark:text-gray-200">{item.name}</span>
                                        </div>
                                        <span className="font-medium text-slate-900 dark:text-white">৳{((item.sale_price || item.price) * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>৳{cartSubtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span>{shippingCost === 0 ? 'Free' : `৳${shippingCost}`}</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                                    <span className="text-2xl font-bold text-rose-600">৳{total.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button type="submit" variant="secondary" className="w-full mt-6 py-3">
                                Place Order
                            </Button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}