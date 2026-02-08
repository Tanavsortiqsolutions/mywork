import React, { useState } from 'react'
import './AccountingStructure.css'

const AccountingStructure = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Main Account', type: 'Checking', balance: '$450,000', status: 'Active' },
    { id: 2, name: 'Savings Account', type: 'Savings', balance: '$850,000', status: 'Active' },
    { id: 3, name: 'Investment Account', type: 'Investment', balance: '$1,200,000', status: 'Active' },
  ])

  const expenses = [
    { id: 1, category: 'Salaries', amount: '$1,200,000', percentage: 35 },
    { id: 2, category: 'Operations', amount: '$400,000', percentage: 12 },
    { id: 3, category: 'Marketing', amount: '$250,000', percentage: 7 },
    { id: 4, category: 'Infrastructure', amount: '$300,000', percentage: 9 },
    { id: 5, category: 'R&D', amount: '$500,000', percentage: 15 },
    { id: 6, category: 'Others', amount: '$350,000', percentage: 22 },
  ]

  const budgets = [
    { id: 1, department: 'IT', allocated: '$500,000', spent: '$420,000', remaining: '$80,000' },
    { id: 2, department: 'HR', allocated: '$150,000', spent: '$120,000', remaining: '$30,000' },
    { id: 3, department: 'Sales', allocated: '$800,000', spent: '$680,000', remaining: '$120,000' },
    { id: 4, department: 'Finance', allocated: '$300,000', spent: '$250,000', remaining: '$50,000' },
  ]

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    balance: '',
  })

  const handleAddAccount = () => {
    if (formData.name && formData.type && formData.balance) {
      const newAccount = {
        id: accounts.length + 1,
        name: formData.name,
        type: formData.type,
        balance: formData.balance,
        status: 'Active',
      }
      setAccounts((prev) => [newAccount, ...prev])
      setFormData({ name: '', type: '', balance: '' })
      setShowForm(false)
    }
  }

  const handleDeleteAccount = (id) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id))
  }

  const totalBalance = accounts.reduce((sum, acc) => {
    const amount = parseFloat(acc.balance.replace(/[$,]/g, ''))
    return sum + amount
  }, 0)

  const totalSpent = expenses.reduce((sum, exp) => {
    const amount = parseFloat(exp.amount.replace(/[$,]/g, ''))
    return sum + amount
  }, 0)

  const totalBudget = budgets.reduce((sum, budget) => {
    const amount = parseFloat(budget.allocated.replace(/[$,]/g, ''))
    return sum + amount
  }, 0)

  return (
    <div className="accounting-structure">
      <div className="accounting-header">
        <h1>💰 Accounting & Money Structure</h1>
        <button className="btn-add-account" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Account'}
        </button>
      </div>

      {/* Add Account Form */}
      {showForm && (
        <div className="form-container">
          <h2>Add New Account</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Account Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="form-input"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
              className="form-select"
            >
              <option value="">Select Account Type</option>
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
              <option value="Investment">Investment</option>
              <option value="Loan">Loan</option>
            </select>
            <input
              type="text"
              placeholder="Balance (e.g., $500,000)"
              value={formData.balance}
              onChange={(e) => setFormData((prev) => ({ ...prev, balance: e.target.value }))}
              className="form-input"
            />
          </div>
          <button className="btn-submit" onClick={handleAddAccount}>
            Create Account
          </button>
        </div>
      )}

      {/* Financial Overview Cards */}
      <div className="financial-overview">
        <div className="overview-card">
          <h3>💳 Total Assets</h3>
          <p className="big-number">${(totalBalance / 1000000).toFixed(2)}M</p>
          <span className="card-subtitle">{accounts.length} accounts</span>
        </div>
        <div className="overview-card">
          <h3>📊 Total Budget</h3>
          <p className="big-number">${(totalBudget / 1000000).toFixed(2)}M</p>
          <span className="card-subtitle">{budgets.length} departments</span>
        </div>
        <div className="overview-card">
          <h3>💸 Total Expenses</h3>
          <p className="big-number">${(totalSpent / 1000000).toFixed(2)}M</p>
          <span className="card-subtitle">{expenses.length} categories</span>
        </div>
        <div className="overview-card">
          <h3>📈 Net Balance</h3>
          <p className="big-number green">${((totalBalance - totalSpent) / 1000000).toFixed(2)}M</p>
          <span className="card-subtitle">Available funds</span>
        </div>
      </div>

      {/* Accounts Section */}
      <div className="section">
        <h2>Bank Accounts</h2>
        <div className="accounts-grid">
          {accounts.map((acc) => (
            <div key={acc.id} className="account-card">
              <div className="account-header">
                <h3>🏦 {acc.name}</h3>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteAccount(acc.id)}
                  title="Delete Account"
                >
                  🗑️
                </button>
              </div>
              <div className="account-detail">
                <label>Type:</label>
                <span>{acc.type}</span>
              </div>
              <div className="account-detail">
                <label>Balance:</label>
                <span className="balance-amount">{acc.balance}</span>
              </div>
              <div className="account-detail">
                <label>Status:</label>
                <span className="status-badge active">{acc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="section">
        <h2>Department Budget Allocation</h2>
        <div className="budget-table">
          <div className="table-header">
            <div className="col col-dept">Department</div>
            <div className="col col-allocated">Allocated</div>
            <div className="col col-spent">Spent</div>
            <div className="col col-remaining">Remaining</div>
            <div className="col col-progress">Progress</div>
          </div>

          {budgets.map((budget) => {
            const allocated = parseFloat(budget.allocated.replace(/[$,]/g, ''))
            const spent = parseFloat(budget.spent.replace(/[$,]/g, ''))
            const percentage = (spent / allocated) * 100
            return (
              <div key={budget.id} className="table-row">
                <div className="col col-dept">📂 {budget.department}</div>
                <div className="col col-allocated">{budget.allocated}</div>
                <div className="col col-spent">{budget.spent}</div>
                <div className="col col-remaining">{budget.remaining}</div>
                <div className="col col-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="percentage">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Expenses Breakdown */}
      <div className="section">
        <h2>Expense Categories Breakdown</h2>
        <div className="expenses-container">
          <div className="expenses-list">
            {expenses.map((exp) => (
              <div key={exp.id} className="expense-item">
                <div className="expense-info">
                  <h4>{exp.category}</h4>
                  <span className="expense-amount">{exp.amount}</span>
                </div>
                <div className="expense-bar">
                  <div className="bar-fill" style={{ width: `${exp.percentage}%` }}></div>
                </div>
                <span className="percentage">{exp.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Pie Chart Visual */}
          <div className="pie-chart-container">
            <div className="pie-chart">
              {expenses.map((exp, idx) => {
                const angle = (exp.percentage / 100) * 360
                const colors = ['#e74c3c', '#3498db', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c']
                return (
                  <div
                    key={idx}
                    className="pie-slice"
                    style={{
                      background: colors[idx % colors.length],
                      transform: `rotate(${idx * angle}deg)`,
                    }}
                  ></div>
                )
              })}
            </div>
            <div className="pie-legend">
              {expenses.map((exp, idx) => {
                const colors = ['#e74c3c', '#3498db', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c']
                return (
                  <div key={idx} className="legend-item">
                    <span className="legend-color" style={{ background: colors[idx % colors.length] }}></span>
                    <span>{exp.category}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="financial-summary">
        <h2>Financial Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Total Income</span>
            <span className="value">${(totalBalance / 1000000).toFixed(2)}M</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Expenses</span>
            <span className="value red">${(totalSpent / 1000000).toFixed(2)}M</span>
          </div>
          <div className="summary-item">
            <span className="label">Net Income</span>
            <span className="value green">${((totalBalance - totalSpent) / 1000000).toFixed(2)}M</span>
          </div>
          <div className="summary-item">
            <span className="label">Profit Margin</span>
            <span className="value green">{(((totalBalance - totalSpent) / totalBalance) * 100).toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountingStructure
