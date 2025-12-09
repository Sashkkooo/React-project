export async function calculateShipping(formData, totalWeight = 5, totalPrice = 0, adjustedPackingList = []) {
    let shippingData;

    if (formData.deliveryOption === "office" && formData.selectedOffice) {
        shippingData = {
            label: {
                senderClient: { name: "тест", phones: ["0000000000"] },
                senderOfficeCode: "5802",
                receiverClient: { name: formData.name, phones: [formData.phone] },
                 city: { country: { code3: "BGR" }, name: formData.city, postCode: formData.postCode },
                receiverOfficeCode: formData.selectedOffice.code,
                packCount: 1,
                shipmentType: "PACK",
                weight: 5,
                shipmentDescription: "Продукти от поръчката",
            },
            mode: "calculate",
        };

    }

    if (formData.deliveryOption === "address") {
        shippingData = {
            label: {
                senderClient: { name: "тест", phones: ["0000000000"] },
                senderOfficeCode: "5802",
                receiverClient: {
                    name: formData.name + " " + formData.surname,
                    phones: [formData.phone],
                },
                receiverAddress: {
                    city: { country: { code3: "BGR" }, name: formData.city, postCode: formData.postCode },
                    street: formData.address.streetOrQuarter,
                    num: formData.address.num,
                    other: `бл.${formData.address.block}, вх.${formData.address.entrance}, ет.${formData.address.floor}, ап.${formData.address.apartment}`,
                },
                packCount: 1,
                shipmentType: "PACK",
                weight: 5,
                shipmentDescription: "Продукти от поръчката",
            },
            mode: "calculate",
        };
    }
    

    const response = await fetch("http://localhost:8000/calculateShipping.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shippingData),
    });

    return await response.json();
}