import type { BookItemProps, Review } from "../types/type";
import "../styles/style.css";
import { useState } from "react";

export default function BookItem({ book }: BookItemProps) {
  const [reviews, setReviews] = useState<Review[]>(book.ratings.reviews);
  const [average, setAverage] = useState<number>(book.ratings.average);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [newScore, setNewScore] = useState<number | "">(5);
  const [read, setRead] = useState<boolean>(book.read);

  const handleCheckboxChange = () => {
    setRead(!read);
  };

  const handleAddReview = () => {
    if (!newUser || !newComment || newScore === "") return;

    const newReview: Review = {
      user: newUser,
      comment: newComment,
      score: Number(newScore),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);

    const newAverage =
      updatedReviews.reduce((acc, r) => acc + r.score, 0) /
      updatedReviews.length;

    setAverage(parseFloat(newAverage.toFixed(1)));

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
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>

        {showReviews && (
          <div className="reviews-content">
            <div className="reviews-row">
              {reviews.map((rev, idx) => (
                <div key={idx} className="review-item">
                  <strong>{rev.user}</strong>: {rev.comment} ({rev.score}⭐)
                </div>
              ))}
            </div>

            <button
              className="button-dynamic"
              onClick={() => setShowDialog(true)}
            >
              Add Review
            </button>
          </div>
        )}

        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog">
              <h4>Add a review</h4>
              <input
                type="text"
                placeholder="Your name"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <textarea
                placeholder="Your review"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <input
                type="number"
                min={1}
                max={5}
                value={newScore}
                onChange={(e) => setNewScore(Number(e.target.value))}
              />
              <div className="dialog-buttons">
                <button onClick={handleAddReview} className="button-dynamic">
                  Add
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="button-dynamic"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
