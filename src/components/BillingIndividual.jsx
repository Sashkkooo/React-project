export default function BillingIndividual({ billingInfo, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            billingInfo: { ...prev.billingInfo, [name]: value },
        }));
    };

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-gray-700 mb-1">Град</label>
                    <input
                        type="text"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleChange}
                        placeholder="София"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Пощенски код</label>
                    <input
                        type="text"
                        name="postCode"
                        value={billingInfo.postCode}
                        onChange={handleChange}
                        placeholder="4000"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Улица/Квартал</label>
                <input
                    type="text"
                    name="streetOrQuarter"
                    value={billingInfo.streetOrQuarter}
                    onChange={handleChange}
                    placeholder="Улица, квартал, жк"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <input
                    type="text"
                    name="num"
                    placeholder="Номер"
                    value={billingInfo.num}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="block"
                    placeholder="Блок"
                    value={billingInfo.block}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="entrance"
                    placeholder="Вход"
                    value={billingInfo.entrance}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="floor"
                    placeholder="Етаж"
                    value={billingInfo.floor}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="text"
                    name="apartment"
                    placeholder="Апартамент"
                    value={billingInfo.apartment}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
}
