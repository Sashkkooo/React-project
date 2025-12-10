import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Products() {

    const { t } = useTranslation();

    const productLinks = [
        { to: "/products/magnets", label: t("magnets") },
        { to: "/products/cards", label: t("cards") },
        // { to: "/products/custom-print", label: "Stickers" },
    ];

    const steps = [
        t("how_to_order_1"),
        t("how_to_order_2"),
        t("how_to_order_3"),
        t("how_to_order_4"),
    ];
    return (
        <div className="mb-5">
            <h1 className="text-4xl font-bold text-gray-800 text-center my-4">
                {t("products_nav")}
            </h1>

            <div className="flex justify-center mb-5 bg-white p-3 rounded-md shadow-md sticky top-20 z-50">
                {productLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="mx-5 text-blue-800 font-bold text-lg hover:text-blue-900 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="max-w-[800px] mx-auto p-5 bg-white rounded-lg shadow-md leading-relaxed text-lg">
                <h2 className="text-center text-2xl font-bold mb-5">{t("how_it_works")}</h2>
                {steps.map((step, idx) => (
                    <p key={idx} className="text-center mb-2">{step}</p>
                ))}
            </div>
        </div>
    );
}
