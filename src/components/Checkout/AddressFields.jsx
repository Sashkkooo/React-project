import StreetField from "./StreetField";
import QuarterField from "./QuarterField";
import InputField from "./InputField"; // ✅ използваме готовия компонент

export default function AddressFields({ address, cityID, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Адрес за доставка</h3>
            <div className="space-y-2">
                {/* Автокомплийт за квартал */}
                <QuarterField cityID={cityID} setFormData={setFormData} />

                {/* Автокомплийт за улица */}
                <StreetField cityID={cityID} setFormData={setFormData} />

                {/* Grid за останалите полета */}
                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        label="Номер"
                        name="num"
                        value={address.num}
                        onChange={handleChange}
                        placeholder="Номер"
                    />
                    <InputField
                        label="Блок"
                        name="block"
                        value={address.block}
                        onChange={handleChange}
                        placeholder="Блок"
                    />
                    <InputField
                        label="Вход"
                        name="entrance"
                        value={address.entrance}
                        onChange={handleChange}
                        placeholder="Вход"
                    />
                    <InputField
                        label="Етаж"
                        name="floor"
                        value={address.floor}
                        onChange={handleChange}
                        placeholder="Етаж"
                    />
                    <InputField
                        label="Апартамент"
                        name="apartment"
                        value={address.apartment}
                        onChange={handleChange}
                        placeholder="Апартамент"
                    />
                </div>
            </div>
        </div>
    );
}
