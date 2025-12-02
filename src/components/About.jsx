import { Link } from "react-router"
import AboutSolutionContent from "./AboutSolutionContent"

export default function About() {
  return (
    <div className="flex flex-col items-center p-5">
      {/* Toolbar */}
      <div className="w-full bg-blue-600 text-white text-center text-2xl font-semibold py-3">
        About
      </div>

      {/* Content */}
      <div className="w-full max-w-[1000px] mt-5">
        <AboutSolutionContent
          title="Our Mission"
          paragraph="We believe that small gestures bring great joy and that's why we create handmade magnets and cards. 
        Each piece is made with attention to details and imbued with lots of love. 
        Our mission is to help you express your emotions in an original and memorable way."
        />

        {/* Team card */}
        <AboutSolutionContent
          title="Our Team"
          paragraph="Our team is made up of talented designers with extensive experience. 
          We pay great attention to details and strive to exceed your expectations. 
          We believe that with creativity and precision we can create something truly special together. Contact us to discuss your ideas!"
        />

        {/* Contact card */}
        <AboutSolutionContent
          title="Contact Us"
          paragraph={
            <>
              Do not hesitate to contact us via the contact form{" "}
              <Link to="/contact" className="text-blue-600 underline">
                here.
              </Link>
            </>
          }
        />
      </div>
    </div >
  )
}
