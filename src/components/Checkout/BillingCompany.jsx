import { useTranslation } from "react-i18next";
import InputField from "./InputField";

export default function BillingCompany({ companyInfo, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            companyInfo: { ...prev.companyInfo, [name]: value },
        }));
    };

    const {t} = useTranslation();

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label={t("company_name")}
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleChange}
                    placeholder={t("company_name")}
                />
                <InputField
                    label={t("eic")}
                    name="companyEIK"
                    value={companyInfo.companyEIK}
                    onChange={handleChange}
                    placeholder="123456789"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label={t("city")}
                    name="companyCity"
                    value={companyInfo.companyCity}
                    onChange={handleChange}
                    placeholder={t("sofia")}
                />
                <InputField
                    label={t("address")}
                    name="companyAddress"
                    value={companyInfo.companyAddress}
                    onChange={handleChange}
                    placeholder={t("bul")}
                />
            </div>

            <InputField
                label={t("prp")}
                name="companyMOL"
                value={companyInfo.companyMOL}
                onChange={handleChange}
                placeholder={t("name")}
            />

            {/* VAT toggle */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            companyInfo: { ...prev.companyInfo, companyVAT: "yes" },
                        }))
                    }
                    className={`flex-1 border rounded-md py-2 transition ${companyInfo.companyVAT === "yes"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                >
                    {t("vat_yes")}
                </button>
                <button
                    type="button"
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            companyInfo: { ...prev.companyInfo, companyVAT: "no" },
                        }))
                    }
                    className={`flex-1 border rounded-md py-2 transition ${companyInfo.companyVAT === "no"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                >
                    {t("vat_no")}
                </button>
            </div>
        </div>
    );
}
