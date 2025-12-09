import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function AuthButton({ isLoggedIn, label }) {
    const { t } = useTranslation();

    return isLoggedIn ? (
        <Link to="/profile">
            {label || t("profile")}
        </Link>
    ) : (
        <Link to="/login">
            {label || t("login")}
        </Link>
    );
}
