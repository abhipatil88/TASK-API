import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://task-api-jnpq.onrender.com'; // Replace with your actual backend URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load all tasks
  const loadTasks = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/tasks`);
      const data = await res.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!taskText.trim()) return;
    try {
      await fetch(`${BACKEND_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTask: taskText })
      });
      setTaskText('');
      loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.name);
  };

  // Update task
  const updateTask = async () => {
    if (!editingText.trim()) return;
    try {
      await fetch(`${BACKEND_URL}/tasks/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updatedTask: editingText })
      });
      setEditingId(null);
      setEditingText('');
      loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Load tasks on page load
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>My Todo List</h1>

      {/* Add new task */}
      <input
        type="text"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && addTask()}
        placeholder="Enter a task"
        style={{ padding: '8px', width: '70%' }}
      />
      <button onClick={addTask} style={{ padding: '8px 15px' }}>Add Task</button>

      {/* Task list */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ padding: '8px', margin: '5px 0', background: '#f4f4f4' }}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && updateTask()}
                  style={{ padding: '5px', width: '60%' }}
                />
                <button onClick={updateTask} style={{ marginLeft: '10px' }}>Save</button>
                <button onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>Cancel</button>
              </>
            ) : (
              <>
                {task.name}
                <button onClick={() => startEditing(task)} style={{ marginLeft: '10px' }}>Edit</button>
                <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
