import { useTranslation } from "react-i18next";

export default function DeliveryOptionSelector({ deliveryOption, setFormData, calculateShipping }) {

    const {t} = useTranslation();

    return (
        <div>
            <label className="block text-gray-700 mb-2">{t("delivery")}</label>
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
                    {t("delivery_office")}
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
                    {t("delivery_to_address")}
                </button>
            </div>
        </div>
    );
}
