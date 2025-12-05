import { useState } from "react";
import InputField from "./InputField";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setStatus({ type: "error", text: "Please fill in all required fields." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: "error", text: "Invalid email address." });
      return;
    }

    // Phone validation
    if (formData.number) {
      const phoneRegex = /^(0\d{9}|\+359\d{9})$/;
      if (!phoneRegex.test(formData.number)) {
        setStatus({
          type: "error",
          text: "Phone must be 10 digits starting with 0 (e.g. 0877777777) or +359 followed by 9 digits (e.g. +359877777777).",
        });
        return;
      }
    }


    try {
      const response = await fetch("http://localhost:8000/sendContactEmail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        setStatus({ type: "success", text: "Message sent successfully!" });
        setFormData({ firstName: "", lastName: "", email: "", number: "", message: "" });
      } else {
        setStatus({ type: "error", text: result.message || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Server error. Please try again later." });
    }
  };

  return (
    <div className="max-w-[600px] mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First name */}
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />

        {/* Last name */}
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />

        {/* Email */}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        {/* Phone */}
        <InputField
          label="Phone"
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="0877777777 or +359877777777"
          pattern="^(0\d{9}|\+359\d{9})$"
        />

        {/* Message (тук е textarea, може да си остане отделно) */}
        <div className="w-full">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            rows="6"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Status message */}
        {status && (
          <p
            className={`text-center font-medium ${status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
          >
            {status.text}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}