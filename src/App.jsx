import { useState, useEffect } from "react";
import axios from "axios";

import ProjectForm from "./components/ProjectForm.jsx";
import Title from "./components/Title.jsx";
import ProjectListTable from "./components/ProjectListTable.jsx";

const API_URL = "http://localhost:3000/projects";

/**
 *Main app that handles fetching, searching, sorting, deleting and adding projects.
 * @returns JSX element of the app
 */
function App() {
  const [projects, setProjects] = useState([]); //state for all projects fetched
  const [searchQuery, setSearchQuery] = useState(""); //state for current search query
  const [sortOrder, setSortOrder] = useState("asc"); //state for sort order

  //filters and sorts projects based on search input and sort button
  const filteredProjects = projects
    .filter((project) =>
      project.projectname?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.startdate);
      const dateB = new Date(b.startdate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  //load projects from api on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  /**
   * fetches projects from the API and updates the state
   */
  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  /**
   * deletes a project by its ID from the API and updates the state
   *
   * @param {*} id to use to delete selected project
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  /**
   * toggles the sort order between ascending and descending
   */
  const handleToggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="container">
      <Title />
      {/*projects list table with search, sort and delete handlers*/}
      <ProjectListTable
        projects={filteredProjects}
        onDelete={handleDelete}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onToggleSort={handleToggleSort}
      />
      <ProjectForm onProjectCreated={fetchProjects} />
    </div>
  );
}

export default App;
