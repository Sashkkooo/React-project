import { useEffect, useState } from "react";

export default function QuarterField({ cityID, setFormData }) {
    const [quarters, setQuarters] = useState([]);
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchQuarters = async () => {
            if (!cityID) return;
            try {
                const response = await fetch("http://localhost:8000/getQuarters.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ countryCode: "BGR", cityID }),
                });
                const result = await response.json();
                setQuarters(result.quarters || result);
            } catch (err) {
                console.error("Грешка при зареждане на кварталите:", err);
            }
        };
        fetchQuarters();
    }, [cityID]);

    const filteredQuarters = quarters.filter((q) =>
        q.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <label className="block text-gray-700 mb-1">Квартал</label>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
                placeholder="Започнете да пишете..."
                className="w-full border rounded-md p-2"
            />

            {showDropdown && query && (
                <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto">
                    {filteredQuarters.map((q) => (
                        <li
                            key={q.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setFormData((prev) => ({
                                    ...prev,
                                    address: { ...prev.address, streetOrQuarter: q.name },
                                }));
                                setQuery(q.name);
                                setShowDropdown(false);
                            }}
                        >
                            {q.name}
                        </li>
                    ))}
                    {filteredQuarters.length === 0 && (
                        <li className="p-2 text-gray-500">Няма съвпадения</li>
                    )}
                </ul>
            )}
        </div>
    );
}
