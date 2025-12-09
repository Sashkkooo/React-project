export default function PageHeader({ props }) {
    return (
        <div className="w-full bg-blue-600 text-white text-center text-2xl font-semibold py-3">
            {props.title}
        </div>
    )
};