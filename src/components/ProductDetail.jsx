import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

export default function ProductDetail() {
    const { id } = useParams(); // взимаме id от URL (/product-detail/:id)
    const [product, setProduct] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const { addToCart } = useContext(CartContext);

    // ⚠️ Тук трябва да имаш user данни от login (например в localStorage)
    const token = localStorage.getItem("jwt");
    const userEmail = localStorage.getItem("email");
    const userRole = localStorage.getItem("role");
    const loggedUserId = localStorage.getItem("id");

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    // 📌 Добавяне на ревю
    useEffect(() => {
        fetch(`http://localhost:8000/getProduct.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProduct(data.product);
                    if (data.product.imageUrls && data.product.imageUrls.length > 0) {
                        setSelectedImageUrl(data.product.imageUrls[0]);
                    }
                } else {
                    console.error("Error loading product:", data.message);
                }
            })
            .catch((err) => console.error("Fetch error:", err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const handleAddReview = () => {
        if (!token) {
            alert("Трябва да сте логнат, за да оставите ревю!");
            return;
        }

        fetch("http://localhost:8000/reviews.php?action=add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: product._id,
                text: newReview
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setReviews([...reviews, { _id: data.reviewId, author: userEmail, text: newReview, userId: loggedUserId }]);
                    setNewReview("");
                }
            });
    };

    const handleEditReview = (reviewId) => {
        const updatedText = prompt("Edit your review:");
        if (!updatedText) return;

        fetch(`http://localhost:8000/reviews.php?action=edit&productId=${product._id}&reviewId=${reviewId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: updatedText })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setReviews(reviews.map(r => r._id === reviewId ? { ...r, text: updatedText } : r));
                }
            });
    };

    const handleDeleteReview = (reviewId) => {
        fetch(`http://localhost:8000/reviews.php?action=delete&productId=${product._id}&reviewId=${reviewId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setReviews(reviews.filter(r => (r._id.$oid || r._id) !== reviewId));
                }
            });
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
                            className={`border-2 rounded cursor-pointer ${selectedImageUrl === url ? "border-blue-600" : "border-transparent"}`}
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

                {/* Reviews section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Reviews</h2>
                    {reviews.map((rev) => (
                        <div key={rev._id} className="bg-gray-50 border p-4 rounded-lg mb-3 shadow-sm">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">
                                    {rev.author}
                                    {rev.userId === loggedUserId && (
                                        <span className="ml-2 text-green-600 text-xs font-bold">(You)</span>
                                    )}
                                    {userRole === "admin" && rev.userId !== loggedUserId && (
                                        <span className="ml-2 text-red-600 text-xs font-bold">[Admin]</span>
                                    )}
                                </p>
                                {rev.createdAt && (
                                    <span className="text-xs text-gray-500">
                                        {new Date(rev.createdAt.$date || rev.createdAt).toLocaleString("bg-BG", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-gray-700">{rev.text}</p>
                            <div className="mt-2 flex gap-2">
                                {rev.userId === loggedUserId && (
                                    <button
                                        className="text-blue-600 text-sm hover:underline"
                                        onClick={() => handleEditReview(rev._id.$oid || rev._id)}
                                    >
                                        Edit
                                    </button>
                                )}
                                {userRole === "admin" && (
                                    <button
                                        className="text-red-600 text-sm hover:underline"
                                        onClick={() => handleDeleteReview(rev._id.$oid || rev._id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {token ? (
                        <div className="mt-4">
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                className="w-full border rounded-lg p-2 focus:ring focus:ring-green-300"
                                placeholder="Write your review..."
                            />
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700 transition"
                                onClick={handleAddReview}
                            >
                                Add Review
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-2">Трябва да сте логнат, за да оставите ревю.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

