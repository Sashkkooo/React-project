import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import { useTranslation } from "react-i18next";


// ✅ Отделен компонент за табовете
function AdminTabs({ activeTab, setActiveTab }) {
    const { t } = useTranslation();
    const tabs = ["users", "products", "orders"];

    return (
        <div className="flex justify-center gap-4 mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded ${activeTab === tab ? "bg-red-600 text-white" : "bg-gray-200"
                        }`}
                >
                    {t(`tabs.${tab}`)}
                </button>
            ))}
        </div>
    );
}

export default function AdminPanel() {

    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState("users");


    const components = {
        users: <AdminUsers />,
        products: <AdminProducts />,
        orders: <AdminOrders />,
    };

    return (
        <div className="max-w-6xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">{t("admin_panel")}</h2>

            <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {components[activeTab]}
        </div>
    );
}
