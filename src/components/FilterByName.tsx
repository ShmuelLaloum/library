import type { BookProps } from "../types/type";
export default function FilterByName(book: BookProps, filterByName: string): boolean {
  if (!filterByName) return true;

  const filter = filterByName.toLowerCase();

  const titleMatch = book.title.toLowerCase().includes(filter);
  const authorMatch = `${book.author.firstName} ${book.author.lastName}`
    .toLowerCase()
    .includes(filter);

  return titleMatch || authorMatch;
}