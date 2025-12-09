import { useTranslation } from "react-i18next";

export default function OrderDetailsModal({ order, formatDate, onClose }) {

    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">{t("order_details")}</h2>
                <p><strong>{t("customer")}:</strong> {order.name} {order.surname}</p>
                <p><strong>{t("email")}:</strong> {order.email}</p>
                <p><strong>{t("phone")}:</strong> {order.phone}</p>
                <p><strong>{t("delivery")}:</strong> {order.deliveryOption}</p>

                {order.officeName && <p><strong>{t("office")}:</strong> {order.officeName}</p>}
                {order.officeAddress && <p><strong>{t("office_address")}:</strong> {order.officeAddress}</p>}

                {order.address &&
                    Object.values(order.address).some((v) => v && v.trim()) && (
                        <p>
                            <strong>{t("address")}:</strong>{" "}
                            {[
                                order.address.streetOrQuarter,
                                order.address.num,
                                order.address.block,
                                order.address.entrance,
                                order.address.floor,
                                order.address.apartment,
                            ]
                                .filter(Boolean)
                                .join(", ")}
                        </p>
                    )}

                {order.billingRequired && order.billingType && (
                    <div className="mt-2">
                        <p><strong>{t("Billing")}:</strong> {order.billingType}</p>

                        {order.billingType === "individual" && order.billingInfo && (
                            <div className="ml-4 text-sm text-gray-700">
                                <p><strong>{t("city")}:</strong> {order.billingInfo.city}</p>
                                <p><strong>{t("postcode")}:</strong> {order.billingInfo.postCode}</p>
                                <p><strong>{t("street")}:</strong> {order.billingInfo.streetOrQuarter}</p>
                                <p><strong>{t("number")}:</strong> {order.billingInfo.num}</p>
                            </div>
                        )}

                        {order.billingType === "company" && order.companyInfo && (
                            <div className="ml-4 text-sm text-gray-700">
                                <p><strong>{t("company_name")}:</strong> {order.companyInfo.companyName}</p>
                                <p><strong>{t("eic")}:</strong> {order.companyInfo.companyEIK}</p>
                                <p><strong>{t("city")}:</strong> {order.companyInfo.companyCity}</p>
                                <p><strong>{t("address")}:</strong> {order.companyInfo.companyAddress}</p>
                                <p><strong>{t("prp")}:</strong> {order.companyInfo.companyMOL}</p>
                                <p><strong>{t("vat")}:</strong> {order.companyInfo.companyVAT}</p>
                            </div>
                        )}
                    </div>
                )}

                <p><strong>{t("total")}:</strong> {t("type_currency")} {order.totalPrice}</p>
                <p><strong>{t("status")}:</strong> {order.status}</p>
                <p><strong>{t("created")}:</strong> {formatDate(order.createdAt)}</p>

                <h3 className="mt-4 font-semibold">{t("products_nav")}:</h3>
                <ul className="list-disc ml-6">
                    {order.cart.map((item, idx) => (
                        <li key={idx}>
                            {item.name} x {item.qty} – {t("type_currency")} {item.price}
                        </li>
                    ))}
                </ul>

                {order.images?.length > 0 && (
                    <>
                        <h3 className="mt-4 font-semibold">{t("images")}:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {order.images.map((url, idx) => (
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
                    onClick={onClose}
                >
                    {t("close")}
                </button>
            </div>
        </div>
    );
}
