import ProductSection from "./ProductSection";
import { useEffect, useState } from "react";

export default function Magnets() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/getProducts.php?categories=magnets,puzzles")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProducts(data.products);
                } else {
                    console.error("Error loading products:", data.message);
                }
            })
            .catch((err) => console.error("Fetch error:", err));
    }, []);

    const magnetsAndPuzzles = products.filter(
        (p) => p.category === "magnets" || p.category === "puzzles"
    );

    return (
        <div className="w-full my-5">
            <div className="bg-blue-600 text-white text-center text-2xl font-semibold py-3 mb-6">
                Magnets & Puzzles
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                {magnetsAndPuzzles.map((product) => (
                    <ProductSection
                        key={product._id}
                        product={product}
                        link={`/product-detail/${product._id}`}
                        buttonText="Add to Cart"
                    />
                ))}
            </div>
        </div>
    );
}
