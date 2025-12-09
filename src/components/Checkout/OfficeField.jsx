import { useEffect, useState } from "react";

export default function OfficeField({ office, cityID, setFormData }) {
    const [offices, setOffices] = useState([]);
    const [officeQuery, setOfficeQuery] = useState("");
    const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);

    useEffect(() => {
        const fetchOffices = async () => {
            if (!cityID) return;
            try {
                const response = await fetch("http://localhost:8000/getOffices.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ countryCode: "BGR", cityID }),
                });
                const result = await response.json();
                const list = (result.offices || result).map((o) => ({
                    ...o,
                    fullAddress: o.address?.fullAddress || `${o.name} – ${o.city?.name || ""}`,
                }));
                setOffices(list);
            } catch (err) {
                console.error("Грешка при зареждане на офисите:", err);
            }
        };
        fetchOffices();
    }, [cityID]);

    const filteredOffices = offices.filter((o) =>
        o.fullAddress.toLowerCase().includes(officeQuery.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <label className="block text-gray-700 mb-1">Офис на Еконт</label>
            <input
                type="text"
                value={officeQuery}
                onChange={(e) => {
                    setOfficeQuery(e.target.value);
                    setShowOfficeDropdown(true);
                }}
                placeholder="Започнете да пишете..."
                className="w-full border rounded-md p-2"
            />

            {showOfficeDropdown && officeQuery && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                    {filteredOffices.map((o) => (
                        <li
                            key={o.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    office: {
                                        name: o.name,
                                        fullAddress: o.fullAddress,
                                    },
                                    selectedOffice: {
                                        id: o.id,
                                        code: o.code,
                                        name: o.name,
                                        city: o.city,
                                        fullAddress: o.fullAddress,
                                    },
                                }));
                                setOfficeQuery(o.fullAddress); // показваме целия адрес
                                setShowOfficeDropdown(false);  // скриваме списъка
                            }}
                        >
                            {o.fullAddress}
                        </li>
                    ))}
                    {filteredOffices.length === 0 && (
                        <li className="p-2 text-gray-500">Няма съвпадения</li>
                    )}
                </ul>
            )}
        </div>
    );
}
