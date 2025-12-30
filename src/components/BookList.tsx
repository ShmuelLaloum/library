import type { Filter, BookProps } from "../types/type";
import BookItem from "./BookItem";
import "../styles/style.css";

function matchesTextFilter(book: BookProps, filterByName: string): boolean {
  if (!filterByName) return true;

  const filter = filterByName.toLowerCase();

  const titleMatch = book.title.toLowerCase().includes(filter);
  const authorMatch = `${book.author.firstName} ${book.author.lastName}`
    .toLowerCase()
    .includes(filter);

  return titleMatch || authorMatch;
}

function matchesGenreFilter(book: BookProps, filterByGenres: string): boolean {
  if (!filterByGenres) return true;

  const genreFilter = filterByGenres.toLowerCase();

  return book.genres.some((genre) =>
    genre.toLowerCase().includes(genreFilter)
  );
}

export default function BookList({
  filterByName,
  filterByGenres,
  books,
}: Filter & { books: BookProps[] }) {
  const filteredBooks = books.filter(
    (book) =>
      matchesTextFilter(book, filterByName) &&
      matchesGenreFilter(book, filterByGenres)
  );

  return (
    <section className="book-list">
      <h1>Books</h1>

      {filteredBooks.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </section>
  );
}
