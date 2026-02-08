import React, { useState } from 'react'
import './Announcement.css'

export default function Announcement() {
  const [announcements] = useState([
    {
      id: 1,
      title: 'Welcome to the New Academic Year',
      content: 'Welcome to the new academic year 2025-26! We are excited to have you all on board.',
      author: 'Principal',
      date: '2026-02-07',
      audience: 'All',
    },
    {
      id: 2,
      title: 'Guest Lecture on AI & Machine Learning',
      content: 'A guest lecture on AI and Machine Learning will be conducted by industry experts on February 15, 2026.',
      author: 'CSE Department',
      date: '2026-02-06',
      audience: 'CSE Students',
    },
    {
      id: 3,
      title: 'Sports Day Announcement',
      content: 'Annual sports day will be held on March 5, 2026. All students are encouraged to participate.',
      author: 'Sports Committee',
      date: '2026-02-05',
      audience: 'All',
    },
    {
      id: 4,
      title: 'Placement Drive Update',
      content: 'Multiple companies will visit campus for recruitment in February-March 2026. Keep your profiles updated.',
      author: 'Placement Cell',
      date: '2026-02-04',
      audience: 'Final Year Students',
    },
  ])

  return (
    <div className="announcement-container">
      <div className="announcement-header">
        <h1>📣 Announcements</h1>
        <p>Latest updates and announcements from the college</p>
      </div>

      <div className="announcement-list">
        {announcements.map((ann) => (
          <div key={ann.id} className="announcement-card">
            <div className="announcement-meta">
              <h3>{ann.title}</h3>
              <div className="meta-info">
                <span className="author">👤 {ann.author}</span>
                <span className="audience">👥 {ann.audience}</span>
                <span className="date">📅 {ann.date}</span>
              </div>
            </div>
            <p className="announcement-content">{ann.content}</p>
            <button className="btn-read-more">Read More →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
