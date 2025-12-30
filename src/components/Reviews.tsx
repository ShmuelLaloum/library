import type { Review } from "../types/type";

interface ReviewsProps {
  reviews: Review[];
  onAddReviewClick: () => void;
}

export default function Reviews({ reviews, onAddReviewClick }: ReviewsProps) {
  return (
    <div className="reviews-content">
      <div className="reviews-row">
        {reviews.map((rev, idx) => (
          <div key={`${rev.user}-${rev.comment}-${idx}`} className="review-item">
            <strong>{rev.user}</strong>: {rev.comment} ({rev.score}⭐)
          </div>
        ))}
      </div>
      <button className="button-dynamic" onClick={onAddReviewClick}>
        Add Review
      </button>
    </div>
  );
}
