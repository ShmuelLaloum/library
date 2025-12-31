import type { BooksProps } from "../types/type";
import BookItem from "./BookItem";
import "../styles/style.css";

export default function BookList({ Books }:BooksProps) {
  return (
    <section className="book-list">
      <h1>Books</h1>

      {Books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </section>
  );
}
