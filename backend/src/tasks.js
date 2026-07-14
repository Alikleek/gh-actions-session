// Pure business logic for the task service — easy to unit test.

function createStore(initial = []) {
  let tasks = [...initial];
  let nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;

  return {
    list() {
      return tasks;
    },
    add(text) {
      const clean = String(text || "").trim();
      if (!clean) {
        throw new Error("text is required");
      }
      const task = { id: nextId++, text: clean, done: false };
      tasks.push(task);
      return task;
    },
    toggle(id) {
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        return null;
      }
      task.done = !task.done;
      return task;
    },
    remove(id) {
      const before = tasks.length;
      tasks = tasks.filter((t) => t.id !== id);
      return tasks.length < before;
    },
  };
}

module.exports = { createStore };
