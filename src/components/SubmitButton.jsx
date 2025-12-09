export default function AuthSubmitButton({ label, className }) {
    return (
        <button
            type="submit"
            className={className || "bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition"}
        >
            {label}
        </button>
    );
}
