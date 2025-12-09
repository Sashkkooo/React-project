import { useState } from "react";
import { Link } from "react-router";

function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border rounded-md shadow-lg bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-white-100 font-semibold text-lg hover:bg-gray-200 transition"
      >
        {question}
      </button>
      {open && (
        <div className="px-4 py-3 text-gray-700 text-base bg-white">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Faqs() {
  const faqs = [
    { question: "How to order?", answer: <>Step 1 <br /> Step 2 <br /> Step 3 <br /> Step 4</> },
    { question: "Order time", answer: "Orders are processed within X days." },
    { question: "Delivery offer", answer: "We deliver nationwide with fast shipping." },
    { question: "Photo resolution", answer: "Please upload high-resolution photos for best results." },
    {
      question: "Choosing number of items",
      answer: (
        <>
          You can choose any number of items.{" "}
          <Link to="/contact" className="text-blue-600 underline">
            Contact us.
          </Link>
        </>
      ),
    },
    {
      question: "Other services",
      answer: (
        <>
          We also offer design services.{" "}
          <Link to="/solution" className="text-blue-600 underline">
            Learn more.
          </Link>
        </>
      ),
    },
    { question: "Logo & Website", answer: "We provide logo and website design packages." },
    {
      question: "What is a logo?",
      answer: (
        <>
          A logo is a brand identity. <br />
          It represents your business. <br />
          It builds recognition. <br />
          It adds trust.
        </>
      ),
    },
    {
      question: "What is a website?",
      answer: (
        <>
          A website is your online presence. <br />
          It informs customers. <br />
          It builds credibility. <br />
          It drives sales.
        </>
      ),
    },
    { question: "Final design", answer: "We deliver the final design in multiple formats." },
  ];

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">FAQs</h2>
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} {...faq} />
      ))}
    </div>
  );
}
