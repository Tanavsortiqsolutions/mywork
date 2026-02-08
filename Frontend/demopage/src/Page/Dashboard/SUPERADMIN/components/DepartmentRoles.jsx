import React, { useState } from 'react'
import './DepartmentRoles.css'

const DepartmentRoles = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'IT',
      budget: '$500,000',
      roles: ['Senior Developer', 'Junior Developer', 'QA Engineer', 'DevOps Engineer'],
    },
    {
      id: 2,
      name: 'HR',
      budget: '$150,000',
      roles: ['HR Manager', 'Recruiter', 'HR Specialist'],
    },
    {
      id: 3,
      name: 'Sales',
      budget: '$800,000',
      roles: ['Sales Manager', 'Sales Executive', 'Sales Lead'],
    },
    {
      id: 4,
      name: 'Finance',
      budget: '$300,000',
      roles: ['Accountant', 'Finance Manager', 'Auditor'],
    },
  ])

  const [showDeptForm, setShowDeptForm] = useState(false)
  const [showRoleForm, setShowRoleForm] = useState(false)
  const [selectedDept, setSelectedDept] = useState(null)

  const [deptData, setDeptData] = useState({
    name: '',
    budget: '',
  })

  const [roleData, setRoleData] = useState({
    role: '',
  })

  const handleAddDepartment = () => {
    if (deptData.name && deptData.budget) {
      const newDept = {
        id: departments.length + 1,
        name: deptData.name,
        budget: deptData.budget,
        roles: [],
      }
      setDepartments((prev) => [newDept, ...prev])
      setDeptData({ name: '', budget: '' })
      setShowDeptForm(false)
    }
  }

  const handleAddRole = () => {
    if (roleData.role && selectedDept) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === selectedDept.id ? { ...dept, roles: [...dept.roles, roleData.role] } : dept
        )
      )
      setRoleData({ role: '' })
      setShowRoleForm(false)
      setSelectedDept((prev) => ({
        ...prev,
        roles: [...prev.roles, roleData.role],
      }))
    }
  }

  const handleDeleteDepartment = (id) => {
    setDepartments((prev) => prev.filter((dept) => dept.id !== id))
    if (selectedDept?.id === id) setSelectedDept(null)
  }

  const handleDeleteRole = (deptId, role) => {
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.id === deptId ? { ...dept, roles: dept.roles.filter((r) => r !== role) } : dept
      )
    )
    if (selectedDept?.id === deptId) {
      setSelectedDept((prev) => ({
        ...prev,
        roles: prev.roles.filter((r) => r !== role),
      }))
    }
  }

  return (
    <div className="department-roles">
      <div className="section-header">
        <h1>🏢 Department & Roles Management</h1>
        <button className="btn-primary" onClick={() => setShowDeptForm(!showDeptForm)}>
          {showDeptForm ? '❌ Cancel' : '➕ Add Department'}
        </button>
      </div>

      {/* Add Department Form */}
      {showDeptForm && (
        <div className="form-section">
          <h2>Add New Department</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Department Name"
              value={deptData.name}
              onChange={(e) => setDeptData((prev) => ({ ...prev, name: e.target.value }))}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Budget (e.g., $500,000)"
              value={deptData.budget}
              onChange={(e) => setDeptData((prev) => ({ ...prev, budget: e.target.value }))}
              className="form-input"
            />
            <button className="btn-submit" onClick={handleAddDepartment}>
              Create Department
            </button>
          </div>
        </div>
      )}

      <div className="departments-container">
        {/* Departments List */}
        <div className="departments-list">
          <h2>All Departments ({departments.length})</h2>
          <div className="dept-cards">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={`dept-card ${selectedDept?.id === dept.id ? 'selected' : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                <div className="dept-card-header">
                  <h3>🏢 {dept.name}</h3>
                  <button
                    className="btn-delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteDepartment(dept.id)
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <div className="dept-info">
                  <span className="info-label">Budget:</span>
                  <span className="info-value">{dept.budget}</span>
                </div>
                <div className="dept-info">
                  <span className="info-label">Roles:</span>
                  <span className="info-value">{dept.roles.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Section */}
        {selectedDept ? (
          <div className="roles-section">
            <div className="roles-header">
              <h2>Roles in {selectedDept.name}</h2>
              <button className="btn-secondary" onClick={() => setShowRoleForm(!showRoleForm)}>
                {showRoleForm ? '❌ Cancel' : '➕ Add Role'}
              </button>
            </div>

            {showRoleForm && (
              <div className="form-section">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="New Role (e.g., Manager, Developer)"
                    value={roleData.role}
                    onChange={(e) => setRoleData({ role: e.target.value })}
                    className="form-input"
                  />
                  <button className="btn-submit" onClick={handleAddRole}>
                    Add Role
                  </button>
                </div>
              </div>
            )}

            <div className="roles-list">
              {selectedDept.roles.length > 0 ? (
                selectedDept.roles.map((role, idx) => (
                  <div key={idx} className="role-item">
                    <span className="role-icon">👤</span>
                    <span className="role-name">{role}</span>
                    <button
                      className="btn-remove"
                      onClick={() => handleDeleteRole(selectedDept.id, role)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-roles">No roles assigned. Add one to get started!</p>
              )}
            </div>

            {/* Role Statistics */}
            <div className="role-stats">
              <div className="stat-box">
                <h4>Total Roles</h4>
                <p className="stat-value">{selectedDept.roles.length}</p>
              </div>
              <div className="stat-box">
                <h4>Department Budget</h4>
                <p className="stat-value">{selectedDept.budget}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-selection">
            <p>👈 Select a department to manage its roles</p>
          </div>
        )}
      </div>

      {/* Department Overview */}
      <div className="overview-section">
        <h2>Department Overview</h2>
        <div className="overview-table">
          <div className="table-header">
            <div className="col col-name">Department</div>
            <div className="col col-budget">Budget</div>
            <div className="col col-roles">Total Roles</div>
          </div>
          {departments.map((dept) => (
            <div key={dept.id} className="table-row">
              <div className="col col-name">🏢 {dept.name}</div>
              <div className="col col-budget">{dept.budget}</div>
              <div className="col col-roles">{dept.roles.length} roles</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DepartmentRoles
