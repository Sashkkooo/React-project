import { useTranslation } from "react-i18next";


export default function OrderRow({ order, setSelectedOrder, updateStatus, formatDate }) {

    const { t } = useTranslation();

    return (
        <tr key={order._id} className="hover:bg-gray-50">
            <td className="border p-2">{order._id}</td>
            <td className="border p-2">
                {order.name} {order.surname} <br />
                {order.email}
            </td>
            <td className="border p-2">{t("type_currency")} {order.totalPrice.toFixed(2)}</td>
            <td className="border p-2">{order.status}</td>
            <td className="border p-2">{formatDate(order.createdAt)}</td>
            <td className="border p-2">
                <button
                    className="px-2 py-1 bg-blue-600 text-white rounded mr-2"
                    onClick={() => setSelectedOrder(order)}
                >
                    {t("view")}
                </button>
                <button
                    className="px-2 py-1 bg-green-600 text-white rounded mr-2"
                    onClick={() => updateStatus(order._id, "completed")}
                >
                    {t("complete")}
                </button>
                <button
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    onClick={() => updateStatus(order._id, "cancelled")}
                >
                    {t("cancel")}
                </button>
            </td>
        </tr>
    );
}
