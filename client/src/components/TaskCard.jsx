import "./TaskCard.css";

function TaskCard({ title, description, status, assignedTo, dueDate }) {
  return (
    <div className="task-card">
      <h3>{title}</h3>

      <p>{description}</p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <p>
        <strong>Assigned To:</strong> {assignedTo}
      </p>

      <p>
        <strong>Due Date:</strong> {dueDate}
      </p>
    </div>
  );
}

export default TaskCard;
