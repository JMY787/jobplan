import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import CreateProject from "./components/CreateProject";
import ProjectDetails from "./components/ProjectDetails";
import EditProject from "./components/EditProject";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import CreateUpdate from "./components/CreateUpdate";
import EditUpdate from "./components/EditUpdate";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id/tasks/new" element={<CreateTask />} />
        <Route path="/tasks/:id/edit" element={<EditTask />} />
        <Route path="/projects/:id/updates/new" element={<CreateUpdate />} />
        <Route path="/updates/:id/edit" element={<EditUpdate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
