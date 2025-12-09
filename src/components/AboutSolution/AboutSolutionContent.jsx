export default function AboutSolutionContent(props) {
    return (
        <div className="mb-5 bg-white rounded-lg shadow p-6">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">{props.title}</h2>
            </div>
            <div className="text-center text-lg">
                <p>
                    {props.paragraph}
                </p>
            </div>
        </div>
    )
}