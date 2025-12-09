// components/Product/ReviewList.jsx
export default function ReviewList({
    reviews,
    loggedUserId,
    userRole,
    token,
    newReview,
    setNewReview,
    handleAddReview,
    handleEditReview,
    handleDeleteReview,
}) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            {reviews.map((rev) => (
                <div
                    key={rev._id}
                    className="bg-gray-50 border p-4 rounded-lg mb-3 shadow-sm"
                >
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">
                            {rev.author}
                            {rev.userId === loggedUserId && (
                                <span className="ml-2 text-green-600 text-xs font-bold">(You)</span>
                            )}
                            {userRole === "admin" && rev.userId !== loggedUserId && (
                                <span className="ml-2 text-red-600 text-xs font-bold">[Admin]</span>
                            )}
                        </p>
                        {rev.createdAt && (
                            <span className="text-xs text-gray-500">
                                {new Date(rev.createdAt.$date || rev.createdAt).toLocaleString("bg-BG", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        )}
                    </div>
                    <p className="mt-2 text-gray-700">{rev.text}</p>
                    <div className="mt-2 flex gap-2">
                        {rev.userId === loggedUserId && (
                            <button
                                className="text-blue-600 text-sm hover:underline"
                                onClick={() => handleEditReview(rev._id.$oid || rev._id)}
                            >
                                Edit
                            </button>
                        )}
                        {userRole === "admin" && (
                            <button
                                className="text-red-600 text-sm hover:underline"
                                onClick={() => handleDeleteReview(rev._id.$oid || rev._id)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {token ? (
                <div className="mt-4">
                    <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring focus:ring-green-300"
                        placeholder="Write your review..."
                    />
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700 transition"
                        onClick={handleAddReview}
                    >
                        Add Review
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 mt-2">
                    Трябва да сте логнат, за да оставите ревю.
                </p>
            )}
        </div>
    );
}
