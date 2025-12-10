import { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useTranslation } from "react-i18next";

export default function AvatarUpload({ user, setUser }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1.2);
    const { t } = useTranslation();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

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
                        body: formData,
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

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("change_avatar")}
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
                        {t("drag_to_move")}
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
                        {t("saveAvatarBtn")}
                    </button>
                </div>
            )}
        </div>
    );
}
