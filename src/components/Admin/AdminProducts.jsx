import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";
import { useTranslation } from "react-i18next";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem("jwt");
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    // 📌 Зареждане на продукти
    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:8000/getProducts.php", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            } else {
                setError(data.message || "Failed to load products");
            }
        } catch (err) {
            console.error("Error loading products:", err);
            setError("Network error while loading products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    // 📌 Изтриване на продукт
    const deleteProduct = async (_id) => {
        try {
            const res = await fetch("http://localhost:8000/deleteProduct.php", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: _id }),
            });
            const data = await res.json();
            if (data.success) {
                setProducts(products.filter((p) => p._id !== _id));
            } else {
                alert(data.message || "Failed to delete product");
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Network error while deleting product");
        }
    };

    // 📌 Започване на редакция
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
    };

    // 📌 Запазване на редакция
    const handleSave = async () => {
        if (!formData._id || formData._id.length !== 24) {
            alert("Invalid product ID");
            return;
        }

        const payload = {
            id: formData._id,
            name: formData.name,
            category: formData.category,
            price: formData.price,
            weight: formData.weight,
            description: formData.description,
            imageUrls: formData.imageUrls,
            options: formData.options,
        };

        try {
            const res = await fetch("http://localhost:8000/updateProduct.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setProducts(
                    products.map((p) => (p._id === formData._id ? formData : p))
                );
                setEditingProduct(null);
            } else {
                alert(data.message || "Failed to update product");
            }
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Network error while updating product");
        }
    };

    // 📌 Добавяне на нов продукт
    const handleAdd = async () => {
        if (
            !formData.name ||
            !formData.price ||
            !formData.category ||
            !formData.files?.length
        ) {
            alert("Please fill all required fields including at least one image");
            return;
        }

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("category", formData.category);
        payload.append("price", formData.price);
        if (formData.weight) payload.append("weight", formData.weight);
        if (formData.description) payload.append("description", formData.description);
        if (formData.options)
            payload.append("options", JSON.stringify(formData.options));

        formData.files.forEach((file) => {
            payload.append("images[]", file);
        });

        try {
            const res = await fetch("http://localhost:8000/uploadAndAddProduct.php", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // ⚠️ НЕ слагай Content-Type
                },
                body: payload,
            });
            const data = await res.json();
            if (data.success) {
                const newProduct = {
                    _id: data.insertedId,
                    name: formData.name,
                    category: formData.category,
                    price: formData.price,
                    weight: formData.weight,
                    description: formData.description,
                    options: formData.options || [],
                    imageUrls: data.imageUrls,
                };
                setProducts([...products, newProduct]);
                setEditingProduct(null);
                setFormData({});
            } else {
                alert(data.message || "Failed to add product");
            }
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Network error while adding product");
        }
    };

    // 📌 UI
    if (loading) return <p className="text-center mt-10">Loading products...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
                {t("products_nav")}
            </h2>
            <button
                onClick={() => {
                    setEditingProduct({});
                    setFormData({});
                }}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 transition"
            >
                {t("add_product")}
            </button>

            {/* Таблица за десктоп/таблет */}
            <div className="overflow-x-auto hidden sm:block">
                <table className="min-w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">{t("name")}</th>
                            <th className="border p-2">{t("category")}</th>
                            <th className="border p-2">{t("price")}</th>
                            <th className="border p-2">{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => {
                            const productName = lang === "bg" ? p.name_bg || p.name : p.name;
                            return (
                                <ProductRow
                                    key={p._id}
                                    product={{ ...p, name: productName }}
                                    handleEdit={handleEdit}
                                    deleteProduct={deleteProduct}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Мобилен stacked layout */}
            <div className="sm:hidden space-y-4">
                {products.map((p) => {
                    const productName = lang === "bg" ? p.name_bg || p.name : p.name;
                    const productDescription =
                        lang === "bg" ? p.description_bg || p.description : p.description;

                    return (
                        <div
                            key={p._id}
                            className="border rounded-lg p-4 shadow-sm bg-white"
                        >
                            <p className="font-semibold">{productName}</p>
                            <p className="text-gray-700">{p.category}</p>
                            <p className="text-gray-600">{productDescription}</p>
                            <p className="text-orange-600 font-semibold">
                                {p.price} {t("type_currency")}
                            </p>
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleEdit(p)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                >
                                    {t("edit")}
                                </button>
                                <button
                                    onClick={() => deleteProduct(p._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                >
                                    {t("delete")}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {editingProduct && (
                <ProductForm
                    editingProduct={editingProduct}
                    formData={formData}
                    setFormData={setFormData}
                    handleSave={handleSave}
                    handleAdd={handleAdd}
                />
            )}
        </div>
    );
}
