import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import OrderDetails from "./OrderDetails";
import { useTranslation } from "react-i18next";

export default function AdminOrders() {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);

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

    if (loading) return <p className="text-center mt-10">{t("loading_orders")}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{t("orders")}</h1>

            {/* Таблица за десктоп/таблет */}
            <div className="overflow-x-auto hidden sm:block">
                <table className="min-w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">{t("order_id")}</th>
                            <th className="border p-2">{t("customer")}</th>
                            <th className="border p-2">{t("total")}</th>
                            <th className="border p-2">{t("status")}</th>
                            <th className="border p-2">{t("created")}</th>
                            <th className="border p-2">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrderRow
                                key={order._id}
                                order={order}
                                setSelectedOrder={setSelectedOrder}
                                updateStatus={updateStatus}
                                formatDate={formatDate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Мобилен stacked layout */}
            <div className="sm:hidden space-y-4">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="border rounded-lg p-4 shadow-sm bg-white"
                    >
                        <p className="font-semibold break-all">
                            {t("order_id")}: {order._id}
                        </p>
                        <p className="text-gray-700">
                            {t("customer")}: {order.customerName}
                        </p>
                        <p className="text-orange-600 font-semibold">
                            {t("total")}: {order.total} {t("type_currency")}
                        </p>
                        <p className="text-blue-700 font-semibold capitalize">
                            {t("status")}: {order.status}
                        </p>
                        <p className="text-gray-600">
                            {t("created")}: {formatDate(order.createdAt)}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 mt-3">
                            <button
                                onClick={() => setSelectedOrder(order)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                            >
                                {t("view")}
                            </button>
                            <button
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                onClick={() => updateStatus(order._id, "completed")}
                            >
                                {t("complete")}
                            </button>
                            <button
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                onClick={() => updateStatus(order._id, "cancelled")}
                            >
                                {t("cancel")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOrder && (
                <OrderDetails
                    order={selectedOrder}
                    formatDate={formatDate}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
}
