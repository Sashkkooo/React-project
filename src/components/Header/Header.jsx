import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import MobileSidenav from "./MobileSideNav";
import { CartContext } from "../../context/CartContext";
import AuthButton from "../Authentication/AuthButton";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("jwt")));
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "bg" : "en";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("jwt")));
    };

    // слушаме за storage събитие
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <header className="mb-2">
      <div className="fixed top-0 left-0 w-full h-20 bg-blue-400 flex justify-between items-center px-6 z-20">
        <div className="flex items-center gap-2">
          <Link to="/" className="block">
            <img
              src="https://drive.google.com/thumbnail?id=1x5inaIdnfbHZd4TTvp_OgXHZe_HLN4mK&sz=w1000"
              alt="logo"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
            />
          </Link>
          
        </div>

        <NavLinks className="hidden md:flex gap-6 font-semibold text-black" />

        <div className="flex items-center gap-4">
          <AuthButton
            isLoggedIn={isLoggedIn}
            className="bg-white px-3 py-1 rounded hover:bg-gray-200 transition"
          />
          <button className="md:hidden" onClick={() => setOpen(true)}>☰</button>
          <button
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-2"
          >
            🌐 {i18n.language.toUpperCase()}
          </button>
          <CartButton totalItems={totalItems} />
        </div>
      </div>

      <MobileSidenav open={open} onClose={() => setOpen(false)} />
      <main className="pt-24"></main>
    </header>
  );
}
