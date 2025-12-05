export default function DeliveryOptionSelector({ deliveryOption, setFormData, calculateShipping }) {
    return (
        <div>
            <label className="block text-gray-700 mb-2">Начин на доставка</label>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setFormData((prev) => ({ ...prev, deliveryOption: "office" }));
                    }}
                    className={`flex-1 border rounded-md py-2 transition ${deliveryOption === "office"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                >
                    До офис
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setFormData((prev) => ({ ...prev, deliveryOption: "address" }));
                    }}
                    className={`flex-1 border rounded-md py-2 transition ${deliveryOption === "address"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                >
                    До адрес
                </button>
            </div>
        </div>
    );
}
