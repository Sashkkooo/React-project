export default function InputField({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
    pattern,
}) {
    return (
        <div className="w-full">
            <label className="block text-white-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                pattern={pattern}
                className="w-full border border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>
    );
}
