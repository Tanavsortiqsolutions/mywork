import React, { useState } from 'react'
import './Sidebar.css'

const Sidebar = ({ menuItems, active, setActive, collapsed, setCollapsed }) => {
  const [expandedMenu, setExpandedMenu] = useState(null)
  const [selectedSubMenu, setSelectedSubMenu] = useState(null)

  const organizationSubOptions = [
    { key: 'register', label: 'Register Organization', icon: '📝' },
    { key: 'list', label: 'List of Organizations', icon: '📋' },
    { key: 'enquiry', label: 'Organization Enquiry', icon: '❓' },
  ]

  const handleMenuClick = (key) => {
    if (key === 'organization') {
      setExpandedMenu(expandedMenu === 'organization' ? null : 'organization')
      setActive(key)
    } else {
      setActive(key)
      setExpandedMenu(null)
    }
  }

  const handleSubMenuClick = (key) => {
    setSelectedSubMenu(key)
    setActive('organization')
  }

  return (
    <aside className={`master-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-text">🎯</span>
          {!collapsed && <h3>Master Panel</h3>}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.key} className="nav-item-wrapper">
            <button
              className={`nav-item ${active === item.key ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.key)}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {item.hasSubmenu && !collapsed && (
                <span className={`submenu-arrow ${expandedMenu === item.key ? 'expanded' : ''}`}>
                  ▼
                </span>
              )}
            </button>

            {/* Submenu */}
            {item.hasSubmenu && expandedMenu === item.key && !collapsed && (
              <div className="submenu">
                {organizationSubOptions.map((subOption) => (
                  <button
                    key={subOption.key}
                    className={`submenu-item ${selectedSubMenu === subOption.key ? 'active' : ''}`}
                    onClick={() => handleSubMenuClick(subOption.key)}
                  >
                    <span className="submenu-icon">{subOption.icon}</span>
                    <span className="submenu-label">{subOption.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Collapsed Submenu Popup */}
            {item.hasSubmenu && collapsed && (
              <div className="submenu-cards">
                {organizationSubOptions.map((subOption) => (
                  <div
                    key={subOption.key}
                    className={`submenu-card ${selectedSubMenu === subOption.key ? 'active' : ''}`}
                    onClick={() => handleSubMenuClick(subOption.key)}
                    title={subOption.label}
                  >
                    <span className="card-icon">{subOption.icon}</span>
                    <p className="card-label">{subOption.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-user">
          <img src="https://i.pinimg.com/736x/0d/64/98/0d64989794a4d215be40110e42b0452f.jpg" alt="Admin" />
          {!collapsed && (
            <div className="user-info">
              <p className="user_name">Admin Panel</p>
              <p className="user_role">Master Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
