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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{t("orders")}</h1>

            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <table className="w-full border-collapse border">
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
            )}

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
