import { useState } from "react";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrder"; // ✅ нов импорт

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("users");

    return (
        <div className="max-w-6xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Admin Panel</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setActiveTab("users")}
                    className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-red-600 text-white" : "bg-gray-200"
                        }`}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveTab("products")}
                    className={`px-4 py-2 rounded ${activeTab === "products" ? "bg-red-600 text-white" : "bg-gray-200"
                        }`}
                >
                    Products
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-red-600 text-white" : "bg-gray-200"
                        }`}
                >
                    Orders
                </button>
            </div>

            {/* Content */}
            {activeTab === "users" && <AdminUsers />}
            {activeTab === "products" && <AdminProducts />}
            {activeTab === "orders" && <AdminOrders />} {/* ✅ нов таб */}
        </div>
    );
}
