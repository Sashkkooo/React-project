import { Link } from "react-router";

export default function Solution() {
  return (
    <div className="flex flex-col items-center p-5">
      {/* Toolbar */}
      <div className="w-full bg-blue-600 text-white text-center text-2xl font-semibold py-3 mt-0 mb-5">
        Services
      </div>

      {/* Services container */}
      <div className="max-w-[800px] mx-auto p-5 bg-gray-100 rounded-lg shadow-md leading-relaxed">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-center text-lg text-black mb-6">
          Description of our services goes here.
        </p>

        <h3 className="text-xl font-semibold text-center text-gray-800 mt-6 mb-3">
          Logo Design
        </h3>
        <p className="text-center text-lg text-black mb-6">
          Logo design details go here.
        </p>

        <h3 className="text-xl font-semibold text-center text-gray-800 mt-6 mb-3">
          Website Development
        </h3>
        <p className="text-center text-lg text-black mb-6">
          Website development details go here.
        </p>

        <h3 className="text-xl font-semibold text-center text-gray-800 mt-6 mb-3">
          Sales & Marketing
        </h3>
        <p className="text-center text-lg text-black mb-3">
          Sales text part 1 goes here.
        </p>
        <p className="text-center text-lg text-black mb-6">
          Sales text part 2 goes here.
        </p>

        <h3 className="text-xl font-semibold text-center text-gray-800 mt-6 mb-3">
          Why Us
        </h3>
        <p className="text-center text-lg text-black mb-3">
          Why us text part 1 goes here.
        </p>
        <p className="text-center text-lg text-black mb-3">
          Why us text part 2 goes here.{" "}
          <Link to="/contact" className="text-blue-600 underline">
            Contact us!
          </Link>
        </p>
      </div>
    </div>
  )
}
