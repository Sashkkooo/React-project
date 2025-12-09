export default function InfoBox(props) {
    return (
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
            <span className="text-3xl mr-3">{props.icon}</span>
            <div>
                <h3 className="text-lg font-semibold">{props.title}</h3>
                <p className="text-sm text-gray-700">{props.text}</p>
            </div>
        </div>
    );
}
