import { useEffect, useState } from "react";
import UserRow from "./UserRow";
import { useTranslation } from "react-i18next";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt");
    const { t } = useTranslation();

    useEffect(() => {
        fetch("http://localhost:8000/getUsers.php", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUsers(data.users);
                } else {
                    setError(data.message || "Failed to load users");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading users:", err);
                setError("Network error while loading users");
                setLoading(false);
            });
    }, [token]);

    const updateRole = async (_id, newRole) => {
        try {
            const res = await fetch("http://localhost:8000/updateUserRole.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: _id, role: newRole })
            });
            const data = await res.json();
            if (data.success) {
                setUsers(users.map((u) => (u._id === _id ? { ...u, role: newRole } : u)));
            } else {
                alert(data.message || "Failed to update role");
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
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: _id })
            });
            const data = await res.json();
            if (data.success) {
                setUsers(users.filter((u) => u._id !== _id));
            } else {
                alert(data.message || "Failed to delete user");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading users...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-red-700 mb-6">{t("tabs.users")}</h2>
            {users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
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
                        {users.map((u) => (
                            <UserRow
                                key={u._id || u.id}
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
