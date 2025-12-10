import { useTranslation } from "react-i18next";

export default function ProductRow({ product, handleEdit, deleteProduct }) {

    const {t} = useTranslation();

    return (
        <tr key={product._id}>
            <td className="border p-2">{product.name}</td>
            <td className="border p-2">{product.category}</td>
            <td className="border p-2">{product.price}</td>
            <td className="border p-2 flex gap-2">
                <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                >
                    {t('edit')}
                </button>
                <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                    {t('delete')}
                </button>
            </td>
        </tr>
    );
}
