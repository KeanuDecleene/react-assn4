import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/projects"; //POST endpoint

function ProjectForm({ onProjectCreated }) {
  //state hooks for form fields
  const [projectname, setProjectName] = useState("");
  const [projectdesc, setProjectDesc] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [showForm, setShowForm] = useState(false); //form visibility to be false by default

  /**
   * handles the form submit for creating the new project
   * prevents default form, sends to API, and resets the form and hides it
   * @param {*} e form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      //new project object
      projectname,
      projectdesc,
      startdate,
      enddate,
    };

    try {
      //sends post request to the API using forms data
      const response = await axios.post(API_URL, newProject);
      console.log("Project created:", response.data);

      //refreshes the project list
      onProjectCreated();

      //resets form
      setProjectName("");
      setProjectDesc("");
      setStartDate("");
      setEndDate("");
      setShowForm(false); //hides form
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="mt-1">
      <div className="d-flex justify-content-center">
        <button //
          className="btn btn-primary mt-1 btn-lg rounded-pill"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create Project"}
        </button>
      </div>

      {/*only renders when showform is set to true */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card p-4 mt-2 bg-light shadow">
          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              className="form-control"
              value={projectname}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Project Description</label>
            <textarea
              className="form-control"
              value={projectdesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Project
          </button>
        </form>
      )}
    </div>
  );
}

export default ProjectForm;
