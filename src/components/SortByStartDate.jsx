/**
 * a Button component to toggle sorting of events by their start date displays the current sort order
 * @param {string} props.sortOrder - the current sort order "asc" or "desc"
 * @param {function} props.onToggleSort - function to call when the sort order is toggled
 * @returns element that displays the buttons current sort order
 */
function SortByStartDate({ sortOrder, onToggleSort }) {
  return (
    <button className="btn btn-outline-primary" onClick={onToggleSort}>
      Sort by Start Date: {sortOrder === "asc" ? "Ascending" : "Descending"}
    </button>
  );
}

export default SortByStartDate;
