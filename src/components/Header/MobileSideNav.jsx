import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function MobileSidenav({ open, onClose }) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "bg" : "en";
    i18n.changeLanguage(newLang);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5">
        <nav className="flex flex-col gap-4 text-lg font-semibold">
          <Link to="/" onClick={onClose}>{t("home")}</Link>
          <Link to="/products" onClick={onClose}>{t("products_nav")}</Link>
          <Link to="/solution" onClick={onClose}>{t("services")}</Link>
          <Link to="/about" onClick={onClose}>{t("about")}</Link>
          <Link to="/contact" onClick={onClose}>{t("contact")}</Link>


          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            🌐 {i18n.language.toUpperCase()}
          </button>
        </nav>
      </div>
    </div>
  );
}
