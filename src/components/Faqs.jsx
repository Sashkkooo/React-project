import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";


function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border rounded-md shadow-lg bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-white-100 font-semibold text-lg hover:bg-gray-200 transition"
      >
        {question}
      </button>
      {open && (
        <div className="px-4 py-3 text-gray-700 text-base bg-white">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Faqs() {
  const { t } = useTranslation();


  const faqs = [
    { question: t("how_to_order_q"), answer: <>{t("how_to_order_a")} <br /> {t("how_to_order_1")} <br /> {t("how_to_order_2")} <br /> {t("how_to_order_3")} <br /> {t("how_to_order_4")} </> },
    { question: t("order_time_q"), answer: t("order_time_a") },
    { question: t("kind_of_photos_q"), answer: t("kind_of_photos_a") },
    { question: t("photo_resolution_q"), answer: t("photo_resolution_a") },
    { question: t("delivery_offer_q"), answer: t("delivery_offer_a") },

    {
      question: t("chose_number_q"),
      answer: (
        <>
          {t("chose_number_a")}{" "}
          <Link to="/contact" className="text-blue-600 underline">
            {t("contact_us_text1")}
          </Link>
        </>
      ),
    },
    {
      question: t("what_other_services_q"),
      answer: (
        <>
          {t("what_other_services_a")}{" "}
          <Link to="/solution" className="text-blue-600 underline">
            {t("contact_us_text1")}
          </Link>
        </>
      ),
    },
    { question: t("logo_website_q"), answer: t("logo_website_a") },
    {
      question: t("logo_what_q"),
      answer: (
        <>
          {t("logo_what_a")} <br />
          {t("logo_what_1")} <br />
          {t("logo_what_2")} <br />
          {t("logo_what_3")} <br />
          {t("logo_what_4")}
        </>
      ),
    },
    {
      question: t("website_what_q"),
      answer: (
        <>
          {t("website_what_a")} <br />
          {t("website_what_1")} <br />
          {t("website_what_2")} <br />
          {t("website_what_3")}
        </>
      ),
    },
    { question: t("final_design_q"), answer: t("final_design_a") },
  ];

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">{t("FAQs")}</h2>
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} {...faq} />
      ))}
    </div>
  );
}
