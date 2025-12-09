export default function HomeProductBanner(props) {
    return (
        <div className="h-[400px] min-w-[300px] flex-1 rounded-lg shadow-lg bg-cover 
        bg-center flex items-end mb-8 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl"
            style={{ backgroundImage: `url('${props.imageUrl}')`, backgroundSize: 'cover' }}>
            <div className="bg-black/50 p-3 w-full text-white">
                <h3 className="text-xl font-semibold">{props.title}</h3>
                <p className="text-sm">{props.description}</p>
            </div>
        </div>
    );
}