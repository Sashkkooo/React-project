export default function HomeProductBenefits(props) {
    return (
        <li className="text-lg mb-3 flex items-center gap-2">
            <span className="text-2xl">{props.icon}</span>
            {props.text}
        </li>
    );
}