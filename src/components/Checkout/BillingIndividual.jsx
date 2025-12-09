import InputField from "./InputField";

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
                <InputField
                    label="Град"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleChange}
                    placeholder="София"
                    required
                />
                <InputField
                    label="Пощенски код"
                    name="postCode"
                    value={billingInfo.postCode}
                    onChange={handleChange}
                    placeholder="4000"
                    required
                />
            </div>

            <InputField
                label="Улица/Квартал"
                name="streetOrQuarter"
                value={billingInfo.streetOrQuarter}
                onChange={handleChange}
                placeholder="Улица, квартал, жк"
                required
            />

            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label="Номер"
                    name="num"
                    value={billingInfo.num}
                    onChange={handleChange}
                    placeholder="Номер"
                />
                <InputField
                    label="Блок"
                    name="block"
                    value={billingInfo.block}
                    onChange={handleChange}
                    placeholder="Блок"
                />
                <InputField
                    label="Вход"
                    name="entrance"
                    value={billingInfo.entrance}
                    onChange={handleChange}
                    placeholder="Вход"
                />
                <InputField
                    label="Етаж"
                    name="floor"
                    value={billingInfo.floor}
                    onChange={handleChange}
                    placeholder="Етаж"
                />
                <InputField
                    label="Апартамент"
                    name="apartment"
                    value={billingInfo.apartment}
                    onChange={handleChange}
                    placeholder="Апартамент"
                />
            </div>
        </div>
    );
}
