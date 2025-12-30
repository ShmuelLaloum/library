export type BorrowedBook = {
  bookId: number;
  borrowedDate: string;
  returnDate: string | null;
};

export type Member = {
  id: number;
  name: string;
  membershipType: string;
  borrowedBooks: BorrowedBook[];
};

export type MemberItemProps = {
  member: Member;
};

export type BookItemProps = {
  book: BookProps;
};
export type BookReviewModal = {
  user: string;
  score: number;
  comment: string;
};
export type BookReviewModalProps = {
  members: BookReviewModal[];
};
export type Review = {
  user: string;
  score: number;
  comment: string;
};
export type BookProps = {
  id: number;
  title: string;
  author: {
    firstName: string;
    lastName: string;
    birthYear: number;
  };
  genres: string[];
  read: boolean;
  ratings: {
    average: number;
    reviews: ReviewProps[];
  };
};
export type ReviewProps = {
  user: string;
  score: number;
  comment: string;
};

export type Filter = {
  filterByName: string;
  filterByGenres: string;
  books?: BookProps[];
};
