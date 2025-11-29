import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="mt-10">
            {/* Divider */}
            <hr className="w-full opacity-80" />

            {/* Links */}
            <div className="text-center py-5 min-h-[50px]">
                <div className="mb-2">
                    <nav className="space-x-4">
                        <Link
                            to="/"
                            className="text-[#333] text-[16px] font-medium inline-block px-2 py-2 hover:underline"
                            aria-label="Начало"
                        >
                            Home
                        </Link>
                        <Link
                            to="/faqs"
                            className="text-[#333] text-[16px] font-medium inline-block px-2 py-2 hover:underline"
                            aria-label="Често задавани въпроси"
                        >
                            FAQ's
                        </Link>
                        <Link
                            to="/about"
                            className="text-[#333] text-[16px] font-medium inline-block px-2 py-2 hover:underline"
                            aria-label="За нас"
                        >
                            About
                        </Link>
                        <Link
                            to="/privacy-policy"
                            className="text-[#333] text-[16px] font-medium inline-block px-2 py-2 hover:underline"
                            aria-label="Политика за поверителност"
                        >
                            Privacy Policy
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Social icons (placeholder emojis instead of images) */}
            <div className="flex justify-center my-3">
                <div className="flex items-center gap-4">
                    <Link
                        to="https://www.facebook.com/profile.php?id=61568113770179"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="inline-block transition-transform hover:scale-110"
                    >
                        📘
                    </Link>
                    <Link
                        to="https://www.instagram.com/magnetizedmoment/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="inline-block transition-transform hover:scale-110"
                    >
                        📸
                    </Link>
                    <Link
                        to="https://www.youtube.com/@MagnetizedMoment-y9v"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="inline-block transition-transform hover:scale-110"
                    >
                        ▶️
                    </Link>
                    <Link
                        to="https://www.tiktok.com/@magnetized.moment"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                        className="inline-block transition-transform hover:scale-110"
                    >
                        🎵
                    </Link>
                </div>
            </div>

            {/* Bottom note */}
            <div className="text-center mt-5 text-sm text-neutral-700">
                <p>&copy; 2025 Magnetized Moment</p>
            </div>
        </footer>
    );
}
