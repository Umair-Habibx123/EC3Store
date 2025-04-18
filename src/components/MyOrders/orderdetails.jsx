import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
    Package,
    Clock,
    CheckCircle,
    Truck,
    Home,
    CreditCard,
    Wallet,
    XCircle,
    Loader2,
    ChevronLeft,
    Star,
    MapPin,
    Calendar,
    ShoppingBag,
    Box,
    ShieldCheck,
    ArrowLeft
} from "lucide-react";
import { useUser } from "../../context/UserContext";

const statusIcons = {
    pending: <Clock className="text-amber-500" size={20} />,
    confirmed: <CheckCircle className="text-blue-500" size={20} />,
    shipped: <Truck className="text-indigo-500" size={20} />,
    delivered: <Home className="text-green-500" size={20} />,
    cancelled: <XCircle className="text-red-500" size={20} />
};

const paymentIcons = {
    cash: <Wallet className="text-gray-600" size={20} />,
    card: <CreditCard className="text-gray-600" size={20} />
};

const statusColors = {
    pending: "bg-amber-50 text-amber-800 border-amber-200",
    confirmed: "bg-blue-50 text-blue-800 border-blue-200",
    shipped: "bg-indigo-50 text-indigo-800 border-indigo-200",
    delivered: "bg-green-50 text-green-800 border-green-200",
    cancelled: "bg-red-50 text-red-800 border-red-200"
};

const paymentStatusColors = {
    paid: "bg-green-50 text-green-800 border-green-200",
    unpaid: "bg-amber-50 text-amber-800 border-amber-200",
    failed: "bg-red-50 text-red-800 border-red-200"
};

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const currentUser = useUser();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const orderRef = doc(db, "orders", orderId);
                const orderSnap = await getDoc(orderRef);

                if (!orderSnap.exists()) {
                    throw new Error("Order not found");
                }

                const orderData = orderSnap.data();
                if (orderData.userId !== currentUser.uid) {
                    throw new Error("Unauthorized access");
                }

                setOrder({
                    id: orderSnap.id,
                    ...orderData,
                    createdAt: orderData.createdAt || new Date()
                });

                // Fetch product details for each item in the order
                if (orderData.items && orderData.items.length > 0) {
                    setLoadingProducts(true);
                    const productPromises = orderData.items.map(async (item) => {
                        const productRef = doc(db, "products", item.productId);
                        const productSnap = await getDoc(productRef);
                        if (productSnap.exists()) {
                            return {
                                ...productSnap.data(),
                                id: productSnap.id,
                                orderQuantity: item.quantity,
                                orderPrice: item.price
                            };
                        }
                        return null;
                    });

                    const productsData = await Promise.all(productPromises);
                    setProducts(productsData.filter(Boolean));
                }
            } catch (err) {
                console.error("Error fetching order: ", err);
                setError(err.message);
            } finally {
                setLoading(false);
                setLoadingProducts(false);
            }
        };

        fetchOrder();
    }, [orderId, currentUser, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <Loader2 className="animate-spin w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Order</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/orders")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to My Orders
                    </button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
                    <button
                        onClick={() => navigate("/MyOrders")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to My Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate("/MyOrders")}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="font-medium">Back to Orders</span>
                </button>


                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-8">
                    <div className="p-6 sm:p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status Timeline</h2>
                        <div className="relative">
                            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>

                            <div className="space-y-6">
                                {[
                                    { status: 'pending', label: 'Order Placed', description: 'Your order has been received' },
                                    { status: 'confirmed', label: 'Order Confirmed', description: 'Seller has processed your order' },
                                    { status: 'shipped', label: 'Shipped', description: 'Your item is on the way' },
                                    { status: 'delivered', label: 'Delivered', description: 'Your item has been delivered' }
                                ].map((step, index) => (
                                    <div key={step.status} className="relative pl-10">
                                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${order.status === step.status ? 'border-blue-500 bg-blue-50' : (index < Object.keys(statusColors).indexOf(order.status) ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50')}`}>
                                            {order.status === step.status ? (
                                                statusIcons[step.status]
                                            ) : index < Object.keys(statusColors).indexOf(order.status) ? (
                                                <CheckCircle className="text-green-500" size={20} />
                                            ) : (
                                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                            )}
                                        </div>
                                        <div className="min-h-8">
                                            <h3 className={`font-medium ${index <= Object.keys(statusColors).indexOf(order.status) ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {step.label}
                                            </h3>
                                            <p className={`text-sm ${index <= Object.keys(statusColors).indexOf(order.status) ? 'text-gray-700' : 'text-gray-400'}`}>
                                                {step.description}
                                            </p>
                                            {order.status === step.status && (
                                                <p className="text-xs text-blue-600 mt-1">
                                                    Current status - {new Date().toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-6 sm:p-8 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                                    <ShoppingBag className="text-blue-600" />
                                    Order #{order.id.slice(0, 8)}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={16} />
                                    <span>
                                        {order.createdAt.toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 border ${statusColors[order.status]}`}>
                                    {statusIcons[order.status]}
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${paymentStatusColors[order.paymentStatus]}`}>
                                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Box className="text-gray-700" />
                                Order Items
                            </h2>

                            <div className="space-y-6">
                                {loadingProducts ? (
                                    <div className="flex justify-center py-8">
                                        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
                                    </div>
                                ) : (
                                    products.map((product) => (
                                        <div key={product.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                            <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden border border-gray-100">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18d9b8a6d6a%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18d9b8a6d6a%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2235.5%22%20y%3D%2256.5%22%3E100x100%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                                        }}
                                                    />
                                                ) : (
                                                    <Package className="w-full h-full p-4 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-medium text-gray-900">{product.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{product.description?.substring(0, 100)}...</p>

                                                {product.attributes && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {product.attributes.map((attr) => (
                                                            <div key={attr.id || attr.name} className="bg-gray-50 p-3 rounded-lg">
                                                                <span className="font-medium text-gray-700 capitalize">{attr.name}:</span>
                                                                <span className="ml-2 text-gray-900 font-medium">{attr.value || "N/A"}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="mt-3 flex items-center gap-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        Rs. {product.orderPrice.toLocaleString()} × {product.orderQuantity}
                                                    </span>
                                                    <span className="text-sm font-semibold text-blue-600">
                                                        Rs. {(product.orderPrice * product.orderQuantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="text-gray-700" />
                                    Shipping Details
                                </h2>
                                <div className="space-y-2 text-gray-700">
                                    <p className="mt-2">
                                        <span className="font-medium">Address:</span> {order.shippingAddress || 'Not provided'}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    {paymentIcons[order.paymentMethod]}
                                    Payment Information
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Method:</span>
                                        <span className="font-medium capitalize">{order.paymentMethod}</span>
                                    </div>
                                    {order.transactionId && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transaction ID:</span>
                                            <span className="font-medium">{order.transactionId}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Status:</span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${paymentStatusColors[order.paymentStatus]}`}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <ShieldCheck className="text-gray-700" />
                                    Order Summary
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">Rs. {order.totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping:</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-3 mt-2">
                                        <span className="text-gray-900 font-semibold">Total:</span>
                                        <span className="text-gray-900 font-bold">Rs. {order.totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;