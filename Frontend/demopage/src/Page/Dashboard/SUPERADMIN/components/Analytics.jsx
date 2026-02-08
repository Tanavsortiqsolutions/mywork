import React, { useState } from 'react'
import './Analytics.css'

const StatCard = ({ icon, label, value, growth, color }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-header">
        <span className={`stat-icon ${color}`}>{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-growth ${growth.includes('+') ? 'positive' : 'negative'}`}>
        {growth}
      </div>
    </div>
  )

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('month')

  const analyticsData = {
    totalEmployees: 245,
    totalDepartments: 12,
    activeDepartments: 10,
    totalRevenue: '$2,450,000',
    revenueGrowth: '+12.5%',
    employeeGrowth: '+8.2%',
    departmentGrowth: '+5%',
  }

  const departmentStats = [
    { name: 'IT', employees: 45, revenue: '$450,000' },
    { name: 'HR', employees: 12, revenue: '$120,000' },
    { name: 'Sales', employees: 52, revenue: '$890,000' },
    { name: 'Finance', employees: 28, revenue: '$340,000' },
    { name: 'Operations', employees: 65, revenue: '$520,000' },
    { name: 'Marketing', employees: 23, revenue: '$180,000' },
  ]

  const recentActivities = [
    { id: 1, action: 'New Employee Added', department: 'IT', time: '2 hours ago' },
    { id: 2, action: 'Department Created', department: 'AI/ML', time: '5 hours ago' },
    { id: 3, action: 'Role Updated', department: 'HR', time: '1 day ago' },
    { id: 4, action: 'Budget Allocated', department: 'Sales', time: '2 days ago' },
    { id: 5, action: 'Employee Promoted', department: 'Finance', time: '3 days ago' },
  ]

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>📊 Analytics Dashboard</h1>
        <div className="timeframe-buttons">
          {['week', 'month', 'year'].map((tf) => (
            <button
              key={tf}
              className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="stats-grid">
        <StatCard
          icon="👥"
          label="Total Employees"
          value={analyticsData.totalEmployees}
          growth={analyticsData.employeeGrowth}
          color="blue"
        />
        <StatCard
          icon="🏢"
          label="Total Departments"
          value={analyticsData.totalDepartments}
          growth={analyticsData.departmentGrowth}
          color="green"
        />
        <StatCard
          icon="✅"
          label="Active Departments"
          value={analyticsData.activeDepartments}
          growth="+0%"
          color="orange"
        />
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={analyticsData.totalRevenue}
          growth={analyticsData.revenueGrowth}
          color="purple"
        />
      </div>

      {/* Department Stats */}
      <div className="section-container">
        <h2>Department Performance</h2>
        <div className="department-grid">
          {departmentStats.map((dept, idx) => (
            <div key={idx} className="department-card">
              <div className="dept-header">
                <h3>{dept.name}</h3>
                <span className="dept-badge">{dept.employees} staff</span>
              </div>
              <div className="dept-stat">
                <label>Revenue</label>
                <p>{dept.revenue}</p>
              </div>
              <div className="dept-progress">
                <div
                  className="progress-bar"
                  style={{ width: `${(dept.employees / 65) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="section-container">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <h4>{activity.action}</h4>
                <p>Department: {activity.department}</p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="section-container">
        <h2>Growth Trends</h2>
        <div className="chart-placeholder">
          <div className="chart-item">
            <h4>Employee Growth</h4>
            <div className="simple-chart">
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
              <div className="bar" style={{ height: '80%' }}></div>
              <div className="bar" style={{ height: '90%' }}></div>
            </div>
          </div>
          <div className="chart-item">
            <h4>Revenue Growth</h4>
            <div className="simple-chart">
              <div className="bar" style={{ height: '50%' }}></div>
              <div className="bar" style={{ height: '65%' }}></div>
              <div className="bar" style={{ height: '85%' }}></div>
              <div className="bar" style={{ height: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
