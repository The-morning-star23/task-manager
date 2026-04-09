import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, { title });
      setTasks([...tasks, response.data]);
      setTitle('');
    } catch (err) {
      setError('Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    setError(null);
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { completed: !currentStatus });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter a new task..." 
          required 
        />
        <button type="submit" disabled={loading}>Add Task</button>
      </form>

      {error && <div className="error">{error}</div>}
      {loading && tasks.length === 0 && <div className="loading">Loading tasks...</div>}

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(task.id, task.completed)}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;