/**
 * SearchBar component for filtering projects by name.
 *
 * @param {string} props.searchQuery - the current search query.
 * @param {function} props.onSearchChange - function to call when the search query changes.
 * @returns
 */
function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search projects by name..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default SearchBar;
