import { Link } from "react-router";

export default function Home() {
  return (
    <div className="p-5 text-center">
      {/* Hero banners */}
      <div className="flex flex-wrap justify-center gap-5">
        <div className="flex-1 min-w-[300px] p-20 mb-8 text-center rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl bg-white">
          <h1 className="text-2xl font-bold mb-5 leading-tight h-[100px]">
            Welcome Title
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Create our services description
          </p>
          <Link
            to="/products"
            className="px-5 py-3 bg-red-600 text-white rounded-full text-base font-medium hover:bg-red-700 hover:scale-105 transition"
          >
            Browse
          </Link>
        </div>

        <div className="flex-1 min-w-[300px] p-20 mb-8 text-center rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl bg-white">
          <h1 className="text-2xl font-bold mb-5 leading-tight h-[100px]">
            We Offer
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Logo card description
          </p>
          <Link
            to="/solution"
            className="px-5 py-3 bg-red-600 text-white rounded-full text-base font-medium hover:bg-red-700 hover:scale-105 transition"
          >
            Check More
          </Link>
        </div>
      </div>

      {/* Product categories */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        <div className="h-[400px] min-w-[300px] flex-1 rounded-lg shadow-lg bg-cover bg-center flex items-end mb-8 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
          style={{ backgroundImage: "url('/placeholder1.jpg')" }}>
          <div className="bg-black/50 p-3 w-full text-white">
            <h3 className="text-xl font-semibold">Product Title</h3>
            <p className="text-sm">Product description goes here</p>
          </div>
        </div>

        <div className="h-[400px] min-w-[300px] flex-1 rounded-lg shadow-lg bg-cover bg-center flex items-end mb-8 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
          style={{ backgroundImage: "url('/placeholder2.jpg')" }}>
          <div className="bg-black/50 p-3 w-full text-white">
            <h3 className="text-xl font-semibold">Product Title</h3>
            <p className="text-sm">Product description goes here</p>
          </div>
        </div>
      </div>

      <hr className="my-10 opacity-80" />

      {/* Product benefits */}
      <div className="text-center my-10">
        <h2 className="text-2xl font-bold mb-6">Why Us</h2>
        <ul className="list-none inline-block text-left">
          <li className="text-lg mb-3 pl-10 relative before:content-['🥇'] before:absolute before:left-0 before:text-2xl">
            First advantage
          </li>
          <li className="text-lg mb-3 pl-10 relative before:content-['🚚'] before:absolute before:left-0 before:text-2xl">
            Second advantage
          </li>
          <li className="text-lg mb-3 pl-10 relative before:content-['🎨'] before:absolute before:left-0 before:text-2xl">
            Third advantage
          </li>
        </ul>
      </div>
    </div>
  )
}
