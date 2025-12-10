import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function NotFound() {

  const {t} = useTranslation();

  return (
    <div className="text-center mt-5">
      <h1 className="text-3xl font-bold mb-4">{t("404_title")}</h1>
      <p className="text-lg mb-6">{t("404_message")}</p>
      <Link
        to="/"
        className="text-blue-800 font-bold hover:underline"
      >
        {t("go_home")}
      </Link>
    </div>
  )
}
