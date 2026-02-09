import React, { useEffect, useState } from 'react'
import './Dashboard.css'

/* -------------------- Reusable Stat Card -------------------- */
const StatCard = React.memo(({ icon, label, value, subtext, color, isInvestment }) => {
  const displayValue =
    isInvestment && typeof value === 'number'
      ? `₹${value.toLocaleString('en-IN')}`
      : typeof value === 'number'
      ? value.toLocaleString('en-IN')
      : value

  return (
    <div className={`stat-card ${color}`}>
      <div className="card-header">
        <span className="stat-icon">{icon}</span>
        <h3>{label}</h3>
      </div>
      <div className="card-value">{displayValue}</div>
      {subtext && <p className="card-subtext">{subtext}</p>}
    </div>
  )
})

/* -------------------- Dashboard -------------------- */
const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [upcomingMeetings, setUpcomingMeetings] = useState([])
  const [investments, setInvestments] = useState([])

  /* 🔁 API-ready effect (static data for now) */
  useEffect(() => {
    // Replace this block with real API calls later
    setStats({
      totalClients: 1240,
      activeClients: 980,
      newClientsThisMonth: 145,
      totalInvestment: 5240000,
      investmentThisMonth: 850000,
      roi: 32.5,
    })

    setUpcomingMeetings([
      {
        id: 1,
        clientName: 'Acme Corporation',
        meetingDate: '2026-02-12',
        meetingTime: '10:00 AM',
        productName: 'Enterprise Solution Pro',
        type: 'Product Demo',
        location: 'Conference Room A',
      },
      {
        id: 2,
        clientName: 'TechStart Inc',
        meetingDate: '2026-02-12',
        meetingTime: '02:30 PM',
        productName: 'Cloud Platform',
        type: 'Contract Review',
        location: 'Virtual Meeting',
      },
      {
        id: 3,
        clientName: 'Global Industries',
        meetingDate: '2026-02-13',
        meetingTime: '11:00 AM',
        productName: 'Data Analytics Suite',
        type: 'Consultation',
        location: 'Office - Building B',
      },
      {
        id: 4,
        clientName: 'Future Ventures',
        meetingDate: '2026-02-14',
        meetingTime: '03:00 PM',
        productName: 'Integration API',
        type: 'Technical Discussion',
        location: 'Conference Room C',
      },
      {
        id: 5,
        clientName: 'NextGen Solutions',
        meetingDate: '2026-02-15',
        meetingTime: '09:30 AM',
        productName: 'Mobile Framework',
        type: 'Training Session',
        location: 'Virtual Meeting',
      },
    ])

    setInvestments([
      {
        id: 1,
        clientName: 'Blue Capital Ltd',
        amount: 500000,
        date: '2026-01-15',
        productName: 'Enterprise Suite',
        status: 'Completed',
      },
      {
        id: 2,
        clientName: 'Growth Partners',
        amount: 350000,
        date: '2026-02-01',
        productName: 'Cloud Infrastructure',
        status: 'Completed',
      },
      {
        id: 3,
        clientName: 'Digital Ventures',
        amount: 450000,
        date: '2026-02-05',
        productName: 'AI Solutions',
        status: 'In Progress',
      },
      {
        id: 4,
        clientName: 'Tech Forward',
        amount: 280000,
        date: '2026-02-08',
        productName: 'Mobile Development',
        status: 'Pending',
      },
      {
        id: 5,
        clientName: 'Innovation Labs',
        amount: 420000,
        date: '2026-02-10',
        productName: 'Blockchain Platform',
        status: 'In Progress',
      },
    ])
  }, [])

  if (!stats) return null // loading placeholder can be added later

  return (
    <div className="dashboard-view">
      {/* -------------------- Statistics -------------------- */}
      <div className="stats-grid">
        <StatCard
          icon="👥"
          label="Total Clients"
          value={stats.totalClients}
          subtext={`${stats.activeClients} Active`}
          color="blue"
        />
        <StatCard
          icon="📈"
          label="New Clients (This Month)"
          value={stats.newClientsThisMonth}
          color="green"
        />
        <StatCard
          icon="💼"
          label="Total Investment"
          value={stats.totalInvestment}
          subtext={`₹${stats.investmentThisMonth.toLocaleString('en-IN')} this month`}
          color="purple"
          isInvestment
        />
        <StatCard
          icon="📊"
          label="Return on Investment"
          value={`${stats.roi}%`}
          subtext="Annual growth rate"
          color="orange"
        />
      </div>

      {/* -------------------- Upcoming Meetings -------------------- */}
      <div className="dashboard-row">
        <div className="dashboard-card full-width">
          <h3 className="card-title">📅 Upcoming Product Meetings</h3>

          <div className="meetings-list">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="meeting-item">
                <div className="meeting-date-time">
                  <p className="meeting-date">
                    {new Date(meeting.meetingDate).toLocaleDateString()}
                  </p>
                  <p className="meeting-time">{meeting.meetingTime}</p>
                </div>

                <div className="meeting-details">
                  <h4>{meeting.clientName}</h4>
                  <p className="meeting-product">Product: {meeting.productName}</p>
                  <span className="type-badge">{meeting.type}</span>
                </div>

                <div className="meeting-location">📍 {meeting.location}</div>
                <button className="meeting-action">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------- Investments -------------------- */}
      <div className="dashboard-row">
        <div className="dashboard-card">
          <h3 className="card-title">💰 Recent Investments</h3>

          <div className="investments-list">
            {investments.map((investment) => (
              <div key={investment.id} className="investment-item">
                <div>
                  <p className="investment-client">{investment.clientName}</p>
                  <p className="investment-product">{investment.productName}</p>
                </div>

                <p className="investment-date">
                  {new Date(investment.date).toLocaleDateString()}
                </p>

                <div>
                  <p className="investment-amount">
                    ₹{investment.amount.toLocaleString('en-IN')}
                  </p>
                  <span
                    className={`status-badge ${investment.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {investment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* -------------------- Overview -------------------- */}
        <div className="dashboard-card">
          <h3 className="card-title">📊 Investment Overview</h3>

          <div className="overview-content">
            <div className="overview-stat">
              <p>Total Investment</p>
              <strong>₹{stats.totalInvestment.toLocaleString('en-IN')}</strong>
            </div>

            <div className="overview-divider" />

            <div className="overview-stat">
              <p>This Month</p>
              <strong>₹{stats.investmentThisMonth.toLocaleString('en-IN')}</strong>
            </div>

            <div className="overview-divider" />

            <div className="overview-stat">
              <p>Average per Investment</p>
              <strong>
                ₹
                {Math.round(
                  stats.totalInvestment / investments.length
                ).toLocaleString('en-IN')}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
