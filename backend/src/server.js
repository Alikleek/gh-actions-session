const express = require("express");
const { createStore } = require("./tasks");

const app = express();
app.use(express.json());

const store = createStore([
  { id: 1, text: "Write unit tests", done: false },
  { id: 2, text: "Set up CI", done: false },
]);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", (_req, res) => {
  res.json(store.list());
});

app.post("/api/tasks", (req, res) => {
  try {
    const task = store.add(req.body && req.body.text);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch("/api/tasks/:id", (req, res) => {
  const task = store.toggle(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "not found" });
  }
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const ok = store.remove(Number(req.params.id));
  if (!ok) {
    return res.status(404).json({ error: "not found" });
  }
  res.status(204).end();
});

const PORT = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

module.exports = { app };
