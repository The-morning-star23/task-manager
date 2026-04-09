import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch {
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
    } catch {
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
    } catch {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch {
      setError('Failed to delete task.');
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) {
      setEditingId(null);
      return;
    }
    setError(null);
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { title: editTitle });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setEditingId(null);
    } catch {
      setError('Failed to update task.');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

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

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'incomplete' ? 'active' : ''} onClick={() => setFilter('incomplete')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && tasks.length === 0 && <div className="loading">Loading tasks...</div>}

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {editingId === task.id ? (
              <div className="edit-mode">
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={(e) => setEditTitle(e.target.value)} 
                  autoFocus
                />
                <button onClick={() => saveEdit(task.id)} className="save-btn">Save</button>
                <button onClick={() => setEditingId(null)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <>
                <span onClick={() => toggleComplete(task.id, task.completed)}>
                  {task.title}
                </span>
                <div className="actions">
                  <button onClick={() => startEditing(task)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;