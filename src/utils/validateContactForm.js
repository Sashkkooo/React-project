export const validateContactForm = (formData) => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
        return "Please fill in all required fields.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        return "Invalid email address.";
    }
    if (formData.number) {
        const phoneRegex = /^(0\d{9}|\+359\d{9})$/;
        if (!phoneRegex.test(formData.number)) {
            return "Phone must be 10 digits starting with 0 (e.g. 0877777777) or +359 followed by 9 digits (e.g. +359877777777).";
        }
    }
    return null;
};
