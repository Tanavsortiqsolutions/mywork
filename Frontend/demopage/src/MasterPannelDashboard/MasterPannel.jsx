import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Organization from './components/Organization'
import './MasterPannel.css'

const menuItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'organization', label: 'Organization', icon: '🏢', hasSubmenu: true },
]

const views = {
  dashboard: <Dashboard />,
  organization: <Organization />,
}

const MasterPannel = () => {
  const [active, setActive] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="master-panel">
      <div className="panel-body">
        <Sidebar
          menuItems={menuItems}
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="panel-content">
          <header className="content-header">
            <h2>{menuItems.find((m) => m.key === active)?.label || 'Dashboard'}</h2>
          </header>
          <section className="content-area">{views[active] || <Dashboard />}</section>
        </main>
      </div>
    </div>
  )
}

export default MasterPannel
