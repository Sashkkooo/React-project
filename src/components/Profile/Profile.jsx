import { useEffect, useState } from "react";
import AvatarUpload from "./AvatarUpload";
import InputField from "../Checkout/InputField";
import Avatar from "./Avatar";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Profile() {
    const [user, setUser] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = {
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            email: localStorage.getItem("email"),
            role: localStorage.getItem("role"),
            avatarUrl: localStorage.getItem("avatarUrl") || "/default-avatar.png",
        };
        setUser(storedUser);
    }, []);

    if (!user) return <p>Loading...</p>;

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="max-w-xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-green-700 mb-6">{t("acc_settings")}</h2>

            {/* Header с аватар и инфо */}
            <div className="flex items-center gap-4 mb-6">
                <Avatar
                    src={user.avatarUrl}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    className="w-20 h-20 border-2 border-green-600"
                />
                <div>
                    <p className="text-lg font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                    </p>
                    <p className="font-semibold break-all">{user.email}</p>
                    <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded ${user.role === "admin" ? "bg-red-600" : "bg-blue-600"
                            } text-white`}
                    >
                        {user.role}
                    </span>
                </div>
            </div>

            {/* Upload avatar */}
            <AvatarUpload user={user} setUser={setUser} />

            {/* User info полета */}
            <div className="grid grid-cols-1 gap-4">
                <InputField label={t("first_name")} value={user.firstName} type="text" name="firstName" disabled />
                <InputField label={t("last_name")} value={user.lastName} type="text" name="lastName" disabled />
                <InputField label={t("email")} value={user.email} type="email" name="email" disabled />
            </div>

            {/* Admin панел + Logout */}
            <div className="mt-6 flex justify-between items-center">
                {user.role === "admin" && (
                    <Link
                        to="/admin"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        {t("admin_panel")}
                    </Link>
                )}
                <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    {t("logout")}
                </button>
            </div>
        </div>
    );
}
