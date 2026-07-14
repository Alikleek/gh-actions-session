import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(["Learn CI"]);
  const [text, setText] = useState("");

  function addTask() {
    const clean = text.trim();
    if (!clean) {
      return;
    }
    setTasks((prev) => [...prev, clean]);
    setText("");
  }

  return (
    <main
      style={{ fontFamily: "system-ui", maxWidth: 480, margin: "2rem auto" }}
    >
      <h1>WF3 Frontend</h1>
      <p>Tasks: {tasks.length}</p>
      <input
        aria-label="new-task"
        value={text}
        placeholder="Add a task…"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </main>
  );
}
