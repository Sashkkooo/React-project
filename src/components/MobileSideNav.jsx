import { Link } from "react-router";

export default function MobileSidenav({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5">
        <nav className="flex flex-col gap-4 text-lg font-semibold">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/products" onClick={onClose}>Products</Link>
          <Link to="/solution" onClick={onClose}>Services</Link>
          <Link to="/about" onClick={onClose}>About</Link>
          <Link to="/contact" onClick={onClose}>Contact</Link>

          {/* Language button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 mt-4"
          >
            <img src="/flag.webp" alt="Flag" className="w-6 h-4" />
            EN
          </button>
        </nav>
      </div>
    </div>
  );
}
