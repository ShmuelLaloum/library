import BookList from "../components/BookList";
import MemberList from "../components/MemberList";
import "../styles/style.css";
import { useState } from "react";
import library from "../data/library.json";
import type { BookProps } from "../types/type";
import genres from "../data/genres";
import SearchInput from "../components/SearchInput";
import AddBookDialog from "../components/AddBookDialog";
import FilterByName from "../components/FilterByName";
import FilterByGenres from "../components/FilterByGenres";

type LibraryPageProps = {
  showMembers?: boolean;
  navigateTo: () => void;
};

export default function LibraryPage({
  showMembers = false,
  navigateTo,
}: LibraryPageProps) {
  const [filterByName, setFilterByName] = useState<string>("");
  const [filterByGenres, setFilterByGenres] = useState<string>("");
  const [genresList, setGenresList] = useState<string[]>(genres);
  const [books, setBooks] = useState<BookProps[]>(library.books);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [newGenre, setNewGenre] = useState<string>("");

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
  const filteredBooks = books.filter(
    (book) =>
      FilterByName(book, filterByName) && FilterByGenres(book, filterByGenres)
  );
  const getRightSideClass = () => {
    if (filteredBooks.length === 0) return "right-side-no-book";
    if (filteredBooks.length === 1) return "right-side-one-book";
    return "right-side";
  };
  return (
    <div className="admin-container">
      <h1 className="admin-title">City central library</h1>
      <SearchInput value={filterByName} onChange={setFilterByName} />
      <label>
        Choose a genre:
        <input
          onFocus={() => setFilterByGenres("")}
          list="genres"
          value={filterByGenres}
          onChange={(e) => setFilterByGenres(e.target.value)}
          placeholder="choose a gener"
        />
      </label>
      <datalist id="genres">
        {genresList.map((g) => (
          <option key={g} value={g} />
        ))}
      </datalist>

      <div className="admin-content">
        <div className="left-side">
          <BookList Books={filteredBooks} />
        </div>
        <div className={getRightSideClass()}>
          <div className="action-buttons">
            <button className="button-dynamic" onClick={navigateTo}>
              Switch Page
            </button>
            <button
              className="button-dynamic"
              onClick={() => setShowDialog(true)}
            >
              Add Book
            </button>
          </div>
          {showMembers && <MemberList />}
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
