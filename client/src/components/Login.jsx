import { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateProject.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();

    console.log("Login:", formData);
  }
  return (
    <main>
      <h1>Login</h1>
      <p>Sign in to your JobPlan account.</p>

      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Create Account</Link>
      </p>
    </main>
  );
}

export default Login;
