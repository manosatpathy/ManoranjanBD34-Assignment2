const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// DATA
let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

// Endpoint 1: Add a Task to the Task List
function addTask(tasks, taskId, text, priority) {
  const newTask = {
    taskId: taskId,
    text: text,
    priority: priority,
  };
  tasks.push(newTask);
  return tasks;
}

app.get("/tasks/add", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);
  const result = addTask(tasks, taskId, text, priority);
  res.json(result);
});

// Endpoint 2: Read All Tasks in the Task List
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Endpoint 3: Sort Tasks by Priority
app.get("/tasks/sort-by-priority", (req, res) => {
  const tasksCopy = tasks.slice();
  const result = tasksCopy.sort(
    (task1, task2) => task1.priority - task2.priority,
  );
  res.json(result);
});

// Endpoint 4: Edit Task Priority
function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get("/tasks/edit-priority", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const priority = parseInt(req.query.priority);
  const result = editTaskPriority(tasks, taskId, priority);
  res.json(result);
});

// Endpoint 5: Edit/Update Task Text
function editTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get("/tasks/edit-text", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const result = editTaskText(tasks, taskId, text);
  res.json(result);
});

// Endpoint 6: Delete a Task from the Task List
app.get("/tasks/delete", (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const result = tasks.filter((task) => task.taskId !== taskId);
  res.json(result);
});

// Endpoint 7. Filter Tasks by Priority
app.get("/tasks/filter-by-priority", (req, res) => {
  const priority = parseInt(req.query.priority);
  const result = tasks.filter((task) => task.priority === priority);
  res.json(result);
});

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
