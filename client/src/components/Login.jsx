import { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateProject.css";
import { API_URL } from "../api";

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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Logged in:", data);

        localStorage.setItem("user", JSON.stringify(data));

        window.location.href = "/dashboard";
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
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
