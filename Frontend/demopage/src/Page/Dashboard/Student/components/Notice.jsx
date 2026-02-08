import React, { useState } from 'react'
import './Notice.css'

export default function Notice() {
  const [notices] = useState([
    {
      id: 1,
      title: 'Mid-semester Examinations Scheduled',
      content: 'Mid-semester examinations will be held during March 15-22, 2026. Time tables will be published soon.',
      date: '2026-02-05',
      category: 'Academic',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Lab Timing Changed',
      content: 'Computer Lab timings for Data Structures lab has been changed from 2 PM to 3 PM for all weeks.',
      date: '2026-02-04',
      category: 'Lab',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'Fee Payment Deadline Extended',
      content: 'The fee payment deadline has been extended to February 28, 2026. No late fee will be charged.',
      date: '2026-02-03',
      category: 'Administrative',
      priority: 'High',
    },
    {
      id: 4,
      title: 'Library Books Return',
      content: 'All books issued from the library must be returned by February 20, 2026.',
      date: '2026-02-01',
      category: 'Library',
      priority: 'Medium',
    },
  ])

  const getPriorityColor = (priority) => (priority === 'High' ? '#e74c3c' : '#f39c12')

  return (
    <div className="notice-container">
      <div className="notice-header">
        <h1>📢 Notices</h1>
        <p>Stay updated with important college notices</p>
      </div>

      <div className="notice-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-card">
            <div className="notice-badge" style={{ background: getPriorityColor(notice.priority) }}>
              {notice.priority}
            </div>
            <div className="notice-content">
              <h3>{notice.title}</h3>
              <p className="notice-text">{notice.content}</p>
              <div className="notice-footer">
                <span className="category-tag">{notice.category}</span>
                <span className="notice-date">📅 {notice.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
