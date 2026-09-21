const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const projects = [
  {
    id: 1,
    name: "Downtown Office Renovation",
    address: "123 Main Street",
    description: "Complete interior renovation of a downtown office space.",
    status: "In Progress",
    startDate: "2026-09-01",
    endDate: "2026-11-30",
  },
  {
    id: 2,
    name: "Park Avenue Apartment",
    address: "456 Park Avenue",
    description:
      "Apartment renovation including framing, drywall, and finishes.",
    status: "Planning",
    startDate: "2026-10-01",
    endDate: "2027-01-15",
  },
  {
    id: 3,
    name: "Brooklyn Retail Buildout",
    address: "789 Atlantic Avenue",
    description: "Retail buildout including walls, ceilings, doors, and trim.",
    status: "Completed",
    startDate: "2026-05-15",
    endDate: "2026-08-30",
  },
];
const tasks = [
  {
    id: 1,
    projectId: 1,
    title: "Frame conference room walls",
    description: "Frame new walls according to the project drawings.",
    status: "In Progress",
    assignedTo: "Mike",
    dueDate: "2026-09-25",
  },
  {
    id: 2,
    projectId: 1,
    title: "Install drywall",
    description: "Hang drywall after framing inspection is complete.",
    status: "Pending",
    assignedTo: "Carlos",
    dueDate: "2026-10-02",
  },
  {
    id: 3,
    projectId: 2,
    title: "Demo existing kitchen",
    description: "Remove existing cabinets, counters, and finishes.",
    status: "Pending",
    assignedTo: "David",
    dueDate: "2026-10-05",
  },
];
const updates = [
  {
    id: 1,
    projectId: 1,
    user: "James",
    message: "Conference room framing has started.",
    createdAt: "2026-09-20",
  },
  {
    id: 2,
    projectId: 1,
    user: "Mike",
    message: "Material delivery arrived on site.",
    createdAt: "2026-09-21",
  },
  {
    id: 3,
    projectId: 2,
    user: "Carlos",
    message: "Kitchen demolition is scheduled for next week.",
    createdAt: "2026-09-21",
  },
];

app.get("/", (req, res) => {
  res.send("JobPlan API is running");
});

app.get("/api/projects", (req, res) => {
  res.json(projects);
});
app.post("/api/projects", (req, res) => {
  const newProject = {
    id: projects.length + 1,
    ...req.body,
  };

  projects.push(newProject);

  res.status(201).json(newProject);
});

app.get("/api/projects/:id", (req, res) => {
  const project = projects.find(
    (project) => project.id === Number(req.params.id),
  );

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.json(project);
});
app.put("/api/projects/:id", (req, res) => {
  const project = projects.find(
    (project) => project.id === Number(req.params.id),
  );

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  Object.assign(project, req.body);

  res.json(project);
});
app.delete("/api/projects/:id", (req, res) => {
  const projectIndex = projects.findIndex(
    (project) => project.id === Number(req.params.id),
  );

  if (projectIndex === -1) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  projects.splice(projectIndex, 1);

  res.json({
    message: "Project deleted",
  });
});
app.get("/api/projects/:id/tasks", (req, res) => {
  const projectTasks = tasks.filter(
    (task) => task.projectId === Number(req.params.id),
  );

  res.json(projectTasks);
});
app.post("/api/projects/:id/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    projectId: Number(req.params.id),
    ...req.body,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.get("/api/projects/:id/updates", (req, res) => {
  const projectUpdates = updates.filter(
    (update) => update.projectId === Number(req.params.id),
  );

  res.json(projectUpdates);
});
app.post("/api/projects/:id/updates", (req, res) => {
  const newUpdate = {
    id: updates.length + 1,
    projectId: Number(req.params.id),
    ...req.body,
    createdAt: new Date().toISOString().split("T")[0],
  };

  updates.push(newUpdate);

  res.status(201).json(newUpdate);
});

// KEEP THIS AT THE BOTTOM
app.listen(PORT, () => {
  console.log(`JobPlan server running on port ${PORT}`);
});
