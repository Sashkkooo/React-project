import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="text-blue-800 font-bold hover:underline"
      >
        Go back to Home
      </Link>
    </div>
  )
}
