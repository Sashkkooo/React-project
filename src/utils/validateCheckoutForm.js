// utils/validationUtils.js
export const validateCheckoutForm = (formData) => {
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
