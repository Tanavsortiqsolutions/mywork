import React, { useState } from 'react'
import './Homework.css';

export default function Homework() {
  const [homework, setHomework] = useState([
    {
      id: 1,
      title: 'Solve Chapter 5 Exercises',
      subject: 'Data Structures',
      description: 'Complete exercises 5.1 to 5.8 from the textbook',
      dueDate: '2026-02-10',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 2,
      title: 'HTML & CSS Project',
      subject: 'Web Development',
      description: 'Create a responsive portfolio website',
      dueDate: '2026-02-15',
      status: 'In Progress',
      priority: 'High',
    },
    {
      id: 3,
      title: 'Database Design Assignment',
      subject: 'Database Management',
      description: 'Normalize the given database schema to 3NF',
      dueDate: '2026-02-12',
      status: 'Pending',
      priority: 'Medium',
    },
    {
      id: 4,
      title: 'Operating Systems Lab',
      subject: 'Operating Systems',
      description: 'Implement process scheduling algorithms',
      dueDate: '2026-02-08',
      status: 'Completed',
      priority: 'Medium',
    },
  ])

  const handleStatusChange = (id, newStatus) => {
    setHomework(homework.map((hw) => (hw.id === id ? { ...hw, status: newStatus } : hw)))
  }

  const getPriorityColor = (priority) => {
    return priority === 'High' ? '#e74c3c' : priority === 'Medium' ? '#f39c12' : '#27ae60'
  }

  const getDaysLeft = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24))
    return diff > 0 ? `${diff} days left` : 'Overdue'
  }

  return (
    <div className="homework-container">
      <div className="homework-header">
        <h1>📝 Homework</h1>
        <div className="filter-buttons">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">In Progress</button>
          <button className="filter-btn">Completed</button>
        </div>
      </div>

      <div className="homework-stats">
        <div className="stat-box">
          <span className="stat-label">Total</span>
          <span className="stat-number">{homework.length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Pending</span>
          <span className="stat-number orange">{homework.filter((hw) => hw.status === 'Pending').length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">In Progress</span>
          <span className="stat-number blue">{homework.filter((hw) => hw.status === 'In Progress').length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Completed</span>
          <span className="stat-number green">{homework.filter((hw) => hw.status === 'Completed').length}</span>
        </div>
      </div>

      <div className="homework-list">
        {homework.map((hw) => (
          <div key={hw.id} className={`homework-card ${hw.status.toLowerCase()}`}>
            <div className="homework-header-card">
              <div className="hw-title-section">
                <h3>{hw.title}</h3>
                <p className="subject-name">📚 {hw.subject}</p>
              </div>
              <div className="hw-badges">
                <span className="priority-badge" style={{ background: getPriorityColor(hw.priority) }}>
                  {hw.priority} Priority
                </span>
                <span className={`status-badge ${hw.status.toLowerCase()}`}>{hw.status}</span>
              </div>
            </div>

            <p className="homework-description">{hw.description}</p>

            <div className="homework-footer">
              <div className="due-date">
                <span className="due-label">📅 Due: {hw.dueDate}</span>
                <span className="days-left" style={{ color: getDaysLeft(hw.dueDate).includes('Overdue') ? '#e74c3c' : '#666' }}>
                  {getDaysLeft(hw.dueDate)}
                </span>
              </div>

              <div className="status-controls">
                {hw.status !== 'Completed' && (
                  <select
                    className="status-select"
                    value={hw.status}
                    onChange={(e) => handleStatusChange(hw.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                )}
                {hw.status === 'Completed' && <button className="btn-submit">✅ Completed</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
