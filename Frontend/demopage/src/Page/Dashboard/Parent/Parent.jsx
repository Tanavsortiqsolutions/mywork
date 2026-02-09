import React, { useState } from 'react';
import './Parent.css';

export default function Parent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChild, setSelectedChild] = useState('child1');

  // Sample child data
  const children = [
    { id: 'child1', name: 'John Doe', grade: '10-A', rollNo: '001' },
    { id: 'child2', name: 'Sarah Doe', grade: '8-B', rollNo: '045' }
  ];

  // Attendance data
  const attendanceData = {
    child1: {
      present: 78,
      absent: 12,
      leave: 5,
      total: 95,
      percentage: 82.1
    },
    child2: {
      present: 85,
      absent: 8,
      leave: 2,
      total: 95,
      percentage: 89.5
    }
  };

  // Results data
  const resultsData = {
    child1: [
      { subject: 'Mathematics', marks: 85, outOf: 100, percentage: 85 },
      { subject: 'English', marks: 78, outOf: 100, percentage: 78 },
      { subject: 'Science', marks: 88, outOf: 100, percentage: 88 },
      { subject: 'Social Studies', marks: 82, outOf: 100, percentage: 82 },
      { subject: 'Hindi', marks: 76, outOf: 100, percentage: 76 }
    ],
    child2: [
      { subject: 'Mathematics', marks: 92, outOf: 100, percentage: 92 },
      { subject: 'English', marks: 88, outOf: 100, percentage: 88 },
      { subject: 'Science', marks: 90, outOf: 100, percentage: 90 },
      { subject: 'Social Studies', marks: 87, outOf: 100, percentage: 87 },
      { subject: 'Hindi', marks: 85, outOf: 100, percentage: 85 }
    ]
  };

  // Announcements
  const announcements = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: 'March 15, 2026',
      content: 'The annual sports day will be held on March 15, 2026. All students are requested to participate in various sports events.',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Science Exhibition',
      date: 'February 20, 2026',
      content: 'Students of Grade 9 and above are invited to participate in the annual science exhibition. Registration ends on Feb 18.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Parent-Teacher Conference',
      date: 'February 25, 2026',
      content: 'A parent-teacher meeting will be conducted on February 25, 2026. Please visit the school office to book your slot.',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Holiday Announcement',
      date: 'February 10, 2026',
      content: 'School will remain closed on February 26 to March 2 for Republic Day holidays. Classes will resume on March 3, 2026.',
      priority: 'medium'
    }
  ];

  const attendance = attendanceData[selectedChild];
  const results = resultsData[selectedChild];

  return (
    <div className="parent-dashboard-container">
      {/* Sidebar */}
      <aside className={`parent-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Parent Portal</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </a>
       
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`parent-main ${sidebarOpen ? 'expanded' : 'full'}`}>
        
        {/* Header */}
        <div className="parent-header">
          <button 
            className="mobile-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>Parent Dashboard</h1>
          <div className="header-right">
            <span className="user-name">Welcome, Parent</span>
            <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
          </div>
        </div>

        {/* Child Selector */}
        <div className="child-selector">
          <h3>Select Child</h3>
          <div className="child-tabs">
            {children.map(child => (
              <button
                key={child.id}
                className={`child-tab ${selectedChild === child.id ? 'active' : ''}`}
                onClick={() => setSelectedChild(child.id)}
              >
                <div className="tab-name">{child.name}</div>
                <div className="tab-grade">Grade: {child.grade}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Cards */}
        <section className="overview-section">
          <h2>Overview</h2>
          <div className="overview-cards">
            <div className="overview-card attendance-card">
              <div className="card-icon">📍</div>
              <div className="card-content">
                <h4>Attendance</h4>
                <p className="card-stat">{attendance.percentage}%</p>
                <p className="card-detail">{attendance.present}/{attendance.total} days present</p>
              </div>
            </div>

            <div className="overview-card average-card">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <h4>Average Score</h4>
                <p className="card-stat">{(results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)}%</p>
                <p className="card-detail">Based on recent exams</p>
              </div>
            </div>

            <div className="overview-card performance-card">
              <div className="card-icon">⭐</div>
              <div className="card-content">
                <h4>Performance</h4>
                <p className="card-stat">Good</p>
                <p className="card-detail">Consistent performer</p>
              </div>
            </div>

            <div className="overview-card activity-card">
              <div className="card-icon">📢</div>
              <div className="card-content">
                <h4>Announcements</h4>
                <p className="card-stat">{announcements.length}</p>
                <p className="card-detail">New updates available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="content-grid">
          
          {/* Attendance Section */}
          <section className="attendance-section">
            <h2>Attendance Details</h2>
            <div className="attendance-content">
              <div className="attendance-chart">
                <div className="chart-item present">
                  <div className="chart-bar" style={{ height: `${(attendance.present / attendance.total) * 100}%` }}></div>
                  <p className="chart-label">Present</p>
                  <p className="chart-value">{attendance.present}</p>
                </div>
                <div className="chart-item absent">
                  <div className="chart-bar" style={{ height: `${(attendance.absent / attendance.total) * 100}%` }}></div>
                  <p className="chart-label">Absent</p>
                  <p className="chart-value">{attendance.absent}</p>
                </div>
                <div className="chart-item leave">
                  <div className="chart-bar" style={{ height: `${(attendance.leave / attendance.total) * 100}%` }}></div>
                  <p className="chart-label">Leave</p>
                  <p className="chart-value">{attendance.leave}</p>
                </div>
              </div>

              <div className="attendance-details-list">
                <div className="detail-row">
                  <span>Total Working Days</span>
                  <span className="detail-value">{attendance.total}</span>
                </div>
                <div className="detail-row">
                  <span>Days Present</span>
                  <span className="detail-value present-text">{attendance.present}</span>
                </div>
                <div className="detail-row">
                  <span>Days Absent</span>
                  <span className="detail-value absent-text">{attendance.absent}</span>
                </div>
                <div className="detail-row">
                  <span>Days on Leave</span>
                  <span className="detail-value leave-text">{attendance.leave}</span>
                </div>
                <div className="detail-row highlight">
                  <span>Attendance Percentage</span>
                  <span className="detail-value">{attendance.percentage}%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="results-section">
            <h2>Latest Results</h2>
            <div className="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Out Of</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx}>
                      <td>{result.subject}</td>
                      <td className="marks-cell">{result.marks}</td>
                      <td>{result.outOf}</td>
                      <td>
                        <span className="percentage-badge" style={{
                          backgroundColor: result.percentage >= 85 ? '#10b981' : result.percentage >= 70 ? '#f59e0b' : '#ef4444'
                        }}>
                          {result.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Announcements Section */}
        <section className="announcements-section">
          <h2>Important Announcements</h2>
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className={`announcement-card priority-${announcement.priority}`}>
                <div className="announcement-header">
                  <h4>{announcement.title}</h4>
                  <span className={`priority-badge ${announcement.priority}`}>{announcement.priority}</span>
                </div>
                <p className="announcement-date">📅 {announcement.date}</p>
                <p className="announcement-content">{announcement.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
