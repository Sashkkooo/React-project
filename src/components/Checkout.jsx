import { useState, useEffect } from "react";
import { useLocation } from "react-router"; // ✅ за да вземем uploadFiles и finalPrice от Cart
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import DeliveryOptionSelector from "./DeliveryOptionSelector";
import CitySelector from "./CitySelector";
import OfficeField from "./OfficeField";
import AddressFields from "./AddressFields";
import BillingToggle from "./BillingToggle";
import BillingIndividual from "./BillingIndividual";
import BillingCompany from "./BillingCompany";
import ShippingPrice from "./ShippingPrice";
import AlertBox from "./AlertBox";
import { calculateShipping } from "../utils/shippingPriceUtil";

export default function Checkout() {
    const location = useLocation();
    const uploadFiles = location.state?.uploadFiles || {}; // ✅ файловете от Cart
    const finalPrice = location.state?.finalPrice || 0;    // ✅ крайната цена от Cart

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        surname: "",
        phone: "",
        city: "",
        cityID: null,
        postCode: "",
        deliveryOption: "",
        office: null, // ✅ тук ще пазим избрания офис като обект
        selectedOffice: null,
        address: {
            streetOrQuarter: "",
            num: "",
            block: "",
            entrance: "",
            floor: "",
            apartment: "",
        },
        billingRequired: false,
        billingType: "",
        billingInfo: { city: "", postCode: "", streetOrQuarter: "", num: "" },
        companyInfo: {
            companyName: "",
            companyEIK: "",
            companyCity: "",
            companyAddress: "",
            companyMOL: "",
            companyVAT: "no",
        },
    });

    const [alert, setAlert] = useState(null);
    const [shippingPrice, setShippingPrice] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return "Моля, въведете валиден имейл адрес.";
        const phoneRegex = /^(0\d{9}|\+359\d{9})$/;
        if (!phoneRegex.test(formData.phone))
            return "Телефонът трябва да е 10 цифри започващ с 0 или +359 и 9 цифри.";
        if (!formData.name || !formData.surname || !formData.city || !formData.postCode)
            return "Моля, попълнете всички задължителни полета.";
        if (formData.deliveryOption === "office" && !formData.office)
            return "Моля, изберете офис на Еконт.";
        if (
            formData.deliveryOption === "address" &&
            (!formData.address.streetOrQuarter || !formData.address.num)
        )
            return "Моля, попълнете улица/квартал и номер.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (error) {
            setAlert({ type: "error", text: error });
            return;
        }

        try {
            setAlert({ type: "loading", text: "Изпращане на поръчката..." });

            // Изчисляване на доставка
            const result = await calculateShipping(formData, 5, 0, []);
            const shipping = result.price || 0;
            setShippingPrice(shipping);

            // Вземаме cart от localStorage
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0);

            // Създаваме FormData
            const fd = new FormData();
            fd.append("userId", localStorage.getItem("userId") || "guest");
            fd.append("cart", JSON.stringify(cart));
            fd.append("totalPrice", totalPrice);
            fd.append("shippingPrice", shipping);
            fd.append("finalPrice", finalPrice); // ✅ добавено

            // ✅ Добавяме данните от формата
            fd.append("email", formData.email);
            fd.append("name", formData.name);
            fd.append("surname", formData.surname);
            fd.append("phone", formData.phone);
            fd.append("city", formData.city);
            fd.append("cityID", formData.cityID || "");
            fd.append("postCode", formData.postCode);
            fd.append("deliveryOption", formData.deliveryOption);

            // ✅ само името на офиса
            const officeName =
                formData.deliveryOption === "office" && formData.office && typeof formData.office === "object"
                    ? formData.office.name || ""
                    : "";
            const officeAddress =
                formData.deliveryOption === "office" && formData.office && typeof formData.office === "object"
                    ? formData.office.fullAddress || ""
                    : "";
            fd.append("officeName", officeName);
            fd.append("officeAddress", officeAddress);

            fd.append("address", JSON.stringify(formData.address));
            fd.append("billingRequired", formData.billingRequired);
            fd.append("billingType", formData.billingType);
            fd.append("billingInfo", JSON.stringify(formData.billingInfo));
            fd.append("companyInfo", JSON.stringify(formData.companyInfo));

            // ✅ Добавяме файловете (crop-натите)
            Object.values(uploadFiles).forEach((files) => {
                files.forEach((file) => {
                    fd.append("files[]", file);
                });
            });

            // Изпращаме към saveOrder.php
            const res = await fetch("http://localhost:8000/saveOrder.php", {
                method: "POST",
                body: fd,
            });

            const data = await res.json();

            if (data.success) {
                setAlert({ type: "success", text: "Поръчката е изпратена успешно!" });
                localStorage.removeItem("cart");
            } else {
                setAlert({ type: "error", text: data.message || "Грешка при изпращане на поръчката." });
            }
        } catch (err) {
            setAlert({
                type: "error",
                text: err.message || "Сървърна грешка. Опитайте по-късно.",
            });
        }
    };

    // Автоматично изчисляване на цената при промяна на deliveryOption
    useEffect(() => {
        if (!formData.deliveryOption) return;
        if (!formData.city || !formData.postCode) return;

        (async () => {
            const result = await calculateShipping(formData, 5, 0, []);
            setShippingPrice(result.price || null);
        })();
    }, [formData.deliveryOption]);

    return (
        <div className="max-w-[600px] mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Завърши поръчка
                </h2>

                {/* Основни полета */}
                <InputField label="Имейл" type="email" name="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Име" name="name" value={formData.name} onChange={handleChange} required />
                <InputField label="Фамилия" name="surname" value={formData.surname} onChange={handleChange} required />
                <InputField label="Телефон" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                {/* Град */}
                <CitySelector formData={formData} setFormData={setFormData} />
                <InputField label="Пощенски код" name="postCode" value={formData.postCode} onChange={handleChange} required />

                {/* Доставка */}
                <DeliveryOptionSelector deliveryOption={formData.deliveryOption} setFormData={setFormData} />

                {/* Офис или адрес */}
                {formData.deliveryOption === "office" && (
                    <OfficeField office={formData.office} cityID={formData.cityID} setFormData={setFormData} />
                )}
                {formData.deliveryOption === "address" && (
                    <AddressFields address={formData.address} cityID={formData.cityID} setFormData={setFormData} />
                )}

                {/* Фактура */}
                <BillingToggle billingRequired={formData.billingRequired} billingType={formData.billingType} setFormData={setFormData} />
                {formData.billingRequired && formData.billingType === "individual" && (
                    <BillingIndividual billingInfo={formData.billingInfo} setFormData={setFormData} />
                )}
                {formData.billingRequired && formData.billingType === "company" && (
                    <BillingCompany companyInfo={formData.companyInfo} setFormData={setFormData} />
                )}

                {/* Цена за доставка */}
                <ShippingPrice shippingPrice={shippingPrice} />

                {/* Съобщения */}
                <AlertBox alert={alert} />

                {/* Submit */}
                <SubmitButton label="Изпрати поръчка" />
            </form>
        </div>
    );
}
