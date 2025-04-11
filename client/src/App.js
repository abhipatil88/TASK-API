import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://task-api-jnpq.onrender.com'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const loadTasks = async () => {
    const res = await fetch(`${BACKEND_URL}/tasks`);
    const data = await res.json();
    setTasks(data.tasks);
  };

  const addTask = async () => {
    if (!taskText.trim()) return;
    await fetch(`${BACKEND_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newTask: taskText })
    });
    setTaskText('');
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>My Todo List</h1>
      <input
        type="text"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && addTask()}
        placeholder="Enter a task"
        style={{ padding: '8px', width: '70%' }}
      />
      <button onClick={addTask} style={{ padding: '8px 15px' }}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ padding: '8px', margin: '5px 0', background: '#f4f4f4' }}>
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
