import React, { useState } from 'react'
import './FeeLedger.css'

export default function FeeLedger() {
  const [feeData] = useState({
    totalFee: 150000,
    paidAmount: 100000,
    pendingAmount: 50000,
  })

  const [feeTransactions] = useState([
    { id: 1, description: 'Tuition Fee - Semester 3', amount: 60000, date: '2025-08-15', status: 'Paid' },
    { id: 2, description: 'Tuition Fee - Semester 4', amount: 40000, date: '2026-01-10', status: 'Paid' },
    { id: 3, description: 'Lab Fee', amount: 5000, date: '2026-01-10', status: 'Paid' },
    { id: 4, description: 'Semester 5 Fee (Advance)', amount: 60000, date: '2026-03-15', status: 'Pending' },
    { id: 5, description: 'Sports Fee', amount: 2000, date: '2026-03-15', status: 'Pending' },
  ])

  const percentagePaid = ((feeData.paidAmount / feeData.totalFee) * 100).toFixed(1)

  return (
    <div className="fee-ledger-container">
      <div className="fee-header">
        <h1>💳 Fee Ledger</h1>
      </div>

      {/* Fee Summary Cards */}
      <div className="fee-cards">
        <div className="fee-card total">
          <h4>Total Fee</h4>
          <p className="amount">₹{feeData.totalFee.toLocaleString()}</p>
        </div>
        <div className="fee-card paid">
          <h4>Paid Amount</h4>
          <p className="amount">₹{feeData.paidAmount.toLocaleString()}</p>
          <span className="percentage">{percentagePaid}%</span>
        </div>
        <div className="fee-card pending">
          <h4>Pending Amount</h4>
          <p className="amount">₹{feeData.pendingAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-label">
          <span>Fee Payment Progress</span>
          <span>{percentagePaid}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentagePaid}%` }}></div>
        </div>
      </div>

      {/* Fee Transactions */}
      <div className="transactions-section">
        <h3>History</h3>
        <div className="transaction-table">
          <div className="table-header">
            <div className="col col-desc">Description</div>
            <div className="col col-amount">Amount</div>
            <div className="col col-date">Date</div>
            <div className="col col-status">Status</div>
          </div>
          {feeTransactions.map((trans) => (
            <div key={trans.id} className="table-row">
              <div className="col col-desc">{trans.description}</div>
              <div className="col col-amount">₹{trans.amount.toLocaleString()}</div>
              <div className="col col-date">{trans.date}</div>
              <div className="col col-status">
                <span className={`status-badge ${trans.status.toLowerCase()}`}>{trans.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Dates */}
      <div className="important-dates">
        <h3>📅 Important Dates</h3>
        <ul>
          <li><strong>Fee Due Date:</strong> February 28, 2026</li>
          <li><strong>Late Fee Charges:</strong> 5% after due date</li>
          <li><strong>Scholarship Deadline:</strong> March 15, 2026</li>
        </ul>
      </div>
    </div>
  )
}
