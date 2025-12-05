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
                <div>
                    <label className="block text-gray-700 mb-1">Име на фирма</label>
                    <input
                        type="text"
                        name="companyName"
                        value={companyInfo.companyName}
                        onChange={handleChange}
                        placeholder="Фирма ООД"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">ЕИК</label>
                    <input
                        type="text"
                        name="companyEIK"
                        value={companyInfo.companyEIK}
                        onChange={handleChange}
                        placeholder="123456789"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-gray-700 mb-1">Град</label>
                    <input
                        type="text"
                        name="companyCity"
                        value={companyInfo.companyCity}
                        onChange={handleChange}
                        placeholder="София"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Адрес</label>
                    <input
                        type="text"
                        name="companyAddress"
                        value={companyInfo.companyAddress}
                        onChange={handleChange}
                        placeholder="Бул. България 1"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 mb-1">МОЛ</label>
                <input
                    type="text"
                    name="companyMOL"
                    value={companyInfo.companyMOL}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

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
