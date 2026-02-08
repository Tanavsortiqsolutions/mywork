import React, { useState } from 'react'
import './Result.css'

export default function Result() {
  const [results] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      code: 'CS201',
      semester: 'Sem 3',
      credits: 4,
      marks: 87,
      outOf: 100,
      grade: 'A',
      status: 'Pass',
    },
    {
      id: 2,
      subject: 'Web Development',
      code: 'CS202',
      semester: 'Sem 3',
      credits: 3,
      marks: 92,
      outOf: 100,
      grade: 'A+',
      status: 'Pass',
    },
    {
      id: 3,
      subject: 'Database Management',
      code: 'CS203',
      semester: 'Sem 3',
      credits: 4,
      marks: 78,
      outOf: 100,
      grade: 'B+',
      status: 'Pass',
    },
    {
      id: 4,
      subject: 'Operating Systems',
      code: 'CS204',
      semester: 'Sem 3',
      credits: 4,
      marks: 85,
      outOf: 100,
      grade: 'A',
      status: 'Pass',
    },
  ])

  const semesterData = [
    { semester: 'Sem 1', sgpa: 8.2, cgpa: 8.2 },
    { semester: 'Sem 2', sgpa: 8.5, cgpa: 8.35 },
    { semester: 'Sem 3', sgpa: 8.6, cgpa: 8.43 },
  ]

  const getGradeColor = (grade) => {
    const colors = {
      'A+': '#27ae60',
      'A': '#27ae60',
      'B+': '#f39c12',
      'B': '#f39c12',
      'C': '#e74c3c',
    }
    return colors[grade] || '#95a5a6'
  }

  return (
    <div className="result-container">
      <div className="result-header">
        <h1>🏆 Academic Results</h1>
      </div>

      {/* CGPA and SGPA Summary */}
      <div className="cgpa-section">
        <div className="cgpa-card">
          <h4>Current CGPA</h4>
          <p className="large-number">8.43</p>
          <span className="out-of">out of 10</span>
        </div>
        <div className="cgpa-card">
          <h4>Semester SGPA</h4>
          <p className="large-number">8.6</p>
          <span className="out-of">Sem 3</span>
        </div>
        <div className="cgpa-card">
          <h4>Credits Earned</h4>
          <p className="large-number">45</p>
          <span className="out-of">out of 120</span>
        </div>
      </div>

      {/* Semester Performance */}
      <div className="semester-section">
        <h3>Semester Performance</h3>
        <div className="semester-grid">
          {semesterData.map((sem, idx) => (
            <div key={idx} className="semester-card">
              <p className="semester-name">{sem.semester}</p>
              <div className="semester-stats">
                <div className="stat">
                  <span className="label">SGPA</span>
                  <span className="value">{sem.sgpa}</span>
                </div>
                <div className="stat">
                  <span className="label">CGPA</span>
                  <span className="value">{sem.cgpa}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Results */}
      <div className="results-section">
        <h3>Current Semester Results</h3>
        <div className="results-table">
          <div className="table-header">
            <div className="col col-subject">Subject</div>
            <div className="col col-code">Code</div>
            <div className="col col-credits">Credits</div>
            <div className="col col-marks">Marks</div>
            <div className="col col-grade">Grade</div>
            <div className="col col-status">Status</div>
          </div>
          {results.map((result) => (
            <div key={result.id} className="table-row">
              <div className="col col-subject">{result.subject}</div>
              <div className="col col-code">{result.code}</div>
              <div className="col col-credits">{result.credits}</div>
              <div className="col col-marks">{result.marks}/{result.outOf}</div>
              <div className="col col-grade">
                <span className="grade-badge" style={{ background: getGradeColor(result.grade) }}>
                  {result.grade}
                </span>
              </div>
              <div className="col col-status">
                <span className="status-badge">{result.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
