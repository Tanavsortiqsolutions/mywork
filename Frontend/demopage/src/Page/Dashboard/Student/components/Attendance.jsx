import React, { useState } from 'react'
import './Attendance.css'

export default function Attendance() {
  const [attendanceData] = useState({
    overall: '92%',
    classes_attended: 68,
    classes_total: 75,
  })

  const [monthlyAttendance] = useState([
    { month: 'January', percentage: 85, attended: 16, total: 20 },
    { month: 'February', percentage: 92, attended: 22, total: 24 },
    { month: 'March', percentage: 88, attended: 21, total: 24 },
    { month: 'April', percentage: 95, attended: 19, total: 20 },
  ])

  const [subjectAttendance] = useState([
    { subject: 'Data Structures', percentage: 95, attended: 38, total: 40 },
    { subject: 'Web Development', percentage: 90, attended: 27, total: 30 },
    { subject: 'Database Management', percentage: 88, attended: 22, total: 25 },
    { subject: 'Operating Systems', percentage: 92, attended: 23, total: 25 },
  ])

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return '#27ae60'
    if (percentage >= 75) return '#f39c12'
    return '#e74c3c'
  }

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent'
    if (percentage >= 75) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="attendance-container">
      {/* Overall Attendance */}
      <div className="overall-section">
        <div className="overall-card">
          <div className="circular-progress" style={{ '--percentage': attendanceData.overall }}>
            <div className="progress-text">
              <h2>{attendanceData.overall}</h2>
              <p>Overall Attendance</p>
            </div>
          </div>
          <div className="attendance-info">
            <p>
              <strong>{attendanceData.classes_attended}</strong> out of{' '}
              <strong>{attendanceData.classes_total}</strong> classes attended
            </p>
            <span
              className="status-badge"
              style={{ background: getAttendanceColor(parseFloat(attendanceData.overall)) }}
            >
              {getAttendanceStatus(parseFloat(attendanceData.overall))}
            </span>
          </div>
        </div>
      </div>

      <div className="attendance-grid">
        {/* Monthly Attendance */}
        <div className="section-box">
          <h3>📅 Monthly Attendance</h3>
          <div className="monthly-list">
            {monthlyAttendance.map((month, idx) => (
              <div key={idx} className="monthly-item">
                <div className="month-info">
                  <h5>{month.month}</h5>
                  <p className="attendance-details">
                    {month.attended} / {month.total} classes
                  </p>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${month.percentage}%`,
                      backgroundColor: getAttendanceColor(month.percentage),
                    }}
                  ></div>
                </div>
                <span className="percentage">{month.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject-wise Attendance */}
        <div className="section-box">
          <h3>📊 Subject-wise Attendance</h3>
          <div className="subject-list">
            {subjectAttendance.map((subject, idx) => (
              <div key={idx} className="subject-item">
                <div className="subject-info">
                  <h5>{subject.subject}</h5>
                  <p className="attendance-details">
                    {subject.attended} / {subject.total} classes
                  </p>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${subject.percentage}%`,
                      backgroundColor: getAttendanceColor(subject.percentage),
                    }}
                  ></div>
                </div>
                <span className="percentage">{subject.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Policy */}
      <div className="policy-box">
        <h3>📋 Attendance Policy</h3>
        <ul className="policy-list">
          <li>Minimum attendance required: <strong>75%</strong></li>
          <li>Below 75% attendance may lead to <strong>de-bar from examinations</strong></li>
          <li>Medical certificates are accepted for genuine sick leave</li>
          <li>Prior permission required for any authorized absence</li>
          <li>Attendance is marked on biometric system at the beginning of each class</li>
        </ul>
      </div>
    </div>
  )
}
