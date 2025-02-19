import { useState } from "react";
import Link from "next/link";

export default function ReviewForm({product_id}) {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [name, setName] = useState("");
    const [success, setSuccess] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id,
                    rating,
                    review,
                    reviewerName: name,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setSuccess("Review Submitted Successfully");
                setReview("");
                setName("");
                setRating(0);
            } else {
                setSuccess("Something went wrong");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="product-details-comment">
            <div className="comment-title mb-20">
                <h3>Add a review</h3>
                <p>Your email address will not be published. Required fields are marked*</p>
            </div>
            <div className="comment-rating mb-20 d-flex">
                <span>Overall ratings</span>
                <ul>
                {[...Array(5)].map((_, i) => (
                        <li key={i}>
                            <button
                                type="button"
                                className={i < rating ? "fas fa-star" : "fal fa-star"}
                                onClick={() => setRating(i + 1)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="comment-input-box">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="comment-input">
                                <textarea
                                    placeholder="Your review..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-xxl-6">
                            <div className="comment-input">
                                <input
                                    type="text"
                                    placeholder="Your Name*"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-xxl-12">
                            <div className="comment-submit">
                                <button type="submit" className="tp-btn pro-submit">Submit</button>
                            </div>
                            {success &&
                            <div className="mt-4 text-success fw-semibold">
                                <h4>{success}</h4>
                            </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
