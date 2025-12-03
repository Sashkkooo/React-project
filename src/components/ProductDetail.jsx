import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductDetail() {
    const { id } = useParams(); // взимаме id от URL (/product-detail/:id)
    const [product, setProduct] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`http://localhost:8000/getProduct.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                if (data.imageUrls && data.imageUrls.length > 0) {
                    setSelectedImageUrl(data.imageUrls[0]); // първата снимка голяма
                }
            })
            .catch((err) => console.error("Fetch error:", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto my-12 p-8 bg-white rounded-xl shadow-sm">
            {/* Image container */}
            <div className="text-center">
                <img
                    src={selectedImageUrl}
                    alt={product.name}
                    className="max-w-full h-auto rounded-xl transform scale-[1] clip-path-[inset(10%)] transition-transform duration-300 hover:scale-[1.35]"
                />

                {/* Thumbnails */}
                <div className="flex justify-start gap-3 mt-4 ml-4">
                    {product.imageUrls.map((url, idx) => (
                        <div
                            key={idx}
                            className={`border-2 rounded cursor-pointer ${selectedImageUrl === url ? "border-blue-600" : "border-transparent"
                                }`}
                            onClick={() => setSelectedImageUrl(url)}
                        >
                            <img
                                src={url}
                                alt={product.name}
                                className="w-15 h-15 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded transition-transform hover:scale-105"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                {/* Category-specific info */}
                {product.category === "cards" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                {product.category === "magnets" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition self-center"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>

    );
}
