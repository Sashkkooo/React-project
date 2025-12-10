import { useTranslation } from "react-i18next";

    export default function BillingToggle({ billingRequired, billingType, setFormData }) {
        const handleCheckbox = (e) => {
            setFormData((prev) => ({ ...prev, billingRequired: e.target.checked }));
        };

        const setType = (type) => {
            setFormData((prev) => ({ ...prev, billingType: type }));
        };

        const {t} = useTranslation();

        return (
            <div className="space-y-2">
                <label className="flex items-center gap-2 select-none">
                    <input
                        type="checkbox"
                        checked={billingRequired}
                        onChange={handleCheckbox}
                        className="h-4 w-4"
                    />
                    <span className="text-gray-800">{t("billing_request")}</span>
                </label>

                {billingRequired && (
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setType("individual")}
                            className={`flex-1 border rounded-md py-2 transition ${billingType === "individual"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {t("individual")}
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("company")}
                            className={`flex-1 border rounded-md py-2 transition ${billingType === "company"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {t("company")}
                        </button>
                    </div>
                )}
            </div>
        );
    }
