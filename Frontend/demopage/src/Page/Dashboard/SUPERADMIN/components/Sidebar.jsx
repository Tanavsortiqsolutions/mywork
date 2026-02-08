import React from 'react'
import './Sidebar.css'

const Sidebar = ({ menuItems, active, setActive, collapsed, setCollapsed }) => {
  return (
    <div className={`superadmin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
        {!collapsed && <h2 className="sidebar-title">SUPERADMIN</h2>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${active === item.key ? 'active' : ''}`}
            onClick={() => setActive(item.key)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👨‍💼</div>
          {!collapsed && (
            <div className="user-details">
              <p className="user-name">Admin</p>
              <p className="user-role">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
