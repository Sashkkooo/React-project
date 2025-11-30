import { Link } from "react-router";

export default function HomeHeroSection(props) {
    return (
        <div className="flex-1 min-w-[300px] p-20 mb-8 text-center rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl bg-white">
            <h1 className="text-2xl font-bold mb-5 leading-tight h-[100px]">
                {props.title}
            </h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
                {props.description}
            </p>
            <Link
                to={props.link}
                className="px-5 py-3 bg-red-600 text-white rounded-full text-base font-medium hover:bg-red-700 hover:scale-105 transition"
         >
                   {props.buttonText} 
            </Link>
        </div>
    );
}