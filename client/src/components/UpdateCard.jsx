import { Link } from "react-router-dom";
import "./UpdateCard.css";
import { API_URL } from "../api";

function UpdateCard({ id, message, user, createdAt }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  async function handleDelete() {
    const response = await fetch(`${API_URL}/api/updates/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="update-card">
      <p>{message}</p>

      <p>
        <strong>Posted By:</strong> {user}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {createdAt ? new Date(createdAt).toLocaleString() : "No Date"}
      </p>

      {loggedInUser?.role === "Project Manager" && (
        <>
          <Link to={`/updates/${id}/edit`}>
            <button>Edit Update</button>
          </Link>

          <button onClick={handleDelete}>Delete Update</button>
        </>
      )}
    </div>
  );
}

export default UpdateCard;
