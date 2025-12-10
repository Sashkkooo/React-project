import { Link } from "react-router";

export default function HomeHeroSection(props) {
    return (
        <div className="flex-1 min-w-[280px] px-4 py-10 sm:px-10 sm:py-16 mb-8 text-center rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl bg-white">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 leading-snug sm:leading-tight">
                {props.title}
            </h1>
            <p className="text-base sm:text-lg mb-6 max-w-md sm:max-w-2xl mx-auto">
                {props.description}
            </p>
            <Link
                to={props.link}
                className="inline-block px-4 py-2 sm:px-5 sm:py-3 bg-red-600 text-white rounded-full text-sm sm:text-base font-medium hover:bg-red-700 hover:scale-105 transition"
            >
                {props.buttonText}
            </Link>
        </div>
    );
}
