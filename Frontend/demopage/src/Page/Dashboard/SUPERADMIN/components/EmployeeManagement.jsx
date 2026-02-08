import React, { useState } from 'react'
import './EmployeeManagement.css'

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@org.com', department: 'IT', role: 'Senior Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@org.com', department: 'HR', role: 'HR Manager', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@org.com', department: 'Sales', role: 'Sales Lead', status: 'Active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@org.com', department: 'Finance', role: 'Accountant', status: 'Inactive' },
    { id: 5, name: 'Robert Brown', email: 'robert@org.com', department: 'IT', role: 'QA Engineer', status: 'Active' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    status: 'Active',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')

  const departments = ['IT', 'HR', 'Sales', 'Finance', 'Operations', 'Marketing']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEmployee = () => {
    if (formData.name && formData.email && formData.department && formData.role) {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
      }
      setEmployees((prev) => [newEmployee, ...prev])
      setFormData({ name: '', email: '', department: '', role: '', status: 'Active' })
      setShowForm(false)
    }
  }

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  const handleStatusToggle = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' } : emp
      )
    )
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === 'all' || emp.department === filterDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="employee-management">
      <div className="management-header">
        <h1>👥 Employee Management</h1>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Employee'}
        </button>
      </div>

      {/* Add Employee Form */}
      {showForm && (
        <div className="form-container">
          <h2>Add New Employee</h2>
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="role"
              placeholder="Job Role"
              value={formData.role}
              onChange={handleInputChange}
              className="form-input"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button className="btn-submit" onClick={handleAddEmployee}>
            Add Employee
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="filter-select">
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <span className="result-count">Found: {filteredEmployees.length} employees</span>
      </div>

      {/* Employees Table */}
      <div className="employees-table">
        <div className="table-header">
          <div className="col col-name">Name</div>
          <div className="col col-email">Email</div>
          <div className="col col-dept">Department</div>
          <div className="col col-role">Role</div>
          <div className="col col-status">Status</div>
          <div className="col col-action">Actions</div>
        </div>

        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div key={emp.id} className="table-row">
              <div className="col col-name">
                <div className="employee-avatar">{emp.name.charAt(0)}</div>
                {emp.name}
              </div>
              <div className="col col-email">{emp.email}</div>
              <div className="col col-dept">{emp.department}</div>
              <div className="col col-role">{emp.role}</div>
              <div className="col col-status">
                <span className={`status-badge ${emp.status.toLowerCase()}`}>{emp.status}</span>
              </div>
              <div className="col col-action">
                <button
                  className="btn-action edit"
                  onClick={() => handleStatusToggle(emp.id)}
                  title="Toggle Status"
                >
                  ⚡
                </button>
                <button
                  className="btn-action delete"
                  onClick={() => handleDeleteEmployee(emp.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>No employees found</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <h4>Total Employees</h4>
          <p className="big-number">{employees.length}</p>
        </div>
        <div className="summary-card">
          <h4>Active</h4>
          <p className="big-number green">{employees.filter((e) => e.status === 'Active').length}</p>
        </div>
        <div className="summary-card">
          <h4>Inactive</h4>
          <p className="big-number red">{employees.filter((e) => e.status === 'Inactive').length}</p>
        </div>
        <div className="summary-card">
          <h4>Departments</h4>
          <p className="big-number">{new Set(employees.map((e) => e.department)).size}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeManagement
