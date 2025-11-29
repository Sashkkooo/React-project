import { useState } from "react";
import { Link } from "react-router";

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border rounded-md shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 bg-gray-100 font-semibold text-lg hover:bg-gray-200 transition"
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
  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">FAQs</h2>

      <AccordionItem
        question="How to order?"
        answer={
          <>
            Step 1 <br />
            Step 2 <br />
            Step 3 <br />
            Step 4
          </>
        }
      />

      <AccordionItem
        question="Order time"
        answer="Orders are processed within X days."
      />

      <AccordionItem
        question="Delivery offer"
        answer="We deliver nationwide with fast shipping."
      />

      <AccordionItem
        question="Photo resolution"
        answer="Please upload high-resolution photos for best results."
      />

      <AccordionItem
        question="Choosing number of items"
        answer={
          <>
            You can choose any number of items.{" "}
            <Link to="/contact" className="text-blue-600 underline">
              Contact us.
            </Link>
          </>
        }
      />

      <AccordionItem
        question="Other services"
        answer={
          <>
            We also offer design services.{" "}
            <Link to="/solution" className="text-blue-600 underline">
              Learn more.
            </Link>
          </>
        }
      />

      <AccordionItem
        question="Logo & Website"
        answer="We provide logo and website design packages."
      />

      <AccordionItem
        question="What is a logo?"
        answer={
          <>
            A logo is a brand identity. <br />
            It represents your business. <br />
            It builds recognition. <br />
            It adds trust.
          </>
        }
      />

      <AccordionItem
        question="What is a website?"
        answer={
          <>
            A website is your online presence. <br />
            It informs customers. <br />
            It builds credibility. <br />
            It drives sales.
          </>
        }
      />

      <AccordionItem
        question="Final design"
        answer="We deliver the final design in multiple formats."
      />
    </div>
  );
}
