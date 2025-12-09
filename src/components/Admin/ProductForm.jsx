export default function ProductForm({
    editingProduct,
    formData,
    setFormData,
    handleSave,
    handleAdd,
}) {
    return (
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

                <input
                    type="file"
                    multiple
                    onChange={(e) => {
                        if (e.target.files?.length) {
                            setFormData({
                                ...formData,
                                files: [...(formData.files || []), ...Array.from(e.target.files)],
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
    );
}
    