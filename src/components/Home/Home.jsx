import HomeHeroSection from "./HomeHeroSection";
import HomeProductBanner from "./HomeProductBanner";
import HomeProductBenefits from "./HomeProductBenefits";
import { useTranslation } from "react-i18next";



export default function Home() {

  const { t } = useTranslation();

  return (
    <div className="p-5 text-center">
      {/* Hero banners */}
      <div className="flex flex-wrap justify-center gap-5">
        <HomeHeroSection
          title={t("welcome_title")}
          description={t("create_our_services")}
          buttonText={t("browse_button")}
          link="/products"
        />

        <HomeHeroSection
          title={t("we_offer")}
          description={t("logo_card")}
          buttonText={t("check_more_btn")}
          link="/solution"
        />

      </div>

      {/* Product categories */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">

        <HomeProductBanner
          title={t("productCategories.magnets.title")}
          description={t("productCategories.magnets.description")}
          imageUrl="https://drive.google.com/thumbnail?id=1nPZKrxidd3WnxJHCwsJRsl9lym5yYuWT&sz=w1000"
        />

        <HomeProductBanner
          title={t("productCategories.cards.title")}
          description={t("productCategories.cards.description")}
          imageUrl="https://drive.google.com/thumbnail?id=1KF97kWAxQezdxZiLFL8VgV0gXDUSnlr6&sz=w1000"
        />

      </div>

      <hr className="my-10 opacity-80" />

      {/* Product benefits */}
      <div className="text-center my-10">
        <h2 className="text-2xl item-center font-bold mb-6 mr-8">{t("why_us")}</h2>
        <ul className="list-none inline-block text-left">

          <HomeProductBenefits icon="🥇" text={t("f_adv")} />

          <HomeProductBenefits icon="🚚" text={t("s_adv")} />

          <HomeProductBenefits icon="🎨" text={t("t_adv")} />

        </ul>
      </div>
    </div>
  )
}
