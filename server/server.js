const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
       (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, role],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to register user",
    });
  }
});
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to login",
    });
  }
});

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

app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY id");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get projects" });
  }
});
app.post("/api/projects", async (req, res) => {
  try {
    const { name, address, description, status, start_date, end_date } =
      req.body;

    const result = await pool.query(
      `INSERT INTO projects
      (name, address, description, status, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        name,
        address,
        description,
        status,
        start_date || null,
        end_date || null,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get project" });
  }
});
app.put("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, address, description, status, start_date, end_date } =
      req.body;

    const result = await pool.query(
      `UPDATE projects
       SET name = $1,
           address = $2,
           description = $3,
           status = $4,
           start_date = $5,
           end_date = $6
       WHERE id = $7
       RETURNING *`,
      [
        name,
        address,
        description,
        status,
        start_date || null,
        end_date || null,
        id,
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
});
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({
      message: "Project deleted successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});
app.get("/api/projects/:id/tasks", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM tasks WHERE project_id = $1 ORDER BY id",
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
});
app.post("/api/projects/:id/tasks", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status, assigned_to, due_date } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks
       (project_id, assigned_to, title, description, status, due_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, assigned_to || null, title, description, status, due_date || null],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get task" });
  }
});
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, status, assigned_to, due_date } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           status = $3,
           assigned_to = $4,
           due_date = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, status, assigned_to || null, due_date || null, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({
      message: "Task deleted successfully",
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});
app.get("/api/projects/:id/updates", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
     project_updates.*,
     users.name AS user
   FROM project_updates
   LEFT JOIN users
     ON project_updates.user_id = users.id
   WHERE project_updates.project_id = $1
   ORDER BY project_updates.created_at DESC`,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get updates" });
  }
});

app.post("/api/projects/:id/updates", async (req, res) => {
  try {
    const { id } = req.params;
    const { message, user_id } = req.body;

    const result = await pool.query(
      `INSERT INTO project_updates
   (project_id, user_id, message)
   VALUES ($1, $2, $3)
   RETURNING *`,
      [id, user_id, message],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create update" });
  }
});
app.get("/api/updates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM project_updates WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Update not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get update" });
  }
});
app.put("/api/updates/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const result = await pool.query(
      `UPDATE project_updates
       SET message = $1
       WHERE id = $2
       RETURNING *`,
      [message, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Update not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project update" });
  }
});
app.delete("/api/updates/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM project_updates
       WHERE id = $1
       RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Update not found" });
    }

    res.json({
      message: "Update deleted successfully",
      update: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project update" });
  }
});
// KEEP THIS AT THE BOTTOM
app.listen(PORT, () => {
  console.log(`JobPlan server running on port ${PORT}`);
});
