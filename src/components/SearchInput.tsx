type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search a book by author or title"
    />
  );
}
