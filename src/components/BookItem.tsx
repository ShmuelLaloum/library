import type { BookItemProps } from "../types/type";
import "../styles/style.css";
import { useState } from "react";
import Reviews from "./Reviews";
import AddReviewDialog from "./AddReviewDialog";
import { calcAverage } from "../utils/BookItemUtils";

export default function BookItem({ book }: BookItemProps) {
  const [reviews, setReviews] = useState(book.ratings.reviews);
  const [average, setAverage] = useState(calcAverage(book.ratings.reviews));
  const [showReviews, setShowReviews] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [newUser, setNewUser] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newScore, setNewScore] = useState<number | "">(5);
  const [read, setRead] = useState(book.read);

  const handleCheckboxChange = () => {
    setRead((prev) => !prev);
  };

  const handleAddReview = () => {
    if (!newUser || !newComment || newScore === "") return;

    const newReview = {
      user: newUser,
      comment: newComment,
      score: Number(newScore),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    setAverage(calcAverage(updatedReviews));

    setShowDialog(false);
    setNewUser("");
    setNewComment("");
    setNewScore(5);
  };

  return (
    <div className="book-card">
      <div className="book-header">
        <h3>{book.title}</h3>
        <p className="author">
          {book.author.firstName} {book.author.lastName}
        </p>
      </div>

      <div className="details-row">
        <span className="genres">{book.genres.join(", ")}</span>

        <span className={`status ${read ? "read" : "not-read"}`}>
          {read ? "Read" : "Not read"}
          <input
            type="checkbox"
            checked={read}
            onChange={handleCheckboxChange}
          />
        </span>

        <span className="rating">{average}⭐</span>
      </div>

      <div className="reviews-section">
        <button
          className="button-dynamic"
          onClick={() => setShowReviews((prev) => !prev)}
        >
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>

        {showReviews && (
          <Reviews
            reviews={reviews}
            onAddReviewClick={() => setShowDialog(true)}
          />
        )}

        {showDialog && (
          <AddReviewDialog
            newUser={newUser}
            newComment={newComment}
            newScore={newScore}
            onUserChange={setNewUser}
            onCommentChange={setNewComment}
            onScoreChange={setNewScore}
            onAdd={handleAddReview}
            onClose={() => setShowDialog(false)}
          />
        )}
      </div>
    </div>
  );
}
