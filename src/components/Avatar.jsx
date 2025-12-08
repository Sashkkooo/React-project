import { useState } from "react";

export default function Avatar({ src, firstName, lastName, className = "" }) {
    const [error, setError] = useState(false);

    const initials = ((firstName?.[0] || "") + (lastName?.[0] || "")).toUpperCase();

    if (!src || error) {
        return (
            <div
                className={`flex items-center justify-center rounded-full bg-green-600 text-white font-semibold ${className}`}
                style={{ lineHeight: 1 }}
            >
                {initials || "?"}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt="Avatar"
            onError={() => setError(true)}
            className={`rounded-full object-cover ${className}`}
        />
    );
}
