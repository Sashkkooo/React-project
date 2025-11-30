import { Link } from "react-router-dom";

export default function Cart() {
    return (
        <div className="max-w-[1500px] mx-auto p-5 bg-gray-100 rounded-lg">
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Cart</h1>

            {/* Ако има продукти */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-4">
                    {/* Image */}
                    <div className="mb-4 md:mb-0">
                        <img
                            src="/sample-product.webp"
                            alt="Sample Product"
                            className="w-40 h-auto rounded-md object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 md:ml-6">
                        <h3 className="text-lg font-semibold text-gray-800">Sample Product</h3>
                        <p className="text-gray-600">Quantity:</p>
                        <div className="flex items-center space-x-2 my-2">
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200 hover:bg-blue-500 hover:text-white">
                                -
                            </button>
                            <input
                                type="number"
                                value="1"
                                readOnly
                                className="w-12 h-8 text-center border rounded"
                            />
                            <button className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200 hover:bg-blue-500 hover:text-white">
                                +
                            </button>
                        </div>
                        <p className="text-gray-700">Price: BGN 29.99</p>

                        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Upload Photos
                        </button>

                        <div className="mt-3">
                            <h4 className="font-semibold">Uploaded Photos:</h4>
                            <img
                                src="/sample-upload.webp"
                                alt="Uploaded"
                                className="w-24 h-auto rounded-md mt-2"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 md:mt-0">
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Free shipping progress */}
            <div className="mt-6">
                <h4 className="text-lg font-bold mb-2">Free Shipping</h4>
                <div className="w-full bg-gray-300 rounded-lg overflow-hidden relative">
                    <div className="h-6 bg-green-400 flex items-center justify-center text-white text-sm w-[60%]">
                        <span className="absolute left-1/2 -translate-x-1/2 text-black">
                            BGN 20.00 left for free shipping
                        </span>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="text-right mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Total: BGN 29.99</h3>
                <p className="text-blue-600 font-medium">Saved: BGN 5.00</p>
                <button className="mt-3 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">
                    Complete Order
                </button>
            </div>

            {/* Empty cart */}
            <div className="mt-10 text-center p-6 bg-gray-50 border rounded-lg shadow max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
                <p className="text-gray-600 mb-5">Browse products and add items to your cart.</p>
                <Link to="/products">
                    <button className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        View Products
                    </button>
                </Link>
            </div>
        </div>
    );
}
