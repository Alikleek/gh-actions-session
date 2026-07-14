const { test } = require("node:test");
const assert = require("node:assert");
const { createStore } = require("../src/tasks");

test("starts with the seeded tasks", () => {
  const store = createStore([{ id: 1, text: "seed", done: false }]);
  assert.strictEqual(store.list().length, 1);
});

test("adds a task and assigns the next id", () => {
  const store = createStore([{ id: 1, text: "seed", done: false }]);
  const task = store.add("new task");
  assert.strictEqual(task.id, 2);
  assert.strictEqual(task.text, "new task");
  assert.strictEqual(task.done, false);
  assert.strictEqual(store.list().length, 2);
});

test("rejects empty text", () => {
  const store = createStore();
  assert.throws(() => store.add("   "), /text is required/);
});

test("toggles done state", () => {
  const store = createStore([{ id: 1, text: "seed", done: false }]);
  assert.strictEqual(store.toggle(1).done, true);
  assert.strictEqual(store.toggle(1).done, false);
  assert.strictEqual(store.toggle(999), null);
});

test("removes a task", () => {
  const store = createStore([{ id: 1, text: "seed", done: false }]);
  assert.strictEqual(store.remove(1), true);
  assert.strictEqual(store.remove(1), false);
  assert.strictEqual(store.list().length, 0);
});
