export default function CartItem({ product, uploads, onUpload, onIncreaseQty, onDecreaseQty, onRemove }) {
    const uploaded = uploads[product.id] || [];

    return (
        <div className="grid grid-cols-[auto_1fr_auto] gap-6 border-b py-6 relative">
            {/* Product image */}
            <img
                src={product.imageUrls?.[0] ?? "/fallback.webp"}
                alt={product.name}
                className="w-60 h-60 object-cover rounded-md"
            />

            {/* Product details */}
            <div className="flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
                    <p className="text-sm text-gray-500 text-center">
                        {product.description}
                    </p>
                    <p className={`text-sm ${product.inStock ? "text-green-600" : "text-yellow-600 text-center"}`}>
                        In stock
                    </p>
                </div>

                {/* Upload button */}
                {product.category !== "cards" && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id={`upload-${product.id}`}
                            onChange={(e) => onUpload(product, e)}
                        />
                        <label
                            htmlFor={`upload-${product.id}`}
                            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer inline-block text-sm w-fit"
                        >
                            Upload Photos
                        </label>
                    </>
                )}
            </div>

            {/* Quantity + Price + Remove */}
            <div className="flex flex-col items-end justify-between h-full">
                {/* Remove button */}
                <button
                    onClick={() => onRemove()}
                    className="text-red-500 text-xl hover:text-red-700 self-end"
                    aria-label="Remove item"
                >
                    ×
                </button>

                {/* Quantity selector */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                        onClick={() => onDecreaseQty(product.id)}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={product.qty ?? 1}
                        readOnly
                        className="w-12 h-8 text-center border rounded"
                    />
                    <button
                        className="w-8 h-8 flex items-center justify-center border rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                        onClick={() => onIncreaseQty(product.id)}
                    >
                        +
                    </button>
                </div>

                {/* Price */}
                <p className="mt-2 text-right font-medium text-gray-800">
                    BGN {(product.price * (product.qty ?? 1)).toFixed(2)}
                </p>

                {/* Uploaded thumbnails */}
                {uploaded.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap justify-end">
                        {uploaded.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Uploaded ${idx + 1}`}
                                className="w-12 h-12 object-cover rounded border"
                            />
                        ))}
                    </div>
                )}

                {product.category !== "cards" && uploaded.length < (product.qty ?? 1) && (
                    <p className="text-xs text-red-600 mt-1 text-right">
                        Please upload {product.qty - uploaded.length} more photo(s).
                    </p>
                )}
            </div>
        </div>
    );
}
