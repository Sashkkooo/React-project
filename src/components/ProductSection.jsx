import { Link } from "react-router";
import { CartContext } from "../context/CartContext.jsx";
import { useContext } from "react";
import products from "../data/products.json";

export default function ProductSection(props) {
    const { addToCart } = useContext(CartContext);

    const product = products.find((p) => p.id === props.productId);

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div className="flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="product-image">
                <Link to={props.link}>
                    <img
                        src={props.imageUrls[0]}
                        alt={props.name}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-1/1"
                    />
                </Link>
            </div>
            <div className="flex flex-col text-center p-4">
                <h3 className="text-xl font-bold text-gray-800 uppercase mb-2">
                    {props.name}
                </h3>
                <p className="text-lg font-bold text-orange-600 mb-4">
                    {props.price} BGN
                </p>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-900 transition"
                        onClick={handleAddToCart}
                    >
                        {props.buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}