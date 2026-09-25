import { Link } from "react-router-dom";
import "./TaskCard.css";
import { API_URL } from "../api";

function TaskCard({ id, title, description, status, assignedTo, dueDate }) {
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleDelete() {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <p>
        <strong>Assigned To:</strong> {assignedTo || "Not Assigned"}
      </p>

      <p>
        <strong>Due Date:</strong> {dueDate || "No Due Date"}
      </p>

      {user?.role === "Project Manager" && (
        <>
          <Link to={`/tasks/${id}/edit`}>
            <button>Edit Task</button>
          </Link>

          <button onClick={handleDelete}>Delete Task</button>
        </>
      )}
    </div>
  );
}

export default TaskCard;
