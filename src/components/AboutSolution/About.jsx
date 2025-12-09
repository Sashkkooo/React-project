import { Link } from "react-router"
import AboutSolutionContent from "./AboutSolutionContent"
import PageHeader from "../PageHeader"
import { useTranslation } from "react-i18next";

export default function About() {
  const {t} = useTranslation()

  const sections = [
    {
      title: t("mission"),
      paragraph: t("mission_text")
    },
    {
      title: t("team"),
      paragraph: t("team_text")
    },
    {
      title: t("contact_us"),
      paragraph: (
        <>
          {t("contact_us_text")}{" "}
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
      <PageHeader props={{ title: t("about") }} />

      <div className="w-full max-w-[1000px] mt-5">
        {sections.map((s, idx) => (
          <AboutSolutionContent key={idx} title={s.title} paragraph={s.paragraph} />
        ))}
      </div>

    </div >
  )
}
