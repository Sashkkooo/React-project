export default function UserRow({ user, updateRole, deleteUser }) {
    return (
        <tr key={user._id || user.id}>
            <td className="border p-2">{user.firstName} {user.lastName}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.role}</td>
            <td className="border p-2 flex gap-2">
                <button
                    onClick={() => updateRole(user._id || user.id, user.role === "admin" ? "user" : "admin")}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                    {user.role === "admin" ? "Make User" : "Make Admin"}
                </button>
                <button
                    onClick={() => deleteUser(user._id || user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
