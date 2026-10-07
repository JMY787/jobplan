import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProject.css";
import { API_URL } from "../api";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "Pending",
          due_date: data.due_date ? data.due_date.split("T")[0] : "",
        });
      });
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate(-1);
    }
  }

  return (
    <main>
      <h1>Edit Task</h1>

      <p>Update the task information below.</p>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>

          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
}

export default EditTask;
