import "./UpdateCard.css";

function UpdateCard({ message, user, createdAt }) {
  return (
    <div className="update-card">
      <p>{message}</p>

      <p>
        <strong>Posted By:</strong> {user}
      </p>

      <p>
        <strong>Date:</strong> {createdAt}
      </p>
    </div>
  );
}

export default UpdateCard;
