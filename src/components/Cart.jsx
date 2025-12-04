import { useContext, useState } from "react";
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

    const aspectOptions = getAspectRatio(currentProduct);

    const handleUpload = (product, e) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setCropImage(imageURL);
            setCurrentProduct(product);
        }
    };

    const handleSaveCrop = async (dataUrl) => {
        setUploads((prev) => ({
            ...prev,
            [currentProduct.id]: [...(prev[currentProduct.id] || []), dataUrl],
        }));
        setCropImage();
        setCurrentProduct();
    };

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

                            <button className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-purple-700">
                                Checkout
                            </button>
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
                    onClose={() => setCropImage(null)}
                    onSave={handleSaveCrop}
                />
            )}
        </>
    );
}
