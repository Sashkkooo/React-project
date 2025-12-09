export default function AdminTabs({ activeTab, setActiveTab }) {
    const tabs = ["users", "products", "orders"];
    return (
        <div className="flex justify-center gap-4 mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded ${activeTab === tab ? "bg-red-600 text-white" : "bg-gray-200"
                        }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}