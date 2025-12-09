export default function DiscountBox(props) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow text-center mb-6">
            <h3 className="text-lg font-semibold">{props.text}</h3>
        </div>
    );
}
