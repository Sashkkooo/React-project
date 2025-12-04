export function getAspectRatio(product) {
    if (!product) return [{ label: "4:3", value: 4 / 3 }];

    // взимаме parts от product.parts или от options[0].quantity
    const parts = product.parts ?? product.options?.[0]?.quantity;

    if (product.category === "magnets") {
        return [{ label: "1:1", value: 1 }];
    }

    if (product.category === "puzzles") {
        switch (parts) {
            case 4:
            case 9:
            case 16:
                return [{ label: "1:1", value: 1 }]; // квадратни
            case 6:
                return [
                    { label: "2:3", value: 2 / 3 }, // вертикално
                    { label: "3:2", value: 3 / 2 }  // хоризонтално
                ];
            case 12:
                return [
                    { label: "3:4", value: 3 / 4 },
                    { label: "4:3", value: 4 / 3 }
                ];
            case 15:
                return [
                    { label: "3:5", value: 3 / 5 },
                    { label: "5:3", value: 5 / 3 }
                ];
            case 18:
                return [
                    { label: "3:6", value: 3 / 6 },
                    { label: "6:3", value: 6 / 3 }
                ];
            default:
                return [{ label: "4:3", value: 4 / 3 }]; // fallback
        }
    }

    return [{ label: "4:3", value: 4 / 3 }];
}
