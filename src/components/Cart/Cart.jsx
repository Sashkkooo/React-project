import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { CartContext } from "../../context/CartContext.jsx";
import CropModal from "./CropModal.jsx";
import { getAspectRatio } from "../../utils/aspectRatios.js";
import CartItem from "./CartItem.jsx";
import { useTranslation } from "react-i18next";

export default function Cart() {
    const { cart, updateQty, removeFromCart, clearCart, totalItems, totalPrice, saved, finalPrice } =
        useContext(CartContext);

    const [cropImage, setCropImage] = useState();
    const [currentProduct, setCurrentProduct] = useState();
    const [uploads, setUploads] = useState({});
    const [uploadFiles, setUploadFiles] = useState({});
    const [cropQueue, setCropQueue] = useState([]);
    const { t } = useTranslation();
    const [error, setError] = useState("");


    const aspectOptions = getAspectRatio(currentProduct);

    // helper за конвертиране на dataURL в File
    const dataURLtoFile = (dataUrl, filename) => {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleUpload = (product, e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            // ✅ Създаваме crop queue с оригиналните файлове
            const queue = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));

            setCurrentProduct(product);
            setCropQueue(queue);
            setCropImage(queue[0].url);
        }
    };

    const handleSaveCrop = async (dataUrl) => {
        setUploads((prev) => ({
            ...prev,
            [currentProduct.id]: [...(prev[currentProduct.id] || []), dataUrl],
        }));

        const croppedFile = dataURLtoFile(
            dataUrl,
            `crop_${currentProduct.id}_${Date.now()}.png`
        );
        setUploadFiles((prev) => ({
            ...prev,
            [currentProduct.id]: [...(prev[currentProduct.id] || []), croppedFile],
        }));

        const [, ...rest] = cropQueue;
        if (rest.length > 0) {
            setCropQueue(rest);
            setCropImage(rest[0].url);
        } else {
            setCropQueue([]);
            setCropImage(null);
            setCurrentProduct(null);
        }
    };

    const handleCheckout = (e) => {
        for (const product of cart) {
            const uploadedCount = (uploads[product.id] || []).length;
            const requiredCount = product.qty ?? 1;

            if (product.category !== "cards" && uploadedCount < requiredCount) {
                e.preventDefault();
                setError(
                    t("upload_error", { name: product.name, missing: requiredCount - uploadedCount })
                );
                return;
            }
        }

        setError("");
    };


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            <div className="max-w-[1500px] mx-auto p-5 bg-gray-100 rounded-lg">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">{t("cart")}</h1>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
                        {/* Product list */}
                        <div className="space-y-6">
                            {cart.map((product) => (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    uploads={uploads}
                                    onUpload={handleUpload}
                                    onIncreaseQty={(id) => updateQty(id, (product.qty ?? 1) + 1)}
                                    onDecreaseQty={(id) => updateQty(id, (product.qty ?? 1) - 1)}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white w-full rounded-lg shadow-md p-4 flex flex-col gap-2">
                            <h2 className="text-lg font-bold">{t("order_summary")}</h2>

                            <div className="flex justify-between text-sm">
                                <span>{t("subtotal")}</span>
                                <span>{t("type_currency")} {totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span>{t("saved")}</span>
                                <span>{t("type_currency")} {saved.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between font-semibold text-md">
                                <span>{t("total")}</span>
                                <span>{t("type_currency")} {finalPrice.toFixed(2)}</span>
                            </div>

                            <Link
                                to="/checkout"
                                state={{ uploadFiles, finalPrice }}
                                onClick={handleCheckout}
                                className="bg-green-600 text-white py-2 px-4 rounded text-center hover:bg-green-700 transition mt-2"
                            >
                                {t("checkout")}
                            </Link>

                            {error && (
                                <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
                            )}
                            
                        </div>
                    </div>
                ) : (
                    <div className="mt-10 text-center p-6 bg-gray-50 border rounded-lg shadow max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-3">{t("empty_cart_header")}</h2>
                        <p className="text-gray-600 mb-5">{t("empty_cart_message")}</p>
                        <Link to="/products">
                            <button className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                {t("view_products")}
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {cropImage && currentProduct && (
                <CropModal
                    image={cropImage}
                    aspectOptions={getAspectRatio(currentProduct)}
                    onClose={() => {
                        setCropQueue([]);
                        setCropImage(null);
                        setCurrentProduct(null);
                    }}
                    onSave={handleSaveCrop}
                />
            )}
        </>
    );
}
