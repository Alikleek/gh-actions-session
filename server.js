const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory task list so the app has real, working functions.
let tasks = [
  { id: 1, text: "Learn GitHub Actions", done: false },
  { id: 2, text: "Build a Docker image", done: true },
];
let nextId = 3;

// Health endpoint (handy for the container / CI).
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// List tasks
app.get("/api/tasks", (_req, res) => {
  res.json(tasks);
});

// Add a task
app.post("/api/tasks", (req, res) => {
  const text = (req.body && req.body.text ? String(req.body.text) : "").trim();
  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }
  const task = { id: nextId++, text, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// Toggle done
app.patch("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "not found" });
  }
  task.done = !task.done;
  res.json(task);
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === before) {
    return res.status(404).json({ error: "not found" });
  }
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Taskboard app listening on http://localhost:${PORT}`);
});
