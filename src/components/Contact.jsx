export default function Contact() {
  return (
    <div className="max-w-[600px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

      <form className="space-y-4">
        {/* First name */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last name */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Message */}
        <div className="w-full">
          <label className="block text-gray-600 mb-1">Message</label>
          <textarea
            rows="6"
            placeholder="Your message"
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  )
}
