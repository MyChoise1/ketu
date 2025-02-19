import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReviewsList({ productId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/review?product_id=${productId}`);
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                console.error("Error fetching reviews:", err.message);
            }
        };

        fetchReviews();
    }, [productId]);

    return (
        <div className="reviews-section">
            {reviews ? reviews.slice(-5).map((review, index) => (
                <div key={index} className="comments-box d-flex">
                    <div className="comments-avatar mr-10">
                        <img src="/assets/img/icon/user.png" alt="" height={30} />
                    </div>
                    <div className="comments-text">
                        <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                            <div className="avatar-name">
                                <b className="text-capitalize">{review.reviewerName}</b>
                                <p className="mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                                <div className="comments-date mb-15 mt-2">
                                    <span>{review.review}</span>
                                </div>
                            </div>
                            <div className="user-rating">
                                <ul>
                                    {[...Array(5)].map((_, i) => (
                                        <li key={i}>
                                            <Link href="#">
                                                <i className={i < review.rating ? "fas fa-star" : "fal fa-star"} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className="m-0">{review.text}</p>
                    </div>
                </div>
            )):
            "No review found"}
        </div>
    );
}
