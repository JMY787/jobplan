import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProject.css";
import { API_URL } from "../api";

function EditUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/updates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message || "");
      });
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(`${API_URL}/api/updates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      navigate(-1);
    }
  }

  return (
    <main>
      <h1>Edit Update</h1>

      <p>Update the project update below.</p>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </main>
  );
}

export default EditUpdate;
