const express = require('express');

const app = express();

app.use(express.json());

const tasks = [];

//GET: Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json({
        tasks: tasks
    });
});

// POST: Add a new task
app.post('/tasks', (req, res) => {
    if (!req.body.newTask) {
        return res.status(400).json({
            message: "Please provide a Task"
        });
    }

    tasks.push(req.body.newTask);
    
    res.status(200).json({
        message: "Task added successfully",
        tasks: tasks
    });
});

//  PUT: Update a task by index
app.put('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= tasks.length) {
        return res.status(400).json({
            message: "Invalid task index"
        });
    }

    if (!req.body.updatedTask) {
        return res.status(400).json({
            message: "Please provide an updated task"
        });
    }

    tasks[index] = req.body.updatedTask;

    res.status(200).json({
        message: "Task updated successfully",
        tasks: tasks
    });
});

//DELETE: Remove task by index
app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= tasks.length) {
        return res.status(400).json({
            message: "Invalid task index"
        });
    }

    tasks.splice(index, 1);
    
    res.status(200).json({
        message: "Task deleted successfully",
        tasks: tasks
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
