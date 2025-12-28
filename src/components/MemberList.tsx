import library from "../data/library.json";
import MemberItem from "./MemberItem";
import "../styles/style.css"

export default function MemberList() {
  return (
    <div className="member-list">
      <h1>Members</h1>
      {library.members.map((member) => (
        <MemberItem key={member.id} MemberId={member.id} />
      ))}
    </div>
  );
}
