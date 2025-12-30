interface AddReviewDialogProps {
  newUser: string;
  newComment: string;
  newScore: number | "";
  onUserChange: (val: string) => void;
  onCommentChange: (val: string) => void;
  onScoreChange: (val: number) => void;
  onAdd: () => void;
  onClose: () => void;
}

export default function AddReviewDialog({
  newUser,
  newComment,
  newScore,
  onUserChange,
  onCommentChange,
  onScoreChange,
  onAdd,
  onClose,
}: AddReviewDialogProps) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h4>Add a review</h4>
        <input
          type="text"
          placeholder="Your name"
          value={newUser}
          onChange={(e) => onUserChange(e.target.value)}
        />
        <textarea
          placeholder="Your review"
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <input
          type="number"
          min={1}
          max={5}
          value={newScore}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val < 1) val = 1;
            if (val > 5) val = 5;
            onScoreChange(val);
          }}
        />

        <div className="dialog-buttons">
          <button onClick={onAdd} className="button-dynamic">
            Add
          </button>
          <button onClick={onClose} className="button-dynamic">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
