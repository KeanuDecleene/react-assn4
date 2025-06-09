import SearchBar from "./SearchBar";
import SortByStartDate from "./SortByStartDate";

/**
 * a table component that displays a list of projects with sorting, searching, and deletion
 * @param {Array} props.projects - array of project objects to display
 * @param {function} props.onDelete - function to call when a project is deleted
 * @param {string} props.searchQuery - the current search query for filtering projects
 * @param {function} props.onSearchChange - function to call when the search query changes
 * @param {string} props.sortOrder - the current sort order for sorting projects by start date
 * @param {function} props.onToggleSort - function to call when the sort order is toggled
 * @returns JSX element of the project list table
 */
const ProjectListTable = ({
  projects,
  onDelete,
  searchQuery,
  onSearchChange,
  sortOrder,
  onToggleSort,
}) => {
  return (
    <div className="card bg-dark mt-4 shadow rounded ">
      <div className="card-body rounded-3 bg-dark ">
        <h3 className="mb-4 text-center text-white">Project List</h3>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="me-3 flex-grow-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>
          <div>
            <SortByStartDate
              sortOrder={sortOrder}
              onToggleSort={onToggleSort}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Project Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectname}</td>
                  <td>{project.startdate}</td>
                  <td>{project.enddate}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/*if no projects match send msg to user*/}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectListTable;
