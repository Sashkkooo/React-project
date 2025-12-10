import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { CartContext } from "../../context/CartContext";
import InfoBox from "./InfoBox";
import DiscountBox from "./DiscountBox";
import ReviewList from "./Review";
import { useTranslation } from "react-i18next";

export default function ProductDetail() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const { addToCart } = useContext(CartContext);

    const token = localStorage.getItem("jwt");
    const userEmail = localStorage.getItem("email");
    const userRole = localStorage.getItem("role");
    const loggedUserId = localStorage.getItem("id");

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

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

    // превод според езика
    const productName = lang === "bg" ? product.name_bg : product.name;
    const productDescription =
        lang === "bg" ? product.description_bg : product.description;

    const formattedPrice = product?.price
        ? Number(product.price).toFixed(2)
        : "0.00";

    const handleAddReview = () => {
        if (!token) {
            alert("Трябва да сте логнат, за да оставите ревю!");
            return;
        }

        fetch("http://localhost:8000/reviews.php?action=add", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: product._id?.$oid || product._id,
                text: newReview,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setReviews([
                        ...reviews,
                        {
                            _id: data.reviewId,
                            author: userEmail,
                            text: newReview,
                            userId: loggedUserId,
                        },
                    ]);
                    setNewReview("");
                }
            });
    };

    const handleEditReview = (reviewId) => {
        const updatedText = prompt("Edit your review:");
        if (!updatedText) return;

        fetch(
            `http://localhost:8000/reviews.php?action=edit&productId=${product._id?.$oid || product._id
            }&reviewId=${reviewId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: updatedText }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setReviews(
                        reviews.map((r) =>
                            r._id === reviewId ? { ...r, text: updatedText } : r
                        )
                    );
                }
            });
    };

    const handleDeleteReview = (reviewId) => {
        fetch(
            `http://localhost:8000/reviews.php?action=delete&productId=${product._id?.$oid || product._id
            }&reviewId=${reviewId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setReviews(
                        reviews.filter((r) => (r._id.$oid || r._id) !== reviewId)
                    );
                }
            });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1400px] mx-auto my-12 p-8 bg-white rounded-xl shadow-sm">
            {/* Image container */}
            <div className="text-center">
                <img
                    src={selectedImageUrl}
                    alt={productName}
                    className="max-w-full h-auto rounded-xl transform scale-[1] clip-path-[inset(10%)] transition-transform duration-300 hover:scale-[1.10]"
                />

                {/* Thumbnails */}
                <div className="flex justify-start gap-3 mt-4 ml-4">
                    {product.imageUrls.map((url, idx) => (
                        <div
                            key={idx}
                            className={`border-2 rounded cursor-pointer ${selectedImageUrl === url
                                    ? "border-blue-600"
                                    : "border-transparent"
                                }`}
                            onClick={() => setSelectedImageUrl(url)}
                        >
                            <img
                                src={url}
                                alt={productName}
                                className="w-15 h-15 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded transition-transform hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col justify-center mb-24">
                <h1 className="text-3xl font-bold text-center mb-4">{productName}</h1>
                <p className="text-gray-700 text-center mb-6">{productDescription}</p>
                <p className="text-orange-600 font-semibold text-center mb-6">
                    {t("price")}: {formattedPrice} {t("type_currency")}
                </p>

                {/* Shipping info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <InfoBox
                        icon="🚚"
                        title={t("free_shipping_title")}
                        text={t("free_shipping_p")}
                    />
                    <InfoBox
                        icon="🚀"
                        title={t("express_shipping_title")}
                        text={t("express_shipping_p")}
                    />
                </div>

                {/* Category-specific info */}
                {product.category === "cards" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <InfoBox
                                icon="📋"
                                title={t("cards_info_title1")}
                                text={t("cards_info_p1")}
                            />
                            <InfoBox
                                icon="✉️"
                                title={t("cards_info_title2")}
                                text={t("cards_info_p2")}
                            />
                        </div>
                        <DiscountBox
                            text={`${t("cards_discount")}: 2 ${t("type_currency")}`}
                        />
                    </>
                )}

                {(product.category === "magnets" || product.category === "puzzles") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <InfoBox
                            icon="📋"
                            title={t("magnet_info_title1")}
                            text={t("magnet_info_p1")}
                        />
                        <InfoBox
                            icon="✉️"
                            title={t("magnet_info_title2")}
                            text={t("magnet_info_p2")}
                        />
                    </div>
                )}

                {product.category === "magnets" && (
                    <DiscountBox
                        text={`${t("magnet_discount")}: 1.50 ${t("type_currency")}`}
                    />
                )}

                <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition self-center"
                    onClick={handleAddToCart}
                >
                    {t("addToCartBtn")}
                </button>

                <ReviewList
                    reviews={reviews}
                    loggedUserId={loggedUserId}
                    userRole={userRole}
                    token={token}
                    newReview={newReview}
                    setNewReview={setNewReview}
                    handleAddReview={handleAddReview}
                    handleEditReview={handleEditReview}
                    handleDeleteReview={handleDeleteReview}
                />
            </div>
        </div>
    );
}
