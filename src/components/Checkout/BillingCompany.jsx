import InputField from "./InputField";

export default function BillingCompany({ companyInfo, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            companyInfo: { ...prev.companyInfo, [name]: value },
        }));
    };

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label="Име на фирма"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleChange}
                    placeholder="Фирма ООД"
                />
                <InputField
                    label="ЕИК"
                    name="companyEIK"
                    value={companyInfo.companyEIK}
                    onChange={handleChange}
                    placeholder="123456789"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label="Град"
                    name="companyCity"
                    value={companyInfo.companyCity}
                    onChange={handleChange}
                    placeholder="София"
                />
                <InputField
                    label="Адрес"
                    name="companyAddress"
                    value={companyInfo.companyAddress}
                    onChange={handleChange}
                    placeholder="Бул. България 1"
                />
            </div>

            <InputField
                label="МОЛ"
                name="companyMOL"
                value={companyInfo.companyMOL}
                onChange={handleChange}
                placeholder="Иван Иванов"
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
                    Регистрирана по ДДС
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
                    Нерегистрирана по ДДС
                </button>
            </div>
        </div>
    );
}
