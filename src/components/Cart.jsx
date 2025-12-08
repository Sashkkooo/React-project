import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext.jsx";
import CropModal from "./CropModal.jsx";
import { getAspectRatio } from "../utils/aspectRatios.js";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const { cart, updateQty, removeFromCart, clearCart, totalItems, totalPrice, saved, finalPrice } =
        useContext(CartContext);

    const [cropImage, setCropImage] = useState();
    const [currentProduct, setCurrentProduct] = useState();
    const [uploads, setUploads] = useState({});
    const [uploadFiles, setUploadFiles] = useState({});
    const [cropQueue, setCropQueue] = useState([]); // ✅ опашка за няколко снимки

    const aspectOptions = getAspectRatio(currentProduct);

    // ✅ helper за конвертиране на dataURL в File
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
            setCropImage(queue[0].url); // показваме първата снимка
        }
    };

    const handleSaveCrop = async (dataUrl) => {
        // ✅ Запазваме dataURL за preview
        setUploads((prev) => ({
            ...prev,
            [currentProduct.id]: [...(prev[currentProduct.id] || []), dataUrl],
        }));

        // ✅ Конвертираме crop-натото изображение в File и го добавяме
        const croppedFile = dataURLtoFile(
            dataUrl,
            `crop_${currentProduct.id}_${Date.now()}.png`
        );
        setUploadFiles((prev) => ({
            ...prev,
            [currentProduct.id]: [...(prev[currentProduct.id] || []), croppedFile],
        }));

        // ✅ Махаме първата снимка от опашката и показваме следващата
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

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            <div className="max-w-[1500px] mx-auto p-5 bg-gray-100 rounded-lg">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Cart</h1>

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
                        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                            <div className="flex justify-between text-sm mb-2">
                                <span>Subtotal</span>
                                <span>BGN {totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-sm mb-2">
                                <span>Saved</span>
                                <span>BGN {saved.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between font-semibold text-md mt-4">
                                <span>Total</span>
                                <span>BGN {finalPrice.toFixed(2)}</span>
                            </div>

                            <Link
                                to="/checkout"
                                state={{ uploadFiles, finalPrice }}
                                className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="mt-10 text-center p-6 bg-gray-50 border rounded-lg shadow max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
                        <p className="text-gray-600 mb-5">Browse products and add items to your cart.</p>
                        <Link to="/products">
                            <button className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                View Products
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
