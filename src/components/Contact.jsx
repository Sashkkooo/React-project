import { useState } from "react";
import InputField from "./Checkout/InputField.jsx";
import { sendContactMessage } from "../utils/sendContactEmail.js"
import { validateContactForm } from "../utils/validateContactForm";
import { useTranslation } from "react-i18next";


export default function Contact() {

  const { t } = useTranslation();

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

    const error = validateContactForm(formData);
    if (error) {
      setStatus({ type: "error", text: error });
      return;
    }

    try {
      const result = await sendContactMessage(formData);
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
    <div className="max-w-[600px] mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{t("contact_us")}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField label={t("first_name")} name="firstName" value={formData.firstName} onChange={handleChange} required />
        <InputField label={t("last_name")} name="lastName" value={formData.lastName} onChange={handleChange} required />
        <InputField label={t("email")} type="email" name="email" value={formData.email} onChange={handleChange} required />
        <InputField label={t("phone")} type="tel" name="number" value={formData.number} onChange={handleChange} />
        <div className="w-full">
          <label className="block text-white-700 mb-1">{t("message")}</label>
          <textarea
            rows="6"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {status && (
          <p className={`text-center font-medium ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {status.text}
          </p>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
          {t("sendBtn")}
        </button>
      </form>
    </div>
  );
}
