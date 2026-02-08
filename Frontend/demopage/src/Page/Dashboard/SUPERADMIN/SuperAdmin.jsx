import React, { useState } from 'react'
import Header from '../../../Components/Header/Header'
import Sidebar from './components/Sidebar'
import Analytics from './components/Analytics'
import EmployeeManagement from './components/EmployeeManagement'
import DepartmentRoles from './components/DepartmentRoles'
import AccountingStructure from './components/AccountingStructure'
import Announcements from './components/Announcements'
import RoleUserManagement from './components/RoleUserManagement'
import Settings from './components/Settings'
import './SUPERADMIN.css'

const menuItems = [
  { key: 'analytics', label: 'Analytics', icon: '📊' },
  { key: 'employees', label: 'Employees', icon: '👥' },
  { key: 'departments', label: 'Departments & Roles', icon: '🏢' },
  { key: 'accounting', label: 'Accounting Structure', icon: '💰' },
  { key: 'announcements', label: 'Announcements', icon: '📣' },
  { key: 'roles', label: 'Roles & Users', icon: '👤' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
]

const views = {
  analytics: <Analytics />,
  employees: <EmployeeManagement />,
  departments: <DepartmentRoles />,
  accounting: <AccountingStructure />,
  announcements: <Announcements />,
  roles: <RoleUserManagement />,
  settings: <Settings />,
}

const SuperAdmin = () => {
  const [active, setActive] = useState('analytics')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="superadmin-dashboard">
    
      <div className="dashboard-body">
        <Sidebar
          menuItems={menuItems}
          active={active}
          setActive={setActive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="dashboard-content">
          {views[active]}
        </div>
      </div>
    </div>
  )
}

export default SuperAdmin
