import HomeHeroSection from "./HomeHeroSection";
import HomeProductBanner from "./HomeProductBanner";
import HomeProductBenefits from "./HomeProductBenefits";

export default function Home() {
  return (
    <div className="p-5 text-center">
      {/* Hero banners */}
      <div className="flex flex-wrap justify-center gap-5">
        <HomeHeroSection
          title="Personalised photo magnets and stylish cards for any occasion."
          description="Create something unique with personalized magnets and stylish high quality cards!"
          buttonText="Browse Products"
          link="/products"
        />

        <HomeHeroSection
          title="From idea to reality - design, web and custom services for every occasion!"
          description="Do you need a professional design, website or custom services? We are here for you!"
          buttonText="Check out more"
          link="/solution"
        />

      </div>

      {/* Product categories */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">

        <HomeProductBanner
          title="Magnets"
          description="Personal magnets with unique design"
          imageUrl="https://drive.google.com/thumbnail?id=1nPZKrxidd3WnxJHCwsJRsl9lym5yYuWT&sz=w1000"
        />

        <HomeProductBanner
          title="Cards"
          description="Special cards for all occasion"
          imageUrl="https://drive.google.com/thumbnail?id=1KF97kWAxQezdxZiLFL8VgV0gXDUSnlr6&sz=w1000"
        />

      </div>

      <hr className="my-10 opacity-80" />

      {/* Product benefits */}
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold mb-6">Why Us</h2>
        <ul className="list-none inline-block text-left">

          <HomeProductBenefits icon="🥇" text="High print quality" />

          <HomeProductBenefits icon="🚚" text="Fast and secure delivery" />

          <HomeProductBenefits icon="🎨" text="100% customized products" />

        </ul>
      </div>
    </div>
  )
}
