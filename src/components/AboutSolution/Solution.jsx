import { Link } from "react-router";
import AboutSolutionContent from "./AboutSolutionContent";
import PageHeader from "../PageHeader";
import { useTranslation } from "react-i18next";

export default function Solution() {

  const { t } = useTranslation();

  const sections = [
    {
      title: t("our_services_title"),
      paragraph: t("our_services_text")
    },
    {
      title: t("logo_design_title"),
      paragraph: t("logo_design_text"),
    },
    {
      title: t("website_title"),
      paragraph: t("website_text"),
    },
    {
      title: t("sales_title"),
      paragraph: t("sales_text1"),
    },
    {
      title: t("why_us"),
      paragraph: (
        <>
          {t("why_us_text1")} {t("why_us_text2")} {" "}
          <Link to="/contact" className="text-blue-600 underline">
            {t("contact_us_text1")}
          </Link>
        </>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center p-5">
      {/* Toolbar */}
      <PageHeader props={{ title: t("services") }} />

      <div className="w-full max-w-[1000px] mt-5">
        {sections.map((s, idx) => (
          <AboutSolutionContent key={idx} title={s.title} paragraph={s.paragraph} />
        ))}
      </div>

    </div>
  )
}
