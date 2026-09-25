import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { API_URL } from "../api";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  return (
    <main>
      <h1>Projects</h1>

      <p>View and manage all construction projects.</p>

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
    </main>
  );
}

export default Projects;
