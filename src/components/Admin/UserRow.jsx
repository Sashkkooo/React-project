import { useTranslation } from "react-i18next";

export default function UserRow({ user, updateRole, deleteUser }) {
    const { t } = useTranslation();

    return (
        <tr
            key={user._id || user.id}
            className="text-sm sm:text-base hover:bg-gray-50 transition"
        >
            <td className="border px-3 py-2 whitespace-nowrap font-medium">
                {user.firstName} {user.lastName}
            </td>
            <td className="border px-3 py-2 break-words text-gray-700">
                {user.email}
            </td>
            <td className="border px-3 py-2 capitalize text-blue-700 font-semibold hidden sm:table-cell">
                {user.role}
            </td>
            <td className="border px-3 py-2 hidden sm:table-cell">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() =>
                            updateRole(
                                user._id || user.id,
                                user.role === "admin" ? "user" : "admin"
                            )
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        {user.role === "admin" ? t("make_user") : t("make_admin")}
                    </button>
                    <button
                        onClick={() => deleteUser(user._id || user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                        {t("delete")}
                    </button>
                </div>
            </td>

            {/* Mobile-only actions */}
            <td className="border px-3 py-2 sm:hidden">
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500">{t("role")}: {user.role}</span>
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
            </td>
        </tr>
    );
}
