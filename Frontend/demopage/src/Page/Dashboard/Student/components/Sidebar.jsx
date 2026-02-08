import React from 'react'
import './Sidebar.css'

const Sidebar = ({ menuItems, active, setActive, collapsed, setCollapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        {!collapsed && <div className="brand">📚 Student Portal</div>}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`menu-item ${active === item.key ? 'active' : ''}`}
            onClick={() => setActive(item.key)}
            title={collapsed ? item.label : ''}
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-info">
            <div className="user-avatar">JD</div>
            <div className="user-details">
              <p className="user-name">John Doe</p>
              <p className="user-role">Student</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
