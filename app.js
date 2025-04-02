const express = require('express');
const sql = require('./Db.js');
require('dotenv').config();

const app = express();
app.use(express.json());

// GET: Retrieve all tasks from the database
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await sql`SELECT * FROM tasks ORDER BY id ASC`;
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// POST: Add a new task to the database
app.post('/tasks', async (req, res) => {
    try {
        if (!req.body.newTask) {
            return res.status(400).json({ message: "Please provide a Task" });
        }
        await sql`INSERT INTO tasks (name) VALUES (${req.body.newTask})`;
        res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// PUT: Update a task in the database
app.put('/tasks/:taskId', async (req, res) => {
    try {
        if (!req.body.updatedTask) {
            return res.status(400).json({ message: "Please provide an updated task" });
        }
        const { taskId } = req.params;
        await sql`UPDATE tasks SET name = ${req.body.updatedTask} WHERE id = ${taskId}`;
        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// DELETE: Remove a task from the database
app.delete('/tasks/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        await sql`DELETE FROM tasks WHERE id = ${taskId}`;
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
