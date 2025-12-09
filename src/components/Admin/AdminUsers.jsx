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
                <table className="w-full border-collapse border border-gray-300">
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
            )}
        </div>
    );
}
