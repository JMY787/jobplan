import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/projects")
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
