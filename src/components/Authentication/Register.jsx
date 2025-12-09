import { useState } from "react";
import InputField from "../Checkout/InputField";
import PasswordField from "./PasswordField";
import AuthSubmitButton from "../SubmitButton";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState(""); // ✅ ново поле
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        // ✅ Проверка за съвпадение на паролите
        if (password !== repeatPassword) {
            setError("Passwords do not match!");
            setSuccess(null);
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess("Registration successful! User ID: " + data.insertedId);
                setError(null);

                localStorage.setItem("userId", data.insertedId);
                localStorage.setItem("email", email);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);

                window.location.href = "/";
            } else {
                setError(data.message || "Registration failed");
                setSuccess(null);
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <InputField
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <InputField
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />

                {/* ✅ Repeat Password */}
                <PasswordField
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />

                <AuthSubmitButton label="Register" />
            </form>
        </div>
    );
}
