import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function OrderSuccess() {

    const {t} = useTranslation();
    return (
        <div className="text-center mx-auto my-8 w-full max-w-lg p-4 sm:p-8 border border-gray-300 rounded-lg bg-white shadow-lg">
            <h1 className="text-green-600 text-2xl sm:text-3xl font-bold mb-6">
                🎉 {t("orderSuccess")}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                {t("thanks_for_choosing_us")}
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                {t("order_p_call")}
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                {t("order_p")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
                <Link
                    to="/"
                    className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-full text-sm sm:text-base font-medium transition duration-300 ease-in-out hover:bg-red-600 transform hover:scale-105"
                >
                    {t("continue")}
                </Link>
                <Link
                    to="/contact"
                    className="w-full sm:w-auto px-4 py-2 bg-pink-400 text-white rounded-full text-sm sm:text-base font-medium transition duration-300 ease-in-out hover:bg-pink-500 transform hover:scale-105"
                >
                    {t("contact_us")}
                </Link>
            </div>
        </div>
    );
}
