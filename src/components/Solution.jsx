import { Link } from "react-router";
import AboutSolutionContent from "./AboutSolutionContent";

export default function Solution() {
  return (
    <div className="flex flex-col items-center p-5">
      {/* Toolbar */}
      <div className="w-full bg-blue-600 text-white text-center text-2xl font-semibold py-3 mt-0 mb-5">
        Services
      </div>

      <div className="w-full max-w-[1000px] mt-5">
        <AboutSolutionContent
          title="Our Services"
          paragraph="Our team specializes in creating a complete vision for your business. 
          We design distinctive logos that not only attract attention but also reflect the essence of your brand. 
          We also develop functional and modern websites that help your business shine in the online space."
        />

        <AboutSolutionContent
          title="Logo Design & Branding"
          paragraph="Creating a unique and professional logo is essential for building a strong identity for your company. 
          Our talented designers will create a logo that will set your business apart and attract potential customers."
        />

        <AboutSolutionContent
          title="Website Development"
          paragraph="We develop websites with modern and responsive designs that are tailored to the needs of your business. 
          A well-designed website is key to establishing your online presence and growing your customer base."
        />

        <AboutSolutionContent
          title="Social Events, Custom Solutions, and Bulk Sales"
          paragraph="In addition to our standard products and services, we also cater to social events such as weddings, christenings, and other celebrations. 
          We create personalized magnets, cards, and other souvenirs to make your special event even more memorable. 
          Every detail is crafted with love and care to provide a unique experience for you and your guests."
        />

        <AboutSolutionContent
          title="Why choose us?"
          paragraph={
            <>
              Experience and creativity are key factors in achieving impressive results.
              We keep up with the latest trends in branding and web design to help your business grow in an ever-changing environment.
              Trust us to take your online presence to the next level. Contact us today for a free consultation and offer{" "}
              <Link to="/contact" className="text-blue-600 underline">
                here.
              </Link>
            </>
          }
        />
      </div>
    </div>
  )
}
