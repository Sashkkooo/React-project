import { useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Avatar from "./Avatar"; // нашият отделен компонент за аватар

export default function Profile() {
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1.2);

    useEffect(() => {
        const storedUser = {
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            email: localStorage.getItem("email"),
            role: localStorage.getItem("role"),
            avatarUrl: localStorage.getItem("avatarUrl") || "/default-avatar.png"
        };
        setUser(storedUser);
    }, []);

    if (!user) return <p>Loading...</p>;

    const handleSaveAvatar = async () => {
        if (editor) {
            const canvas = editor.getImageScaledToCanvas();
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("avatar", blob, "avatar.png");

                const token = localStorage.getItem("jwt");
                try {
                    const res = await fetch("http://localhost:8000/uploadAvatar.php", {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` },
                        body: formData
                    });

                    const data = await res.json();
                    if (data.success) {
                        localStorage.setItem("avatarUrl", data.avatarUrl);
                        setUser({ ...user, avatarUrl: data.avatarUrl });
                        setSelectedFile(null);
                    } else {
                        alert(data.message || "Upload failed");
                    }
                } catch (err) {
                    console.error("Upload error:", err);
                    alert("Error uploading file");
                }
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div className="max-w-xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Account Settings</h2>

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
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded ${user.role === "admin" ? "bg-red-600" : "bg-blue-600"
                            } text-white`}
                    >
                        {user.role}
                    </span>
                </div>
            </div>

            {/* Upload avatar with crop/scale */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Change Avatar
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600"
                />

                {selectedFile && (
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">
                            Drag to move, use slider to zoom
                        </p>
                        <AvatarEditor
                            ref={(ref) => setEditor(ref)}
                            image={selectedFile}
                            width={220}
                            height={220}
                            border={40}
                            borderRadius={110}
                            scale={scale}
                            className="mx-auto"
                        />
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.1"
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="mt-2 w-full"
                        />
                        <button
                            onClick={handleSaveAvatar}
                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Save Avatar
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        value={user.firstName}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={user.lastName}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 text-gray-700"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 text-gray-700"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
                {user.role === "admin" && (
                    <a
                        href="/admin"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Admin Panel
                    </a>
                )}
                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
