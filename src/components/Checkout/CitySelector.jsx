import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CitySelector({ formData, setFormData }) {
    const [cities, setCities] = useState([]);
    const [cityQuery, setCityQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch("http://localhost:8000/getCities.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ countryCode: "BGR" }),
                });
                const result = await response.json();
                setCities(result.cities || result);
            } catch (err) {
                console.error("Грешка при зареждане на градовете:", err);
            }
        };

        fetchCities();
    }, []);

    const filteredCities = cities.filter((c) =>
        c.name.toLowerCase().includes(cityQuery.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <label className="block text-gray-700 mb-1">{t("city")}</label>
            <input
                type="text"
                value={cityQuery}
                onChange={(e) => {
                    setCityQuery(e.target.value);
                    setShowDropdown(true);
                }}
                placeholder={t("start_write")}
                className="w-full border rounded-md p-2"
            />

            {showDropdown && cityQuery && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                    {filteredCities.map((c) => (
                        <li
                            key={c.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    city: c.name,
                                    cityID: c.id,
                                    postCode: c.postCode,
                                }));
                                setCityQuery(c.name);
                                setShowDropdown(false);
                            }}
                        >
                            {c.name}
                        </li>
                    ))}
                    {filteredCities.length === 0 && (
                        <li className="p-2 text-gray-500">{t("city_load")}</li>
                    )}
                </ul>
            )}
        </div>
    );
}
