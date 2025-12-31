import type { BookProps } from "../types/type";
export default function FilterByGenres(book: BookProps, filterByGenres: string): boolean {
  if (!filterByGenres) return true;

  const genreFilter = filterByGenres.toLowerCase();

  return book.genres.some((genre) =>
    genre.toLowerCase().includes(genreFilter)
  );
}