import React, { useState } from 'react'
import './Home.css'

export default function Home() {
  const [student] = useState({
    name: 'John Doe',
    roll: 'CSE-2022-001',
    class: 'B.Tech CSE - 2nd Year',
    gpa: '8.5',
    attendance: '92%',
  })

  const upcomingClasses = [
    { subject: 'Data Structures', time: '09:00 AM', room: 'Lab-A1', teacher: 'Prof. Smith' },
    { subject: 'Web Development', time: '11:30 AM', room: 'Classroom-5', teacher: 'Prof. Johnson' },
  ]

  const recentAssignments = [
    { title: 'Assignment 1: Sorting Algorithms', due: '2026-02-15', status: 'Pending' },
    { title: 'Project: E-Commerce Website', due: '2026-02-20', status: 'In Progress' },
    { title: 'Quiz: Database Concepts', due: '2026-02-10', status: 'Completed' },
  ]

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome, {student.name}! 👋</h1>
        <p>Here's your dashboard overview for today</p>
      </div>

      {/* Student Info Cards */}
      <div className="info-cards">
        <div className="card">
          <span className="card-icon">📚</span>
          <div className="card-content">
            <h4>Roll Number</h4>
            <p>{student.roll}</p>
          </div>
        </div>
        <div className="card">
          <span className="card-icon">🎓</span>
          <div className="card-content">
            <h4>Class</h4>
            <p>{student.class}</p>
          </div>
        </div>
        <div className="card">
          <span className="card-icon">⭐</span>
          <div className="card-content">
            <h4>GPA</h4>
            <p>{student.gpa}</p>
          </div>
        </div>
        <div className="card">
          <span className="card-icon">📅</span>
          <div className="card-content">
            <h4>Attendance</h4>
            <p>{student.attendance}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Upcoming Classes */}
        <div className="section-box">
          <h3>📚 Today's Classes</h3>
          {upcomingClasses.length > 0 ? (
            <div className="class-list">
              {upcomingClasses.map((cls, idx) => (
                <div key={idx} className="class-item">
                  <div className="class-info">
                    <h5>{cls.subject}</h5>
                    <p className="class-time">⏰ {cls.time}</p>
                    <p className="class-room">📍 Room: {cls.room}</p>
                    <p className="class-teacher">👨‍🏫 {cls.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No classes scheduled for today</p>
          )}
        </div>

        {/* Recent Assignments */}
        <div className="section-box">
          <h3>📝 Recent Assignments</h3>
          {recentAssignments.length > 0 ? (
            <div className="assignment-list">
              {recentAssignments.map((assignment, idx) => (
                <div key={idx} className={`assignment-item ${assignment.status.toLowerCase()}`}>
                  <div className="assignment-header">
                    <h5>{assignment.title}</h5>
                    <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                      {assignment.status}
                    </span>
                  </div>
                  <p className="assignment-due">Due: {assignment.due}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No assignments</p>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <h4>Assignments Pending</h4>
          <p className="stat-number yellow">5</p>
        </div>
        <div className="stat-card">
          <h4>Classes Today</h4>
          <p className="stat-number blue">{upcomingClasses.length}</p>
        </div>
        <div className="stat-card">
          <h4>Notifications</h4>
          <p className="stat-number green">12</p>
        </div>
        <div className="stat-card">
          <h4>Days Until Exam</h4>
          <p className="stat-number red">45</p>
        </div>
      </div>
    </div>
  )
}
