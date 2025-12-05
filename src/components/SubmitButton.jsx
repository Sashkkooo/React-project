export default function SubmitButton({ label = "Изпрати поръчка", disabled = false }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`w-full py-3 px-4 rounded-md font-semibold text-lg transition 
        ${disabled
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"}`}
        >
            {label}
        </button>
    );
}
