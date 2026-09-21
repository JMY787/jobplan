import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import UpdateCard from "./UpdateCard";

function ProjectDetails() {
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

    fetch(`http://localhost:3000/api/projects/${id}`)
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
    fetch(`http://localhost:3000/api/projects/${id}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });

    fetch(`http://localhost:3000/api/projects/${id}/updates`)
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

    fetch(`http://localhost:3000/api/projects/${id}`, {
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
        <strong>Start Date:</strong> {project.startDate}
      </p>

      <p>
        <strong>End Date:</strong> {project.endDate}
      </p>
      <Link to={`/projects/${project.id}/edit`}>
        <button>Edit Project</button>
      </Link>
      <button onClick={handleDelete}>Delete Project</button>
      <section>
        <h2>Tasks</h2>

        <Link to={`/projects/${project.id}/tasks/new`}>
          <button>+ New Task</button>
        </Link>

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            assignedTo={task.assignedTo}
            dueDate={task.dueDate}
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
            message={update.message}
            user={update.user}
            createdAt={update.createdAt}
          />
        ))}
      </section>
    </main>
  );
}

export default ProjectDetails;
