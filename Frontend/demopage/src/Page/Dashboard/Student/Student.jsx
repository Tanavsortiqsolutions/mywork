import React, { useState } from 'react'
import Header from '../../../Components/Header/Header'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Profile from './components/Profile'
import Attendance from './components/Attendance'
import Homework from './components/Homework'
import Notice from './components/Notice'
import Announcement from './components/Announcement'
import FeeLedger from './components/FeeLedger'
import Result from './components/Result'
import Notifications from './components/Notifications'
import Settings from './components/Settings'
import './Student.css'

const menuItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'attendance', label: 'Attendance', icon: '📅' },
  { key: 'homework', label: 'Homework', icon: '📝' },
  { key: 'notice', label: 'Notice', icon: '📢' },
  { key: 'announcement', label: 'Announcement', icon: '📣' },
  { key: 'fee', label: 'Fee Ledger', icon: '💳' },
  { key: 'result', label: 'Result', icon: '🏆' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
]

const views = {
  home: <Home />,
  profile: <Profile />,
  attendance: <Attendance />,
  homework: <Homework />,
  notice: <Notice />,
  announcement: <Announcement />,
  fee: <FeeLedger />,
  result: <Result />,
  notifications: <Notifications />,
  settings: <Settings />,
}

const Student = () => {
  const [active, setActive] = useState('home')
  const [collapsed, setCollapsed] = useState(false)

  return (
	<div className="student-dashboard">

	  <div className="dashboard-body">
		<Sidebar
		  menuItems={menuItems}
		  active={active}
		  setActive={setActive}
		  collapsed={collapsed}
		  setCollapsed={setCollapsed}
		/>

		<main className="content">
		  <header className="content-header">
			<h2>{menuItems.find((m) => m.key === active)?.label || 'Dashboard'}</h2>
		  </header>
		  <section className="content-body">{views[active] || <Home />}</section>
		</main>
	  </div>
	</div>
  )
}

export default Student

