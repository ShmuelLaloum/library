type AddBookDialogProps = {
  title: string;
  author: string;
  genre: string;
  onTitleChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
};

export default function AddBookDialog({
  title,
  author,
  genre,
  onTitleChange,
  onAuthorChange,
  onGenreChange,
  onAdd,
  onCancel,
}: AddBookDialogProps) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h4>Add a Book</h4>

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
        />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => onGenreChange(e.target.value)}
        />

        <div className="dialog-buttons">
          <button className="button-dynamic" onClick={onAdd}>
            Add
          </button>
          <button className="button-dynamic" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
