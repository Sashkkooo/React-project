import { useEffect, useState } from "react";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt");

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
            <h2 className="text-2xl font-bold text-red-700 mb-6">Admin Panel - Users</h2>
            {users.length === 0 ? (
                <p className="text-gray-600">No users found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id || u.id}>
                                <td className="border p-2">{u.firstName} {u.lastName}</td>
                                <td className="border p-2">{u.email}</td>
                                <td className="border p-2">{u.role}</td>
                                <td className="border p-2 flex gap-2">
                                    <button
                                        onClick={() => updateRole(u._id || u.id, u.role === "admin" ? "user" : "admin")}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                    >
                                        {u.role === "admin" ? "Make User" : "Make Admin"}
                                    </button>
                                    <button
                                        onClick={() => deleteUser(u._id || u.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
