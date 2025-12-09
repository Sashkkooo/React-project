export default function AlertBox({ alert }) {
    if (!alert) return null;

    let styles = "";
    switch (alert.type) {
        case "success":
            styles = "bg-green-100 border border-green-200 text-green-800";
            break;
        case "error":
            styles = "bg-red-100 border border-red-200 text-red-800";
            break;
        case "loading":
            styles = "bg-gray-100 border border-gray-300 text-gray-800";
            break;
        default:
            styles = "bg-gray-100 border border-gray-300 text-gray-800";
    }

    return (
        <div className={`rounded p-3 text-center ${styles}`}>
            {alert.text}
        </div>
    );
}
