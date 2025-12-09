import { Link } from "react-router";

export default function SocialIcon({ href, src, alt, ariaLabel }) {
    return (
        <Link
            to={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="inline-block transition-transform hover:scale-110"
        >
            <img src={src} alt={alt} className="h-5 w-5" />
        </Link>
    );
}
