import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { useTranslation } from "react-i18next";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt");
    const { t } = useTranslation();

    // функция за зареждане на потребители
    const fetchUsers = () => {
        fetch("http://localhost:8000/getUsers.php", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUsers(data.users);
                } else {
                    setError(data.message || t("failed_load_users"));
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading users:", err);
                setError(t("network_error_users"));
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, [token, t]);

    const updateRole = async (_id, newRole) => {
        try {
            const res = await fetch("http://localhost:8000/updateUserRole.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: _id, role: newRole }),
            });
            const data = await res.json();
            if (data.success) {
                fetchUsers(); // презарежда от сървъра
            } else {
                alert(data.message || t("failed_update_role"));
            }
        } catch (err) {
            console.error("Error updating role:", err);
        }
    };

    const deleteUser = async (_id) => {
        try {
            const res = await fetch("http://localhost:8000/deleteUser.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: _id }),
            });
            const data = await res.json();
            if (data.success) {
                fetchUsers(); // презарежда от сървъра
            } else {
                alert(data.message || t("failed_delete_user"));
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (loading) return <p className="text-center mt-10">{t("loading_users")}</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6">
                {t("tabs.users")}
            </h2>
            {users.length === 0 ? (
                <p className="text-gray-600">{t("no_users_found")}</p>
            ) : (
                <>
                    {/* Таблица за десктоп/таблет */}
                    <div className="overflow-x-auto hidden sm:block">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">{t("name")}</th>
                                    <th className="border p-2">{t("email")}</th>
                                    <th className="border p-2">{t("role")}</th>
                                    <th className="border p-2">{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, idx) => (
                                    <UserRow
                                        key={u._id || u.id || idx}
                                        user={u}
                                        updateRole={updateRole}
                                        deleteUser={deleteUser}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Мобилен stacked layout */}
                    <div className="sm:hidden space-y-4">
                        {users.map((user) => (
                            <div
                                key={user._id || user.id}
                                className="border rounded-lg p-4 shadow-sm bg-white"
                            >
                                <p className="font-semibold">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-gray-700 break-words">{user.email}</p>
                                <p className="text-blue-700 font-semibold capitalize">
                                    {user.role}
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() =>
                                            updateRole(
                                                user._id || user.id,
                                                user.role === "admin" ? "user" : "admin"
                                            )
                                        }
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                    >
                                        {user.role === "admin" ? t("make_user") : t("make_admin")}
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user._id || user.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        {t("delete")}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
