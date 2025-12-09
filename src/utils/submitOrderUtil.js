// utils/checkoutService.js
import { calculateShipping } from "./shippingPriceUtil";

export const submitOrder = async (formData, uploadFiles, finalPrice) => {
    // Изчисляване на доставка
    const result = await calculateShipping(formData, 5, 0, []);
    const shipping = result.price || 0;

    // Вземаме cart от localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0);

    // Създаваме FormData
    const fd = new FormData();
    fd.append("userId", localStorage.getItem("userId") || "guest");
    fd.append("cart", JSON.stringify(cart));
    fd.append("totalPrice", finalPrice);
    fd.append("shippingPrice", shipping);

    // Данни от формата
    fd.append("email", formData.email);
    fd.append("name", formData.name);
    fd.append("surname", formData.surname);
    fd.append("phone", formData.phone);
    fd.append("city", formData.city);
    fd.append("cityID", formData.cityID || "");
    fd.append("postCode", formData.postCode);
    fd.append("deliveryOption", formData.deliveryOption);

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

    // Файлове
    Object.values(uploadFiles).forEach((files) => {
        files.forEach((file) => {
            fd.append("files[]", file);
        });
    });

    // Fetch към бекенда
    const res = await fetch("http://localhost:8000/saveOrder.php", {
        method: "POST",
        body: fd,
    });

    return res.json();
};
