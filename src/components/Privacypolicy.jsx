import { Link } from "react-router"
import { useTranslation } from "react-i18next";


export default function PrivacyPolicy() {

  const { t } = useTranslation();


  return (
    <div className="max-w-[800px] mx-auto p-5 bg-white rounded-lg shadow-lg leading-relaxed">
      <h1 className="text-3xl font-bold text-white-800 mb-6">{t("privacy_title")}</h1>

      <p className="mb-4">
        {t("intro1")} <strong>{t("mm")}</strong> {t("intro2")}.
      </p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">1. {t("data_controller_title")}</h2>
      <p className="mb-4">
        {t("data_controller_content1")} <strong>{t("mm")}</strong>, {t("data_controller_content2")} <strong>{t("firm_adress")}</strong>.
        {t("data_controller_content3")}, <Link to="/contact" className="text-blue-600 underline">{t("contact_us_text1")}</Link>.
      </p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">2. {t("data_collected_title")}</h2>
      <p className="mb-2">{t("data_collected_content")}</p>
      <ul className="list-disc ml-6 mb-4">
        <li>{t("data_collected_list1")}</li>
        <li>{t("data_collected_list2")}</li>
        <li>{t("data_collected_list3")}</li>
        <li>{t("data_collected_list4")}</li>
        <li>{t("data_collected_list5")}</li>
        <li>{t("data_collected_list6")}</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">3. {t("data_processing_title")}</h2>
      <p className="mb-2">{t("data_processing_content")}</p>
      <ul className="list-disc ml-6 mb-4">
        <li>{t("data_processing_list1")}</li>
        <li>{t("data_processing_list2")}</li>
        <li>{t("data_processing_list3")}</li>
        <li>{t("data_processing_list4")}</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">4. {t("legal_basis_title")}</h2>
      <p className="mb-2">{t("legal_basis_content")}</p>
      <ul className="list-disc ml-6 mb-4">
        <li>{t("legal_basis_list1")}</li>
        <li>{t("legal_basis_list2")}</li>
        <li>{t("legal_basis_list3")}</li>
        <li>{t("legal_basis_list4")}</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">5. {t("data_retention_title")}</h2>
      <p className="mb-4">{t("data_retention_content")}</p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">6. {t("data_sharing_title")}</h2>
      <p className="mb-2">{t("data_sharing_content")}</p>
      <ul className="list-disc ml-6 mb-4">
        <li>{t("data_sharing_list1")}</li>
        <li>{t("data_sharing_list2")}</li>
        <li>{t("data_sharing_list3")}</li>
        <li>{t("data_sharing_list4")}</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">7. {t("your_rights_title")}</h2>
      <p className="mb-2">{t("your_rights_content")}</p>
      <ul className="list-disc ml-6 mb-4">
        <li>{t("your_rights_list1")}</li>
        <li>{t("your_rights_list2")}</li>
        <li>{t("your_rights_list3")}</li>
        <li>{t("your_rights_list4")}</li>
        <li>{t("your_rights_list5")}</li>
        <li>{t("your_rights_list6")}</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">8. {t("security_measures_title")}</h2>
      <p className="mb-4">{t("security_measures_content")}</p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">9. {t("complaints_title")}</h2>
      <p className="mb-4">
        {t("complaints_content")}{" "}
        <Link to="http://www.cpdp.bg" className="text-blue-600 underline">www.cpdp.bg</Link>.
      </p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">{t("cookies_title")}</h2>
      <p className="mb-2">{t("cookies_list1")}</p>
      <p className="mb-2">{t("cookies_list2")}</p>
      <p className="mb-2">{t("cookies_list3")}</p>
      <p className="mb-2">{t("cookies_list4")}</p>
      <ul className="list-disc ml-6 mb-4">
        <li>{t("cookies_content1")}</li>
        <li>{t("cookies_content2")}</li>
        <li>{t("cookies_content3")}</li>
        <li>{t("cookies_content4")}</li>
      </ul>
      <p className="mb-4">
        <Link to="https://www.allaboutcookies.org/" className="text-blue-600 underline">
          AllAboutCookies.org
        </Link>.
      </p>
    </div>
  )
}
