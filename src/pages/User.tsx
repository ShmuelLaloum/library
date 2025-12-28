import BookList from "../components/BookList";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { useState } from "react";
import library from "../data/library.json"; 
import type { BookProps } from "../types/type";

export default function Admin() {
  const navigate = useNavigate();
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByGenres, setFilterByGenres] = useState<string>("");
  const [books, setBooks] = useState<BookProps[]>(library.books); 

  
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [newGenre, setNewGenre] = useState<string>("");

  const handleClick = () => navigate("/admin");

  const handleAddBook = () => {
    if (!newTitle || !newAuthor || !newGenre) return; 

    const authorParts = newAuthor.split(" "); 
    const firstName = authorParts[0];
    const lastName = authorParts.slice(1).join(" ") || "";

    const newBook = {
      id: books.length + 1,
      title: newTitle,
      author: {
        firstName,
        lastName,
        birthYear: 2000, 
      },
      genres: [newGenre],
      read: false,
      ratings: {
        average: 0,
        reviews: [],
      },
    };

    setBooks([...books, newBook]);

    setNewTitle("");
    setNewAuthor("");
    setNewGenre("");
    setShowDialog(false);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">City central library</h1>

      <input
        type="text"
        value={filterByName}
        onChange={(e) => setFilterByName(e.target.value)}
        placeholder="Search a book by author or title"
      />

      <label>
        Choose a genre:
        <input
          list="genres"
          value={filterByGenres}
          onChange={(e) => setFilterByGenres(e.target.value)}
          placeholder="filter by a genre"
        />
      </label>

      <datalist id="genres">
        <option value="Fantasy" />
        <option value="Adventure" />
        <option value="Political Fiction" />
        <option value="Classic" />
      </datalist>

      <div className="admin-content">
        <div className="left-side">
          <BookList
            filterByName={filterByName}
            filterByGenres={filterByGenres}
            books={books} 
          />
        </div>

        <div className="right-side">
          <div className="admin-buttons">
            <button className="button-dynamic" onClick={handleClick}>
              admin
            </button>
            <button className="button-dynamic" onClick={() => setShowDialog(true)}>
              Add Book
            </button>
          </div>

        </div>
      </div>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h4>Add a Book</h4>
            <input
              type="text"
              placeholder="Book Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author Name"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Genre"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
            />
            <div className="dialog-buttons">
              <button className="button-dynamic" onClick={handleAddBook}>
                Add
              </button>
              <button className="button-dynamic" onClick={() => setShowDialog(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
