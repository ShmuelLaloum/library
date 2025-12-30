import BookList from "../components/BookList";
import MemberList from "../components/MemberList";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { useState } from "react";
import library from "../data/library.json";
import type { BookProps } from "../types/type";
import genres from "../data/genres";
import SearchInput from "../components/searchInput";

export default function Admin() {
  const navigate = useNavigate();
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByGenres, setFilterByGenres] = useState<string>("");
  const [genresList, setGenresList] = useState<string[]>(genres);
  const [books, setBooks] = useState<BookProps[]>(library.books);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [newGenre, setNewGenre] = useState<string>("");

  const handleClick = () => navigate("/");

  const handleAddBook = () => {
    if (!newTitle || !newAuthor || !newGenre) return;

    const authorParts = newAuthor.split(" ");
    const firstName = authorParts[0];
    const lastName = authorParts.slice(1).join(" ") || "";

    if (!genresList.includes(newGenre)) {
      setGenresList([...genresList, newGenre]);
    }

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

      <SearchInput value={filterByName} onChange={setFilterByName} />

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
        {genresList.map((genre) => (
          <option key={genre} value={genre} />
        ))}
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
          <div className="action-buttons">
            <button className="button-dynamic" onClick={handleClick}>
              user
            </button>
            <button
              className="button-dynamic"
              onClick={() => setShowDialog(true)}
            >
              Add Book
            </button>
          </div>

          <MemberList />
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
              <button
                className="button-dynamic"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
