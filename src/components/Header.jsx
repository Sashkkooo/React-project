import { useState, useContext } from "react";
import { Link } from "react-router";
import MobileSidenav from "./MobileSideNav";
import { CartContext } from "../context/CartContext.jsx";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { totalItems } = useContext(CartContext);

  return (
    <header className="mb-2">
      {/* Toolbar */}
      <div className="fixed top-0 left-0 w-full h-20 bg-blue-400 flex justify-between items-center px-6 z-20">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="text-xl font-bold text-white">
            LOGO
          </Link>
        </div>

        {/* Center nav (desktop only) */}
        <nav className="hidden md:flex gap-6 font-semibold text-black">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/solution">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* End items */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setOpen(true)}>☰</button>

          {/* Language button (desktop only) */}
          <button className="hidden md:flex items-center gap-2">
            🌐 EN
          </button>

          {/* Cart button */}
          <Link to="/cart" className="relative text-black text-2xl">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
                {totalItems}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* Mobile sidenav */}
      <MobileSidenav open={open} onClose={() => setOpen(false)} />

      {/* Content offset for fixed header */}
      <main className="pt-24">
        {/* Тук ще се рендерират страниците */}
      </main>
    </header>
  );
}
