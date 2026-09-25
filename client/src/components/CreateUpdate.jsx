import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProject.css";
import { API_URL } from "../api";

function CreateUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`${API_URL}/api/projects/${id}/updates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: formData.message,
        user_id: user.id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigate(`/projects/${id}`);
      });
  }

  return (
    <main>
      <h1>New Project Update</h1>

      <p>Add an update to project {id}.</p>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Update</label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Post Update</button>
      </form>
    </main>
  );
}

export default CreateUpdate;
