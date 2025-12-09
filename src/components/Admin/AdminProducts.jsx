import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductRow from "./ProductRow";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem("jwt");

    // 📌 Зареждане на продукти
    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:8000/getProducts.php", {
                headers: { Authorization: `Bearer ${token}` }
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
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id: _id })
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
            options: formData.options
        };

        try {
            const res = await fetch("http://localhost:8000/updateProduct.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                setProducts(products.map((p) => (p._id === formData._id ? formData : p)));
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
        if (!formData.name || !formData.price || !formData.category || !formData.files?.length) {
            alert("Please fill all required fields including at least one image");
            return;
        }

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("category", formData.category);
        payload.append("price", formData.price);
        if (formData.weight) payload.append("weight", formData.weight);
        if (formData.description) payload.append("description", formData.description);
        if (formData.options) payload.append("options", JSON.stringify(formData.options));

        // ✅ Append all selected files
        formData.files.forEach((file, idx) => {
            payload.append(`images[]`, file); // multiple files under same key
        });

        try {
            const res = await fetch("http://localhost:8000/uploadAndAddProduct.php", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}` // ⚠️ НЕ слагай Content-Type
                },
                body: payload
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
                    imageUrls: data.imageUrls
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
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Admin Panel - Products</h2>
            <button
                onClick={() => {
                    setEditingProduct({});
                    setFormData({});
                }}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 transition"
            >
                Add Product
            </button>

            <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <ProductRow
                            key={p._id}
                            product={p}
                            handleEdit={handleEdit}
                            deleteProduct={deleteProduct}
                        />
                    ))}
                </tbody>
            </table>

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
