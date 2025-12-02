import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductDetail() {
    // Статични данни за визуализация
    const product = {
        id: 1,
        name: "Magnets",
        category: "magnets", // пробвай "magnets" за другия вариант
        price: 6.00,
        imageUrls: ["https://drive.google.com/thumbnail?id=1LM6SOAXcKSdyc3UwZS9prQoXcFNnlAPN&sz=w1000"],
    };

    const [selectedImageUrl, setSelectedImageUrl] = useState(product.imageUrls[0]);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product, 1); // добавя с количество 1
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.1fr] gap-8 max-w-[1400px] mx-auto my-12 p-8 bg-white rounded-lg shadow-lg animate-fadeIn">
            {/* Image container */}
            <div className="text-center">
                <img
                    src={selectedImageUrl}
                    alt={product.name}
                    className="max-w-full h-auto rounded-lg transform scale-125 clip-path inset-[10%] transition-transform duration-300 hover:scale-135"
                />

                {/* Thumbnails */}
                <div className="flex justify-start gap-3 mt-4">
                    {product.imageUrls.map((url, idx) => (
                        <div
                            key={idx}
                            className="border-2 border-transparent hover:border-blue-600 cursor-pointer rounded"
                            onClick={() => setSelectedImageUrl(url)}
                        >
                            <img
                                src={url}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Info container */}
            <div className="flex flex-col justify-center mb-24">
                <h1 className="text-3xl font-bold text-center mb-4">{product.name}</h1>
                <p className="text-orange-600 font-semibold text-center mb-6">
                    Price: {product.price.toFixed(2)} BGN
                </p>

                {/* Shipping info */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                        <span className="text-3xl mr-3">🚚</span>
                        <div>
                            <h3 className="text-lg font-semibold">Free Shipping</h3>
                            <p className="text-sm text-gray-700">On orders over 50 BGN</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                        <span className="text-3xl mr-3">🚀</span>
                        <div>
                            <h3 className="text-lg font-semibold">Express Delivery</h3>
                            <p className="text-sm text-gray-700">Next-day shipping available</p>
                        </div>
                    </div>
                </div>

                {/* Extra info for cards */}
                {product.category === "cards" && (
                    <>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                                <span className="text-3xl mr-3">📋</span>
                                <div>
                                    <h3 className="text-lg font-semibold">Card Info 1</h3>
                                    <p className="text-sm text-gray-700">Details about cards</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                                <span className="text-3xl mr-3">✉️</span>
                                <div>
                                    <h3 className="text-lg font-semibold">Card Info 2</h3>
                                    <p className="text-sm text-gray-700">More details about cards</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow text-center mb-6">
                            <h3 className="text-lg font-semibold">Card Discount: 2 BGN</h3>
                        </div>
                    </>
                )}

                {/* Extra info for magnets */}
                {product.category === "magnets" && (
                    <>
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                                <span className="text-3xl mr-3">📋</span>
                                <div>
                                    <h3 className="text-lg font-semibold">Magnet Info 1</h3>
                                    <p className="text-sm text-gray-700">Details about magnets</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                                <span className="text-3xl mr-3">✉️</span>
                                <div>
                                    <h3 className="text-lg font-semibold">Magnet Info 2</h3>
                                    <p className="text-sm text-gray-700">More details about magnets</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg shadow text-center mb-6">
                            <h3 className="text-lg font-semibold">Magnet Discount: 1.50 BGN</h3>
                        </div>
                    </>
                )}

                {/* Add to cart button */}
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
