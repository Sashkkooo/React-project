import StreetField from "./StreetField";
import QuarterField from "./QuarterField";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

export default function AddressFields({ address, cityID, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    };

    const {t} = useTranslation();

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("delivery_address")}</h3>
            <div className="space-y-2">
                {/* Автокомплийт за квартал */}
                <QuarterField cityID={cityID} setFormData={setFormData} />

                {/* Автокомплийт за улица */}
                <StreetField cityID={cityID} setFormData={setFormData} />

                {/* Grid за останалите полета */}
                <div className="grid grid-cols-2 gap-2">
                    <InputField
                        label={t("number")}
                        name="num"
                        value={address.num}
                        onChange={handleChange}
                        placeholder={t("number")}
                    />
                    <InputField
                        label={t("building")}
                        name="block"
                        value={address.block}
                        onChange={handleChange}
                        placeholder={t("building")}
                    />
                    <InputField
                        label={t("entry")}
                        name="entrance"
                        value={address.entrance}
                        onChange={handleChange}
                        placeholder={t("entry")}
                    />
                    <InputField
                        label={t("floor")}
                        name="floor"
                        value={address.floor}
                        onChange={handleChange}
                        placeholder={t("floor")}
                    />
                    <InputField
                        label={t("flat")}
                        name="apartment"
                        value={address.apartment}
                        onChange={handleChange}
                        placeholder={t("flat")}
                    />
                </div>
            </div>
        </div>
    );
}
