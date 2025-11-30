import ProductSection from "./ProductSection";

export default function ProductsList() {
    return (
        <div className="w-full my-6">
            {/* Toolbar */}
            <div className="bg-blue-600 text-white text-center text-2xl font-semibold py-3 mb-6">
                Cards
            </div>

            {/* Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {/* Примерна карта */}
                {/* Image */}
                <ProductSection
                    imageUrl="https://drive.google.com/thumbnail?id=1JjHqz3KW7kqDxPawsTPk7QgnYG8UNfQi&sz=w1000"
                    link="/product-detail/3"
                    title="Legend"
                    price="6.00 BGN"
                    buttonText="Add to Cart"
                />

                <ProductSection
                    imageUrl="https://drive.google.com/thumbnail?id=18IKvkOUnMYbLQmcGgU08gX1vEdfSWhWz&sz=w1000"
                    link="/product-detail/4"
                    title="You are"
                    price="6.00 BGN"
                    buttonText="Add to Cart"
                />
            </div>
        </div>
    );
}
