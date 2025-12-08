import { Navigate } from "react-router";

export default function GuestRoute({ children }) {
    const token = localStorage.getItem("jwt");

    if (token) {
        // ако вече е логнат → redirect
        return <Navigate to="/profile" replace />;
    }

    return children;
}
