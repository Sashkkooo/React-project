import ProductSection from "./ProductSection";
import { useEffect, useState } from "react";


export default function Cards() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/getProducts.php?category=cards")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Fetch error:", err));
    }, []);


    const cards = products.filter((p) => p.category === "cards");

    return (
        <div className="w-full my-6">
            {/* Toolbar */}
            <div className="bg-blue-600 text-white text-center text-2xl font-semibold py-3 mb-6">
                Cards
            </div>

            {/* Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {cards.map((product) => (
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