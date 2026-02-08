import React, { useState } from 'react'
import './Announcements.css'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Welcome to the New Portal',
      content: 'We are excited to introduce our new management portal for enhanced communication.',
      author: 'Admin',
      date: '2026-02-07',
      audience: 'All',
      priority: 'High',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Upcoming Maintenance',
      content: 'System maintenance scheduled for this weekend. Please plan accordingly.',
      author: 'Admin',
      date: '2026-02-06',
      audience: 'All',
      priority: 'Medium',
      status: 'Published',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    audience: 'All',
    priority: 'Medium',
  })

  const audiences = ['All', 'Students', 'Faculty', 'Staff', 'Management']
  const priorities = ['Low', 'Medium', 'High', 'Urgent']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePublish = () => {
    if (formData.title && formData.content) {
      const newAnnouncement = {
        id: announcements.length + 1,
        ...formData,
        author: 'Admin',
        date: new Date().toISOString().split('T')[0],
        status: 'Published',
      }
      setAnnouncements((prev) => [newAnnouncement, ...prev])
      setFormData({ title: '', content: '', audience: 'All', priority: 'Medium' })
      setShowForm(false)
    }
  }

  const handleDelete = (id) => {
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id))
  }

  const handleArchive = (id) => {
    setAnnouncements((prev) =>
      prev.map((ann) =>
        ann.id === id ? { ...ann, status: ann.status === 'Published' ? 'Archived' : 'Published' } : ann
      )
    )
  }

  const getPriorityColor = (priority) => {
    const colors = {
      Low: '#27ae60',
      Medium: '#f39c12',
      High: '#e74c3c',
      Urgent: '#c0392b',
    }
    return colors[priority] || '#95a5a6'
  }

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <h1>📣 Announcements</h1>
        <button className="btn-new-announcement" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ New Announcement'}
        </button>
      </div>

      {/* Create Announcement Form */}
      {showForm && (
        <div className="announcement-form">
          <h2>Create New Announcement</h2>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Announcement Title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input-large"
            />
            <textarea
              name="content"
              placeholder="Write your announcement here..."
              value={formData.content}
              onChange={handleInputChange}
              className="form-textarea"
              rows="6"
            ></textarea>
            <div className="form-row">
              <select
                name="audience"
                value={formData.audience}
                onChange={handleInputChange}
                className="form-select"
              >
                {audiences.map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="form-select"
              >
                {priorities.map((pri) => (
                  <option key={pri} value={pri}>
                    {pri}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-publish" onClick={handlePublish}>
              📢 Publish Announcement
            </button>
          </div>
        </div>
      )}

      {/* Announcements Cards */}
      <div className="announcements-list">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`announcement-card ${announcement.status.toLowerCase()}`}
            >
              <div className="announcement-header-card">
                <div className="announcement-meta">
                  <h3>{announcement.title}</h3>
                  <div className="meta-info">
                    <span className="badge author">👤 {announcement.author}</span>
                    <span className="badge date">📅 {announcement.date}</span>
                    <span className="badge audience">👥 {announcement.audience}</span>
                  </div>
                </div>
                <span
                  className="priority-badge"
                  style={{ background: getPriorityColor(announcement.priority) }}
                >
                  {announcement.priority}
                </span>
              </div>

              <div className="announcement-content">
                <p>{announcement.content}</p>
              </div>

              <div className="announcement-footer">
                <span className={`status-badge ${announcement.status.toLowerCase()}`}>
                  {announcement.status}
                </span>
                <div className="action-buttons">
                  <button
                    className="btn-action-archive"
                    onClick={() => handleArchive(announcement.id)}
                    title={announcement.status === 'Published' ? 'Archive' : 'Restore'}
                  >
                    {announcement.status === 'Published' ? '📦 Archive' : '↩️ Restore'}
                  </button>
                  <button
                    className="btn-action-delete"
                    onClick={() => handleDelete(announcement.id)}
                    title="Delete"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-announcements">
            <p>📭 No announcements yet. Create one to get started!</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="announcement-stats">
        <div className="stat-card">
          <h4>Total Announcements</h4>
          <p className="stat-value">{announcements.length}</p>
        </div>
        <div className="stat-card">
          <h4>Published</h4>
          <p className="stat-value">{announcements.filter((a) => a.status === 'Published').length}</p>
        </div>
        <div className="stat-card">
          <h4>Archived</h4>
          <p className="stat-value">{announcements.filter((a) => a.status === 'Archived').length}</p>
        </div>
        <div className="stat-card">
          <h4>High Priority</h4>
          <p className="stat-value red">{announcements.filter((a) => a.priority === 'High' || a.priority === 'Urgent').length}</p>
        </div>
      </div>
    </div>
  )
}

export default Announcements
