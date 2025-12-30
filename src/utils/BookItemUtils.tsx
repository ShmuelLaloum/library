import type { Review } from "../types/type";

export function calcAverage(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, r) => acc + r.score, 0);
  return parseFloat((total / reviews.length).toFixed(1));
}
