import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                // Запазваме токена и данните в localStorage
                localStorage.setItem("firstName", data.user.firstName);
                localStorage.setItem("lastName", data.user.lastName);
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("role", data.user.role);
                localStorage.setItem("avatarUrl", data.user.avatarUrl);
                localStorage.setItem("jwt", data.token);
                
                window.location.href = "/"; // пренасочване към начална страница
            } else {
                setError(data.message);
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
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"
                >
                    Login
                </button>

                <p className="mt-4 text-sm text-gray-600">
                    Все още нямаш профил?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Регистрирай се
                    </Link>
                </p>
            </form>
        </div>
    );
}
