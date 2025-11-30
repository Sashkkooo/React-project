import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";

export default function ProductsList() {
    return (
        <div className="w-full my-5">
            {/* Toolbar */}
            <div className="bg-blue-600 text-white text-center text-2xl font-semibold py-3 mb-6">
                Magnets & Puzzles
            </div>


            {/* Grid container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
                {/* Magnet card */}

                <ProductSection
                    imageUrl="https://drive.google.com/thumbnail?id=1LM6SOAXcKSdyc3UwZS9prQoXcFNnlAPN&sz=w1000"
                    link="/product-detail/1"
                    title="Magnets"
                    price="6.00 BGN"
                    buttonText="Add to Cart"
                />


                {/* Puzzle card */}

                <ProductSection
                    imageUrl="https://drive.google.com/thumbnail?id=1EoElpPZiczGGv1ntviGvI-4HKfym1s1i&sz=w1000"
                    link="/product-detail/2"
                    title="Puzzle 4 pieces"
                    price="20.00 BGN"
                    buttonText="Add to Cart"
                />
                {/* Можеш да добавиш още карти по същия шаблон */}
            </div>
        </div>
    );
}
