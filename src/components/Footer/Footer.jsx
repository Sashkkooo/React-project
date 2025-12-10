import FooterNavLink from "./FooterNavLink";
import SocialIcon from "./SocialIcon";
import { useTranslation } from "react-i18next";



export default function Footer() {

    const { t } = useTranslation();


    const navLinks = [
        { to: "/", label: t("home"), ariaLabel: "Начало" },
        { to: "/faqs", label: t("FAQs"), ariaLabel: "Често задавани въпроси" },
        { to: "/about", label: t("about"), ariaLabel: "За нас" },
        { to: "/privacy-policy", label: t("privacy_policy"), ariaLabel: "Политика за поверителност" },
    ];

    const socialLinks = [
        {
            href: "https://www.facebook.com/profile.php?id=61568113770179",
            src: "https://drive.google.com/thumbnail?id=18e8yp_ZDpw1Wk9-Qi5t87tZSfhuIXHGl&sz=w1000",
            alt: "facebook icon",
            ariaLabel: "Facebook"
        },
        {
            href: "https://www.instagram.com/magnetizedmoment/",
            src: "https://drive.google.com/thumbnail?id=1-4azg-3L_ZF6tsEHOzPS7DdnyWFGAOH7&sz=w1000",
            alt: "instagram icon",
            ariaLabel: "Instagram"
        },
        {
            href: "https://www.youtube.com/@MagnetizedMoment-y9v",
            src: "https://drive.google.com/thumbnail?id=1E9MbIY0jocD8NKCdBzyR5jdUSzkWPXph&sz=w1000",
            alt: "youtube icon",
            ariaLabel: "YouTube"

        },
        {
            href: "https://www.tiktok.com/@magnetized.moment",
            src: "https://drive.google.com/thumbnail?id=1RHV58J4tjTsebNGsLGss5FslIgc4mCe7&sz=w1000",
            alt: "tiktok icon",
            ariaLabel: "TikTok"
        },
    ];

    return (
        <footer className="mt-10">
            <hr className="w-full opacity-80" />

            <div className="text-center py-5 min-h-[50px]">
                <nav className="space-x-4">
                    {navLinks.map((link) => (
                        <FooterNavLink key={link.to} {...link} />
                    ))}
                </nav>
            </div>

            <div className="flex justify-center my-3">
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <SocialIcon key={link.href} {...link} />
                    ))}
                </div>
            </div>

            <div className="text-center mt-5 text-sm text-neutral-700">
                <p>&copy; 2025 {t("footer_bottom")}</p>
            </div>
        </footer>
    );
}
