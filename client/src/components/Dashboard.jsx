import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { API_URL } from "../api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  const completedProjects = projects.filter(
    (project) => project.status === "Completed",
  ).length;

  const activeProjects = projects.filter(
    (project) => project.status === "In Progress",
  ).length;

  return (
    <main>
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to JobPlan.</p>
        </div>

        {user?.role === "Project Manager" && (
          <Link to="/projects/new">
            <button>+ New Project</button>
          </Link>
        )}
      </div>

      <section>
        <h2>Project Overview</h2>

        <p>
          <strong>Total Projects:</strong> {projects.length}
        </p>

        <p>
          <strong>Active Projects:</strong> {activeProjects}
        </p>

        <p>
          <strong>Completed Projects:</strong> {completedProjects}
        </p>
      </section>

      <section>
        <h2>Projects</h2>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              address={project.address}
              status={project.status}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
