'use client'
import React, { useState, useEffect } from "react";
import "@/public/assets/css/new/ReviewsList.css";
import { useParams } from "next/navigation";

export default function ReviewsList() {
    const productId = useParams();
    const [reviews, setReviews] = useState([]);
    const [deletingId, setDeletingId] = useState(null); // Track which review is being deleted

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`/api/review?product_id=${productId.id}`);
                const data = await response.json();
                setReviews(data);
            } catch (err) {
                console.error("Error fetching reviews:", err.message);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleDelete = async (reviewId) => {
        setDeletingId(reviewId); // Set deleting state for the button
        try {
            const response = await fetch(`/api/review?review_id=${reviewId}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setReviews((prevReviews) => prevReviews.filter(review => review.id !== reviewId));
        } catch (err) {
            console.error("Error deleting review:", err.message);
        } finally {
            setDeletingId(null); // Reset deleting state after deletion
        }
    };

    return (
        <div className="reviews-container">
            <h2 className="reviews-title">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p className="no-reviews">No reviews available.</p>
            ) : (
                <ul className="reviews-list">
                    {reviews.map(review => (
                        <li key={review.id} className="review-item">
                            <div className="review-content">
                                <p className="review-text">{review.review}</p>
                                <p className="review-author">- {review.reviewerName}</p>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(review.id)}
                                disabled={deletingId === review.id} // Disable button when deleting
                            >
                                {deletingId === review.id ? "Deleting..." : "Delete"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
