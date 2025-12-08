import { useEffect, useState } from "react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Helper за форматиране на дата
    const formatDate = (createdAt) => {
        if (!createdAt) return "";
        if (typeof createdAt === "string") {
            return new Date(createdAt).toLocaleString();
        }
        if (createdAt.$date?.$numberLong) {
            return new Date(parseInt(createdAt.$date.$numberLong)).toLocaleString();
        }
        return "";
    };

    // ✅ Взимаме поръчките от бекенда
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost:8000/getOrders.php");
                const data = await res.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const res = await fetch("http://localhost:8000/updateOrder.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, status }),
            });
            const data = await res.json();
            if (data.success) {
                setOrders((prev) =>
                    prev.map((o) => (o._id === orderId ? { ...o, status } : o))
                );
            }
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Order ID</th>
                            <th className="border p-2">Customer</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Created</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="border p-2">{order._id}</td>
                                <td className="border p-2">
                                    {order.name} {order.surname} <br />
                                    {order.email}
                                </td>
                                <td className="border p-2">BGN {order.totalPrice.toFixed(2)}</td>
                                <td className="border p-2">{order.status}</td>
                                <td className="border p-2">{formatDate(order.createdAt)}</td>
                                <td className="border p-2">
                                    <button
                                        className="px-2 py-1 bg-blue-600 text-white rounded mr-2"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-green-600 text-white rounded mr-2"
                                        onClick={() => updateStatus(order._id, "completed")}
                                    >
                                        Complete
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-600 text-white rounded"
                                        onClick={() => updateStatus(order._id, "cancelled")}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* ✅ Модал за детайли */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Order Details</h2>
                        <p><strong>Customer:</strong> {selectedOrder.name} {selectedOrder.surname}</p>
                        <p><strong>Email:</strong> {selectedOrder.email}</p>
                        <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                        <p><strong>Delivery:</strong> {selectedOrder.deliveryOption}</p>

                        {/* ✅ показваме офиса само ако има име */}
                        {selectedOrder.officeName && (
                            <p><strong>Office:</strong> {selectedOrder.officeName}</p>
                        )}
                        {selectedOrder.officeAddress && (
                            <p><strong>Office Address:</strong> {selectedOrder.officeAddress}</p>
                        )}

                        {/* ✅ показваме адрес само ако има данни */}
                        {selectedOrder.address &&
                            Object.values(selectedOrder.address).some((v) => v && v.trim()) && (
                                <p>
                                    <strong>Address:</strong>{" "}
                                    {[
                                        selectedOrder.address.streetOrQuarter,
                                        selectedOrder.address.num,
                                        selectedOrder.address.block,
                                        selectedOrder.address.entrance,
                                        selectedOrder.address.floor,
                                        selectedOrder.address.apartment,
                                    ]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                            )}

                        {/* ✅ показваме billing само ако е избрано */}
                        {selectedOrder.billingRequired && selectedOrder.billingType && (
                            <p><strong>Billing:</strong> {selectedOrder.billingType}</p>
                        )}

                        <p><strong>Total:</strong> BGN {selectedOrder.totalPrice}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>
                        <p><strong>Created:</strong> {formatDate(selectedOrder.createdAt)}</p>

                        <h3 className="mt-4 font-semibold">Products:</h3>
                        <ul className="list-disc ml-6">
                            {selectedOrder.cart.map((item, idx) => (
                                <li key={idx}>
                                    {item.name} x {item.qty} – BGN {item.price}
                                </li>
                            ))}
                        </ul>

                        {/* ✅ показваме images само ако има */}
                        {selectedOrder.images?.length > 0 && (
                            <>
                                <h3 className="mt-4 font-semibold">Images:</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {selectedOrder.images.map((url, idx) => (
                                        <img
                                            key={idx}
                                            src={url}
                                            alt="Order file"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        <button
                            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
                            onClick={() => setSelectedOrder(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
