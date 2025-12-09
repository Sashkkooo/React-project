import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NavLinks({ className }) {

    const { t } = useTranslation();
    

    const links = [
        { to: "/", label: t("home")},
        { to: "/products", label: t("products_nav") },
        { to: "/solution", label: t("services") },
        { to: "/about", label: t("about") },
        { to: "/contact", label: t("contact") },
    ];

    return (
        <nav className={className}>
            {links.map((link) => (
                <Link key={link.to} to={link.to}>
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
