import type { Filter, BookProps } from "../types/type";
import BookItem from "./BookItem";
import "../styles/style.css";

export default function BookList({ filterByName, filterByGenres, books }: Filter & { books: BookProps[] }) {
  const filteredBooks = books.filter((book) => {  
    const filter = filterByName.toLowerCase();
    const titleMatch = book.title.toLowerCase().startsWith(filter);
    const authorMatch = `${book.author.firstName} ${book.author.lastName}`
      .toLowerCase()
      .startsWith(filter);

    const genreFilter = filterByGenres.toLowerCase();
    const genreMatch = !filterByGenres 
      ? true
      : book.genres.some((genre) =>
          genre.toLowerCase().startsWith(genreFilter)
        );

    return (titleMatch || authorMatch) && genreMatch;
  });

  return (
    <div className="book-list">
      <h1>Books</h1>
      {filteredBooks.map((book) => (
        <BookItem key={book.id} bookId={book.id} books={books}/>
      ))}
    </div>
  );
}
