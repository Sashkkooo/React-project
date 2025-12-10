import { useTranslation } from "react-i18next";
import InputField from "./InputField";

export default function BillingIndividual({ billingInfo, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            billingInfo: { ...prev.billingInfo, [name]: value },
        }));
    };

    const {t} = useTranslation();

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label={t("city")}
                    name="city"
                    value={billingInfo.city}
                    onChange={handleChange}
                    placeholder={t("sofia")}
                    required
                />
                <InputField
                    label={t("postcode")}
                    name="postCode"
                    value={billingInfo.postCode}
                    onChange={handleChange}
                    placeholder="4000"
                    required
                />
            </div>

            <InputField
                label={t("streetOrQuarter")}
                name="streetOrQuarter"
                value={billingInfo.streetOrQuarter}
                onChange={handleChange}
                placeholder={t("streetOrQuarter")}
                required
            />

            <div className="grid grid-cols-2 gap-2">
                <InputField
                    label={t("number")}
                    name="num"
                    value={billingInfo.num}
                    onChange={handleChange}
                    placeholder={t("number")}
                />
                <InputField
                    label={t("building")}
                    name="block"
                    value={billingInfo.block}
                    onChange={handleChange}
                    placeholder={t("building")}
                />
                <InputField
                    label={t("entry")}
                    name="entrance"
                    value={billingInfo.entrance}
                    onChange={handleChange}
                    placeholder={t("entry")}
                />
                <InputField
                    label={t("floor")}
                    name="floor"
                    value={billingInfo.floor}
                    onChange={handleChange}
                    placeholder={t("floor")}
                />
                <InputField
                    label={t("flat")}
                    name="apartment"
                    value={billingInfo.apartment}
                    onChange={handleChange}
                    placeholder={t("flat")}
                />
            </div>
        </div>
    );
}
