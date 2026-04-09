const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = './tasks.json';

const getTasks = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

app.get('/tasks', (req, res) => {
  res.json(getTasks());
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = getTasks();
  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (completed !== undefined) {
    tasks[taskIndex].completed = completed;
  }
  
  if (title !== undefined && title.trim() !== '') {
    tasks[taskIndex].title = title.trim();
  }

  saveTasks(tasks);
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  let tasks = getTasks();
  const initialLength = tasks.length;
  
  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  saveTasks(tasks);
  res.status(204).send();
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;