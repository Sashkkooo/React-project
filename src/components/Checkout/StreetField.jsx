import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function StreetField({ cityID, setFormData }) {
    const [streets, setStreets] = useState([]);
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        const fetchStreets = async () => {
            if (!cityID) return;
            try {
                const response = await fetch("http://localhost:8000/getStreets.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ countryCode: "BGR", cityID }),
                });
                const result = await response.json();
                setStreets(result.streets || result);
            } catch (err) {
                console.error("Грешка при зареждане на улиците:", err);
            }
        };
        fetchStreets();
    }, [cityID]);

    const filteredStreets = streets.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <label className="block text-gray-700 mb-1">{t("street")}</label>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
                placeholder={t("start_write")}
                className="w-full border rounded-md p-2"
            />

            {showDropdown && query && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                    {filteredStreets.map((s) => (
                        <li
                            key={s.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, streetOrQuarter: s.name },
                                }));
                                setQuery(s.name);
                                setShowDropdown(false);
                            }}
                        >
                            {s.name}
                        </li>
                    ))}
                    {filteredStreets.length === 0 && (
                        <li className="p-2 text-gray-500">Няма съвпадения</li>
                    )}
                </ul>
            )}
        </div>
    );
}
