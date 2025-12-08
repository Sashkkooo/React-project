import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstName, lastName })
            });

            const data = await res.json();

            if (data.success) {
                setSuccess("Registration successful! User ID: " + data.insertedId);
                setError(null);

                // Ако искаш веднага да логнеш user-а:
                localStorage.setItem("userId", data.insertedId);
                localStorage.setItem("email", email);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);

                // Пренасочване към начална страница
                window.location.href = "/";
            } else {
                setError(data.message);
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
                <input
                    type="text"
                    placeholder="First Name"
                    className="border p-2 rounded"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="border p-2 rounded"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
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
                    Register
                </button>
            </form>
        </div>
    );
}
