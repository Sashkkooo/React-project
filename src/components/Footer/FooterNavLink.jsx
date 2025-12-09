import { Link } from "react-router";

export default function FooterNavLink({ to, label, ariaLabel }) {
    return (
        <Link
            to={to}
            className="text-[#333] text-[16px] font-medium inline-block px-2 py-2 hover:underline"
            aria-label={ariaLabel}
        >
            {label}
        </Link>
    );
}
