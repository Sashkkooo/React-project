import { useTranslation } from "react-i18next";

export default function CartItem({ product, uploads, onUpload, onIncreaseQty, onDecreaseQty, onRemove }) {
    const uploaded = uploads[product.id] || [];
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    // динамично име и описание според езика
    const productName = lang === "bg" ? product.name_bg ?? product.name : product.name;
    const productDescription = lang === "bg" ? product.description_bg ?? product.description : product.description;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-6 border-b py-6 relative">
            <img
                src={product.imageUrls?.[0] ?? "/fallback.webp"}
                alt={productName}
                className="w-full sm:w-60 sm:h-60 object-cover rounded-md"
            />

            <div className="flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
                        {productName}
                    </h3>
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                        {productDescription}
                    </p>
                    <p
                        className={`text-sm ${product.inStock ? "text-green-600" : "text-yellow-600"} text-center sm:text-left`}
                    >
                        {t("in_stock")}
                    </p>
                </div>

                {product.category !== "cards" && (
                    <>
                        <input
                            id={`upload-${product.id}`}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => onUpload(product, e)}
                        />
                        <label
                            htmlFor={`upload-${product.id}`}
                            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer inline-block text-sm w-full sm:w-fit text-center"
                        >
                            {t("upload_photos")}
                        </label>
                    </>
                )}
            </div>

            <div className="flex flex-col items-center sm:items-end justify-between h-full">
                <button
                    onClick={() => onRemove(product.id)}
                    className="text-red-500 text-xl hover:text-red-700 self-end"
                    aria-label={t("remove_item")}
                >
                    ×
                </button>

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

                <p className="mt-2 text-center sm:text-right font-medium text-gray-800">
                     {(product.price * (product.qty ?? 1)).toFixed(2)} {t("type_currency")}
                </p>

                {uploaded.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap justify-center sm:justify-end">
                        {uploaded.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`${t("uploaded")} ${idx + 1}`}
                                className="w-12 h-12 object-cover rounded border"
                            />
                        ))}
                    </div>
                )}

                {product.category !== "cards" && uploaded.length < (product.qty ?? 1) && (
                    <p className="text-xs text-red-600 mt-1 text-center sm:text-right">
                        {t("upload_please")} {product.qty - uploaded.length} {t("more_photos")}
                    </p>
                )}
            </div>
        </div>
    );
}
