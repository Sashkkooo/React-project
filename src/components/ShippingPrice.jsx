export default function ShippingPrice({ shippingPrice }) {
    if (shippingPrice === null) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-800">
            Цена за доставка: {shippingPrice} лв.
        </div>
    );
}
