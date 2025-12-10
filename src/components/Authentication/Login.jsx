import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField";
import InputField from "../Checkout/InputField";
import AuthSubmitButton from "../SubmitButton";
import { useTranslation } from "react-i18next";

export default function Login() {

    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("firstName", data.user.firstName);
                localStorage.setItem("lastName", data.user.lastName);
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("role", data.user.role);
                localStorage.setItem("avatarUrl", data.user.avatarUrl);
                localStorage.setItem("jwt", data.token);
                window.dispatchEvent(new Event("storage"));

                navigate("/");
            } else {
                setError(data.message || "Invalid email or password");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <InputField
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <PasswordField
                    placeholder={t("pass")}
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <AuthSubmitButton label={t("login")} />

                <p className="mt-4 text-sm text-gray-600">
                    {t("no_acc_yet")}{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        {t("register")}
                    </Link>
                </p>
            </form>
        </div>
    );
}
