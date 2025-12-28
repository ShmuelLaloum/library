import { useState } from "react";
import type { BookReviewModalProps } from "../types/type";

export default function BookReviewModal({ members }: BookReviewModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="review-btn" onClick={() => setOpen(!open)}>
        {open ? "Close reviews" : "View reviews"}
      </button>

      {open && (
        <div className="reviews-section">
          {members.map((r) => (
            <p key={r.user}>
              {r.user}: {r.comment} {r.score}⭐
            </p>
          ))}
        </div>
      )}
    </>
  );
}
