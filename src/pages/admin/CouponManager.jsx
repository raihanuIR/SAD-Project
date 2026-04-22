import { useState } from 'react';
import Button from '../../components/Buttons';

export default function CouponManager() {
    // Dummy data representing coupons from your database
    const [coupons, setCoupons] = useState([
        { id: 1, code: 'SUMMER26', type: 'percentage', value: 15, min_order: 1000, usage: '45 / 100', expiry: '2026-08-31', status: 'Active' },
        { id: 2, code: 'WELCOME500', type: 'fixed', value: 500, min_order: 2000, usage: '12 / ∞', expiry: '2026-12-31', status: 'Active' },
        { id: 3, code: 'FLASH50', type: 'percentage', value: 50, min_order: 0, usage: '50 / 50', expiry: '2026-04-10', status: 'Expired' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Coupons & Discounts</h1>
                <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 shadow-sm rounded-md px-4 py-2">
                    + Create Coupon
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="p-4 font-medium">Coupon Code</th>
                                <th className="p-4 font-medium">Discount</th>
                                <th className="p-4 font-medium">Min. Order</th>
                                <th className="p-4 font-medium">Usage (Used/Limit)</th>
                                <th className="p-4 font-medium">Expiry Date</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                                            {coupon.code}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">
                                        {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `৳${coupon.value} OFF`}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {coupon.min_order > 0 ? `৳${coupon.min_order}` : 'No minimum'}
                                    </td>
                                    <td className="p-4 text-gray-600 font-medium">
                                        {coupon.usage}
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {coupon.expiry}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${coupon.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                            {coupon.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <Button variant="ghost" className="text-blue-600 hover:text-blue-800 font-medium text-sm px-2 py-1">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}