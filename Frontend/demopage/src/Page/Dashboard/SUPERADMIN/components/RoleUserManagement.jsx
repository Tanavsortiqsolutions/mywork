import React, { useState } from 'react'
import './RoleUserManagement.css'

const RoleUserManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['View All', 'Create', 'Edit', 'Delete'], users: 2 },
    { id: 2, name: 'Manager', permissions: ['View All', 'Create', 'Edit'], users: 5 },
    { id: 3, name: 'Editor', permissions: ['View All', 'Edit'], users: 8 },
    { id: 4, name: 'Viewer', permissions: ['View All'], users: 15 },
  ])

  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@college.com', role: 'Admin', status: 'Active', department: 'IT' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@college.com', role: 'Manager', status: 'Active', department: 'HR' },
    { id: 3, name: 'Mike Editor', email: 'mike@college.com', role: 'Editor', status: 'Active', department: 'Operations' },
    { id: 4, name: 'Emma Viewer', email: 'emma@college.com', role: 'Viewer', status: 'Inactive', department: 'Finance' },
    { id: 5, name: 'David Editor', email: 'david@college.com', role: 'Editor', status: 'Active', department: 'Marketing' },
  ])

  const [showRoleForm, setShowRoleForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedRoleView, setSelectedRoleView] = useState(null)

  const [roleFormData, setRoleFormData] = useState({
    name: '',
    permissions: [],
  })

  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer',
    department: '',
    status: 'Active',
  })

  const availablePermissions = ['View All', 'Create', 'Edit', 'Delete', 'Manage Users', 'Configure Settings', 'Report Generation', 'Analytics Access']
  const departments = ['IT', 'HR', 'Sales', 'Finance', 'Operations', 'Marketing']

  const handleRoleInputChange = (e) => {
    const { name, value, checked } = e.target
    if (name === 'permissions') {
      setRoleFormData((prev) => ({
        ...prev,
        permissions: checked
          ? [...prev.permissions, value]
          : prev.permissions.filter((p) => p !== value),
      }))
    } else {
      setRoleFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleUserInputChange = (e) => {
    const { name, value } = e.target
    setUserFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddRole = () => {
    if (roleFormData.name && roleFormData.permissions.length > 0) {
      const newRole = {
        id: roles.length + 1,
        name: roleFormData.name,
        permissions: roleFormData.permissions,
        users: 0,
      }
      setRoles((prev) => [newRole, ...prev])
      setRoleFormData({ name: '', permissions: [] })
      setShowRoleForm(false)
    }
  }

  const handleAddUser = () => {
    if (userFormData.name && userFormData.email && userFormData.role && userFormData.department) {
      const newUser = {
        id: users.length + 1,
        ...userFormData,
      }
      setUsers((prev) => [newUser, ...prev])
      const updatedRoles = roles.map((role) =>
        role.name === userFormData.role ? { ...role, users: role.users + 1 } : role
      )
      setRoles(updatedRoles)
      setUserFormData({ name: '', email: '', role: 'Viewer', department: '', status: 'Active' })
      setShowUserForm(false)
    }
  }

  const handleDeleteRole = (id) => {
    setRoles((prev) => prev.filter((role) => role.id !== id))
    if (selectedRoleView?.id === id) setSelectedRoleView(null)
  }

  const handleDeleteUser = (id) => {
    const userToDelete = users.find((u) => u.id === id)
    if (userToDelete) {
      const updatedRoles = roles.map((role) =>
        role.name === userToDelete.role ? { ...role, users: Math.max(0, role.users - 1) } : role
      )
      setRoles(updatedRoles)
    }
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const handleToggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
      )
    )
  }

  return (
    <div className="role-user-management">
      <div className="management-header">
        <h1>👥 Role & User Management</h1>
        <div className="header-actions">
          <button className="btn-add-role" onClick={() => setShowRoleForm(!showRoleForm)}>
            {showRoleForm ? '❌ Cancel' : '➕ Add Role'}
          </button>
          <button className="btn-add-user" onClick={() => setShowUserForm(!showUserForm)}>
            {showUserForm ? '❌ Cancel' : '➕ Add User'}
          </button>
        </div>
      </div>

      {/* Add Role Form */}
      {showRoleForm && (
        <div className="form-section role-form">
          <h2>Create New Role</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Role Name (e.g., Moderator, Supervisor)"
              value={roleFormData.name}
              onChange={handleRoleInputChange}
              className="form-input"
            />
            <div className="permissions-group">
              <label className="group-label">Assign Permissions:</label>
              <div className="permissions-grid">
                {availablePermissions.map((perm) => (
                  <label key={perm} className="permission-checkbox">
                    <input
                      type="checkbox"
                      name="permissions"
                      value={perm}
                      checked={roleFormData.permissions.includes(perm)}
                      onChange={handleRoleInputChange}
                    />
                    <span>{perm}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="btn-submit" onClick={handleAddRole}>
              Create Role
            </button>
          </div>
        </div>
      )}

      {/* Add User Form */}
      {showUserForm && (
        <div className="form-section user-form">
          <h2>Create New User</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userFormData.name}
              onChange={handleUserInputChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userFormData.email}
              onChange={handleUserInputChange}
              className="form-input"
            />
            <select
              name="role"
              value={userFormData.role}
              onChange={handleUserInputChange}
              className="form-select"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <select
              name="department"
              value={userFormData.department}
              onChange={handleUserInputChange}
              className="form-select"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <button className="btn-submit" onClick={handleAddUser}>
              Create User
            </button>
          </div>
        </div>
      )}

      <div className="management-content">
        {/* Roles Section */}
        <div className="roles-section">
          <h2>Roles ({roles.length})</h2>
          <div className="roles-grid">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`role-card ${selectedRoleView?.id === role.id ? 'selected' : ''}`}
                onClick={() => setSelectedRoleView(role)}
              >
                <div className="role-card-header">
                  <h3>🔐 {role.name}</h3>
                  <button
                    className="btn-delete-role"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteRole(role.id)
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <div className="role-stats">
                  <span className="users-count">👥 {role.users} users</span>
                  <span className="permissions-count">✓ {role.permissions.length} permissions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Details */}
        {selectedRoleView && (
          <div className="role-details">
            <h3>Permissions for {selectedRoleView.name}</h3>
            <div className="permissions-list">
              {selectedRoleView.permissions.map((perm, idx) => (
                <div key={idx} className="permission-item">
                  <span className="check-icon">✓</span>
                  <span>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Users Section */}
      <div className="users-section">
        <h2>Users ({users.length})</h2>
        <div className="users-table">
          <div className="table-header">
            <div className="col col-name">Name</div>
            <div className="col col-email">Email</div>
            <div className="col col-role">Role</div>
            <div className="col col-dept">Department</div>
            <div className="col col-status">Status</div>
            <div className="col col-action">Actions</div>
          </div>

          {users.map((user) => (
            <div key={user.id} className="table-row">
              <div className="col col-name">
                <div className="user-avatar">{user.name.charAt(0)}</div>
                {user.name}
              </div>
              <div className="col col-email">{user.email}</div>
              <div className="col col-role">
                <span className="role-badge">{user.role}</span>
              </div>
              <div className="col col-dept">{user.department}</div>
              <div className="col col-status">
                <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
              </div>
              <div className="col col-action">
                <button
                  className="btn-action-toggle"
                  onClick={() => handleToggleUserStatus(user.id)}
                  title="Toggle Status"
                >
                  ⚡
                </button>
                <button
                  className="btn-action-delete-user"
                  onClick={() => handleDeleteUser(user.id)}
                  title="Delete User"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="management-stats">
        <div className="stat-box">
          <h4>Total Roles</h4>
          <p className="stat-num">{roles.length}</p>
        </div>
        <div className="stat-box">
          <h4>Total Users</h4>
          <p className="stat-num">{users.length}</p>
        </div>
        <div className="stat-box">
          <h4>Active Users</h4>
          <p className="stat-num green">{users.filter((u) => u.status === 'Active').length}</p>
        </div>
        <div className="stat-box">
          <h4>Inactive Users</h4>
          <p className="stat-num red">{users.filter((u) => u.status === 'Inactive').length}</p>
        </div>
      </div>
    </div>
  )
}

export default RoleUserManagement
