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

export default tasks;