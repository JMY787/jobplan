import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import UpdateCard from "./UpdateCard";
import { API_URL } from "../api";

function ProjectDetails() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${API_URL}/api/projects/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }

        return response.json();
      })
      .then((data) => {
        setProject(data);
      })
      .catch((error) => {
        setError(error.message);
        setProject(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects/${id}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });

    fetch(`${API_URL}/api/projects/${id}/updates`)
      .then((response) => response.json())
      .then((data) => {
        setUpdates(data);
      });
  }, [id]);

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/projects");
      });
  }

  if (loading) {
    return (
      <main>
        <h1>Loading Project...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>{error}</h1>
        <Link to="/projects">Back to Projects</Link>
      </main>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <main>
      <h1>{project.name}</h1>

      <p>{project.address}</p>

      <p>
        <strong>Status:</strong> {project.status}
      </p>

      <p>
        <strong>Description:</strong> {project.description}
      </p>

      <p>
        <strong>Start Date:</strong> {project.start_date}
      </p>

      <p>
        <strong>End Date:</strong> {project.end_date}
      </p>

      {user?.role === "Project Manager" && (
        <>
          <Link to={`/projects/${id}/edit`}>
            <button>Edit Project</button>
          </Link>

          <button onClick={handleDelete}>Delete Project</button>
        </>
      )}

      <section>
        <h2>Tasks</h2>

        {user?.role === "Project Manager" && (
          <Link to={`/projects/${project.id}/tasks/new`}>
            <button>+ New Task</button>
          </Link>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            assignedTo={task.assigned_to}
            dueDate={task.due_date}
          />
        ))}
      </section>

      <section>
        <h2>Project Updates</h2>

        <Link to={`/projects/${project.id}/updates/new`}>
          <button>+ New Update</button>
        </Link>

        {updates.map((update) => (
          <UpdateCard
            key={update.id}
            id={update.id}
            message={update.message}
            user={update.user || "JobPlan User"}
            createdAt={update.created_at}
          />
        ))}
      </section>
    </main>
  );
}

export default ProjectDetails;
