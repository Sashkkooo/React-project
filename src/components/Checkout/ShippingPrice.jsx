import { useTranslation } from "react-i18next";

export default function ShippingPrice({ shippingPrice }) {

    const {t} = useTranslation();

    if (shippingPrice === null) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-blue-800">
            {t("shipping_price")} {shippingPrice} лв.
        </div>
    );
}
