import type { MemberItemProps } from "../types/type";
import library from "../data/library.json";
import "../styles/style.css";

export default function MemberItem({ MemberId }: MemberItemProps) {
  const member = library.members.find((member) => member.id === MemberId);

  if (!member) {
    return <p>Member not found</p>;
  }

  return (
    <div className="member-card">
      <h3>{member.name}</h3>
      <p>Type: {member.membershipType}</p>
      <ul>
        {member.borrowedBooks.map((borrow) => {
          const book = library.books.find((b) => b.id === borrow.bookId);
          return (
            <li key={borrow.bookId}>
              Book name: {book?.title || "Unknown"}
              <p>Status: {borrow.returnDate ? "Returned" : "Borrowed"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
