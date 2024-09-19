const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = []; // In-memory task store
let currentId = 1; // Task ID counter

// Simple endpoint for testing
app.get('/', (req, res) => {
    res.send('To-Do List API is running!');
});

// Create a task
app.post('/tasks', (req, res) => {
    const task = {
        id: currentId++,
        title: req.body.title,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = req.body.title || task.title;
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
