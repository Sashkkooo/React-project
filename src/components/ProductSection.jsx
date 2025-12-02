import { Link } from "react-router";
import { CartContext } from "../context/CartContext.jsx";
import { useContext } from "react";

export default function ProductSection(props) {

    const product = {
        id: 1,
        name: "Magnets",
        category: "magnets", // пробвай "magnets" за другия вариант
        price: 6.00,
        imageUrls: ["https://drive.google.com/thumbnail?id=1LM6SOAXcKSdyc3UwZS9prQoXcFNnlAPN&sz=w1000"],
    };

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product, 1);
    };

    return (
        <div className="flex flex-col justify-between bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="product-image">
                <Link to={props.link}>
                    <img
                        src={props.imageUrl}
                        alt={props.title}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-1/1 "
                    />
                </Link>
            </div>
            <div className="flex flex-col text-center p-4">
                <h3 className="text-xl font-bold text-gray-800 uppercase mb-2">
                    {props.title}
                </h3>
                <p className="text-lg font-bold text-orange-600 mb-4">{props.price}</p>
                <div className="flex justify-center">
                    <button className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-900 transition" onClick={handleAddToCart}>
                        {props.buttonText}
                    </button>
                </div>
            </div>
        </div>


    );
}