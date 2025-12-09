import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { validateCheckoutForm } from "../../utils/validateCheckoutForm";
import { submitOrder } from "../../utils/submitOrderUtil";
import InputField from "./InputField";
import AddressFields from "./AddressFields"
import CitySelector from "./CitySelector";
import DeliveryOptionSelector from "./DeliveryOptionSelector";
import OfficeField from "./OfficeField";
import BillingToggle from "./BillingToggle";
import BillingIndividual from "./BillingIndividual";
import BillingCompany from "./BillingCompany";
import ShippingPrice from "./ShippingPrice";
import AlertBox from "./AlertBox";
import SubmitButton from "./SubmitButton";
import { calculateShipping } from "../../utils/shippingPriceUtil";


export default function Checkout() {
    const location = useLocation();
    const uploadFiles = location.state?.uploadFiles || {};
    const finalPrice = location.state?.finalPrice || 0;
    const navigate = useNavigate();

    const [alert, setAlert] = useState(null);
    const [shippingPrice, setShippingPrice] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        surname: "",
        phone: "",
        city: "",
        cityID: null,
        postCode: "",
        deliveryOption: "",
        office: null,
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
        billingInfo: {
            city: "",
            postCode: "",
            streetOrQuarter: "",
            num: "",
        },
        companyInfo: {
            companyName: "",
            companyEIK: "",
            companyCity: "",
            companyAddress: "",
            companyMOL: "",
            companyVAT: "no",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateCheckoutForm(formData);
        if (error) {
            setAlert({ type: "error", text: error });
            return;
        }

        try {
            setAlert({ type: "loading", text: "Изпращане на поръчката..." });
            const data = await submitOrder(formData, uploadFiles, finalPrice);

            if (data.success) {
                localStorage.removeItem("cart");
                navigate("/order-success");
            } else {
                setAlert({ type: "error", text: data.message || "Грешка при изпращане на поръчката." });
            }
        } catch (err) {
            setAlert({ type: "error", text: err.message || "Сървърна грешка. Опитайте по-късно." });
        }
    };

    useEffect(() => {
        const fetchShipping = async () => {
            try {
                const result = await calculateShipping(formData);
                const price =
                    result.price ||
                    result.total ||
                    result.calculatedPrice ||
                    result.calculations?.[0]?.total ||
                    null;
                setShippingPrice(price);
            } catch (err) {
                console.error("Грешка при калкулация на доставка:", err);
                setShippingPrice(null);
            }
        };

        // 👉 чакаме да има избран офис, ако е "office"
        if (formData.deliveryOption === "office" && formData.selectedOffice?.code) {
            fetchShipping();
        }

        // 👉 ако е "address", може да извика веднага
        if (formData.deliveryOption === "address") {
            fetchShipping();
        }
    }, [formData.deliveryOption, formData.cityID, formData.postCode, formData.selectedOffice]);


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
