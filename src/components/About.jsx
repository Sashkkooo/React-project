import { Link } from "react-router"

export default function About() {
  return (
    <div className="flex flex-col items-center p-5">
      {/* Toolbar */}
      <div className="w-full bg-blue-600 text-white text-center text-2xl font-semibold py-3">
        About
      </div>

      {/* Content */}
      <div className="w-full max-w-[800px] mt-5">
        {/* Mission card */}
        <div className="mb-5 bg-gray-100 rounded-lg shadow p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <div className="text-center text-lg">
            <p>
              Mission text goes here. Explain the purpose and vision of the company.
            </p>
          </div>
        </div>

        {/* Team card */}
        <div className="mb-5 bg-gray-100 rounded-lg shadow p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Our Team</h2>
          </div>
          <div className="text-center text-lg">
            <p>
              Team text goes here. Introduce the people behind the company.
            </p>
          </div>
        </div>

        {/* Contact card */}
        <div className="mb-5 bg-gray-100 rounded-lg shadow p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <div className="text-center text-lg">
            <p>
              Contact us text goes here.{" "}
              <Link to="/contact" className="text-blue-600 underline">
                Get in touch.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
