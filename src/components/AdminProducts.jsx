import { useEffect, useState } from "react";

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
                        <tr key={p._id}>
                            <td className="border p-2">{p.name}</td>
                            <td className="border p-2">{p.category}</td>
                            <td className="border p-2">{p.price}</td>
                            <td className="border p-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(p)}
                                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteProduct(p._id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingProduct && (
                <div className="bg-gray-50 p-4 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">
                        {editingProduct._id ? "Edit Product" : "Add Product"}
                    </h3>
                    <input
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border p-2 w-full mb-2"
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="border p-2 w-full mb-2"
                        placeholder="Category"
                    />
                    <input
                        type="number"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="border p-2 w-full mb-2"
                        placeholder="Price"
                    />
                    <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="border p-2 w-full mb-2"
                        placeholder="Description"
                    />

                    {/* Images */}
                    <div className="mb-4">
                        <h4 className="font-semibold mb-2">Images</h4>

                        {/* Preview на вече избрани файлове */}
                        {formData.files?.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${idx}`}
                                    className="w-20 h-20 object-cover rounded border"
                                />
                                <span className="text-sm text-gray-700 flex-1">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newFiles = [...formData.files];
                                        newFiles.splice(idx, 1);
                                        setFormData({ ...formData, files: newFiles });
                                    }}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        {/* Input за добавяне на нови файлове */}
                        <input
                            type="file"
                            multiple
                            onChange={(e) => {
                                if (e.target.files?.length) {
                                    setFormData({
                                        ...formData,
                                        files: [...(formData.files || []), ...Array.from(e.target.files)]
                                    });
                                }
                            }}
                            className="border p-2 w-full mb-2"
                        />
                    </div>

                    <button
                        onClick={editingProduct._id ? handleSave : handleAdd}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        {editingProduct._id ? "Save Changes" : "Add Product"}
                    </button>
                </div>
            )}
        </div>
    );

}
