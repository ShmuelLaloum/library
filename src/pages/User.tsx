import BookList from "../components/BookList";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { useState } from "react";
import library from "../data/library.json";
import type { BookProps } from "../types/type";
import genres from "../data/genres";
import SearchInput from "../components/searchInput";
import AddBookDialog from "../components/AddBookDialog";

export default function User() {
  const navigate = useNavigate();
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByGenres, setFilterByGenres] = useState<string>("");
  const [genresList, setGenresList] = useState<string[]>(genres);
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
          <>
            <button className="button-dynamic" onClick={handleClick}>
              admin
            </button>
            <button
              className="button-dynamic"
              onClick={() => setShowDialog(true)}
            >
              Add Book
            </button>
          </>
        </div>
      </div>

      {showDialog && (
        <AddBookDialog
          title={newTitle}
          author={newAuthor}
          genre={newGenre}
          onTitleChange={setNewTitle}
          onAuthorChange={setNewAuthor}
          onGenreChange={setNewGenre}
          onAdd={handleAddBook}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
