import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../../components/Buttons';

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();
    const shippingCost = cartSubtotal > 50000 ? 0 : 500;
    const finalTotal = cartSubtotal + shippingCost;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Your cart is empty</h2>
                <p className="text-zinc-500 mb-6">Looks like you haven't added any products yet.</p>
                <Link to="/products" className="bg-zinc-900 hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 min-h-screen py-12 transition-colors duration-200">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-700 p-1" />

                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-zinc-800 dark:text-white text-lg">{item.name}</h3>
                                            <p className="text-[#C5A059] text-sm font-medium">{item.category}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-medium px-2 py-1"
                                        >
                                            Remove
                                        </Button>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center border border-zinc-200 dark:border-zinc-600 rounded-lg">
                                            <Button
                                                variant="ghost"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 rounded-none rounded-l-lg transition-colors"
                                            >-</Button>
                                            <span className="px-4 py-1 font-medium text-zinc-800 dark:text-white border-x border-zinc-200 dark:border-zinc-600">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-1 text-zinc-600 hover:bg-zinc-100 rounded-none rounded-r-lg transition-colors"
                                            >+</Button>
                                        </div>
                                        <div className="font-bold text-lg text-zinc-900 dark:text-white">
                                            ৳{((item.sale_price || item.price) * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 sticky top-24">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Order Summary</h3>

                            <div className="space-y-3 text-zinc-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-zinc-900 dark:text-white">৳{cartSubtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-zinc-900 dark:text-white">
                                        {shippingCost === 0 ? <span className="text-green-600">Free</span> : `৳${shippingCost}`}
                                    </span>
                                </div>
                            </div>

                            {/* Coupon Form (Matches CouponController) */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        className="flex-1 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                                    />
                                    <Button variant="secondary" className="rounded-md">
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-zinc-900 dark:text-white">Total</span>
                                    <span className="text-2xl font-bold text-[#C5A059]">৳{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full block text-center bg-zinc-900 hover:bg-black text-white py-3 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}