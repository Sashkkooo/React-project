import { Link } from "react-router";

export default function CartButton({ totalItems }) {
    return (
        <Link to="/cart" className="relative text-black text-2xl">
            🛒
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                    {totalItems}
                </span>
            )}
        </Link>
    );
}
