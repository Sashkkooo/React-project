import { Link } from "react-router";

export default function OrderSuccess() {
    return (
        <div className="text-center mx-auto my-12 max-w-2xl p-8 border border-gray-300 rounded-lg bg-white shadow-lg">
            <h1 className="text-green-600 text-3xl font-bold mb-6">
                🎉 Your order was accepted successfully!
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Thank you for choosing our store! Your order has been successfully registered in the system.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Expect a call from our team soon to confirm order details. After successful confirmation, Your order will be processed and shipped to the address you provide or courier office.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                If you have further questions or wish to make changes to your order, you can contact us.
            </p>
            <div className="flex justify-center gap-6 mt-6">
                <Link
                    to="/"
                    className="px-6 py-3 bg-red-500 text-white rounded-full text-base font-medium transition duration-300 ease-in-out hover:bg-red-600 transform hover:scale-105"
                >
                    Continue to home page
                </Link>
                <Link
                    to="/contact"
                    className="px-6 py-3 bg-pink-400 text-white rounded-full text-base font-medium transition duration-300 ease-in-out hover:bg-pink-500 transform hover:scale-105"
                >
                    Contact us
                </Link>
            </div>
        </div>
    );
}
