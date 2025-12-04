import { Link } from "react-router"

export default function PrivacyPolicy() {
  return (
    <div className="max-w-[800px] mx-auto p-5 bg-white rounded-lg shadow-lg leading-relaxed">
      <h1 className="text-3xl font-bold text-white-800 mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Intro text with <strong>Magnetized Moment</strong> company details.
      </p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">1. Data Controller</h2>
      <p className="mb-4">
        The data controller is <strong>Magnetized Moment</strong>, located at <strong>Company Address</strong>.
        For inquiries, <Link to="/contact" className="text-blue-600 underline">contact us</Link>.
      </p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">2. Data Collected</h2>
      <p className="mb-2">We collect the following types of data:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal information</li>
        <li>Contact details</li>
        <li>Order information</li>
        <li>Payment details</li>
        <li>Delivery address</li>
        <li>Other relevant data</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">3. Data Processing</h2>
      <p className="mb-2">Your data is processed for the following purposes:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Order fulfillment</li>
        <li>Customer support</li>
        <li>Marketing communication</li>
        <li>Legal compliance</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">4. Legal Basis</h2>
      <p className="mb-2">We process data based on:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Consent</li>
        <li>Contractual necessity</li>
        <li>Legal obligations</li>
        <li>Legitimate interests</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">5. Data Retention</h2>
      <p className="mb-4">Data is retained only as long as necessary for the purposes stated.</p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">6. Data Sharing</h2>
      <p className="mb-2">We may share data with:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Service providers</li>
        <li>Delivery partners</li>
        <li>Payment processors</li>
        <li>Legal authorities</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">7. Your Rights</h2>
      <p className="mb-2">You have the right to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Access your data</li>
        <li>Request corrections</li>
        <li>Request deletion</li>
        <li>Restrict processing</li>
        <li>Object to processing</li>
        <li>Data portability</li>
      </ul>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">8. Security Measures</h2>
      <p className="mb-4">We implement technical and organizational measures to protect your data.</p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">9. Complaints</h2>
      <p className="mb-4">
        You may file complaints with the Data Protection Authority:{" "}
        <Link to="http://www.cpdp.bg" className="text-blue-600 underline">www.cpdp.bg</Link>.
      </p>

      <h2 className="text-2xl font-semibold text-white-800 mb-3">Cookies</h2>
      <p className="mb-2">We use cookies to improve your experience.</p>
      <p className="mb-2">Types of cookies include:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Essential cookies</li>
        <li>Performance cookies</li>
        <li>Functional cookies</li>
        <li>Advertising cookies</li>
      </ul>
      <p className="mb-2">You can manage cookies in your browser settings.</p>
      <p className="mb-4">
        Learn more at{" "}
        <Link to="https://www.allaboutcookies.org/" className="text-blue-600 underline">
          AllAboutCookies.org
        </Link>.
      </p>
    </div>
  )
}
