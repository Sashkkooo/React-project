import { Link } from "react-router-dom";

export default function Products() {
    return (
        <div className="mb-5">
            {/* Заглавие */}
            <h1 className="text-4xl font-bold text-gray-800 text-center my-4">
                Products
            </h1>

            {/* Навигация за секции */}
            <div className="flex justify-center mb-5 bg-gray-200 p-3 rounded-md shadow-md sticky top-20 z-50">
                <Link
                    to="/products/magnets"
                    className="mx-5 text-blue-800 font-bold text-lg hover:text-blue-900 transition-colors"
                >
                    Magnets
                </Link>
                <Link
                    to="/products/cards"
                    className="mx-5 text-blue-800 font-bold text-lg hover:text-blue-900 transition-colors"
                >
                    Cards
                </Link>
                {/* <Link to="/products/custom-print" className="mx-5 text-blue-800 font-bold text-lg hover:text-blue-900 transition-colors">
          Stickers
        </Link> */}
            </div>

            {/* How it works секция */}
            <div className="max-w-[800px] mx-auto p-5 bg-gray-100 rounded-lg shadow-md leading-relaxed text-lg">
                <h2 className="text-center text-2xl font-bold mb-5">How it works?</h2>
                <p className="text-center mb-2">Step A: Choose your product</p>
                <p className="text-center mb-2">Step 1: Add to cart</p>
                <p className="text-center mb-2">Step 2: Upload your photos</p>
                <p className="text-center mb-2">Step 3: Confirm order</p>
                <p className="text-center mb-2">Step 4: Delivery</p>
            </div>
        </div>
    );
}
