import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ id, name, address, status }) {
  return (
    <Link to={`/projects/${id}`} className="project-card-link">
      <div className="project-card">
        <h2>{name}</h2>
        <p className="project-address">{address}</p>
        <p className="project-status">Status: {status}</p>
      </div>
    </Link>
  );
}

export default ProjectCard;