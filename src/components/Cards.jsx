import ProductSection from "./ProductSection";
import products from "../data/products.json";

export default function ProductsList() {

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
                        key={product.id}
                        productId={product.id}
                        price={product.price}
                        name={product.name}
                        imageUrls={product.imageUrls}
                        link={`/product-detail/${product.id}`}
                        buttonText="Add to Cart"
                    />
                ))}

            </div>
        </div>
    );
}
