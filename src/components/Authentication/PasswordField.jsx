import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PasswordField({ value, onChange, placeholder }) {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="border p-2 rounded w-full pr-10"
                value={value}
                onChange={onChange}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? "🙈" : "👁️"}
            </button>
        </div>
    );
}
