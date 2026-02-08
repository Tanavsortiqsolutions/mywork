import React, { useState } from 'react'
import './Settings.css'

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newsletter: true,
    theme: 'light',
    language: 'English',
    twoFactorAuth: false,
  })

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const handleSelectChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account preferences and notifications</p>
      </div>

      {/* Notification Preferences */}
      <div className="settings-section">
        <h3>🔔 Notification Preferences</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h5>Email Notifications</h5>
            <p>Receive notifications via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h5>SMS Notifications</h5>
            <p>Receive important updates via SMS</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleToggle('smsNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h5>Push Notifications</h5>
            <p>Enable push notifications in browser</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h5>Newsletter</h5>
            <p>Subscribe to college newsletter</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={() => handleToggle('newsletter')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="settings-section">
        <h3>🎨 Appearance</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h5>Theme</h5>
            <p>Choose your preferred theme</p>
          </div>
          <select
            className="select-dropdown"
            value={settings.theme}
            onChange={(e) => handleSelectChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h5>Language</h5>
            <p>Select your preferred language</p>
          </div>
          <select
            className="select-dropdown"
            value={settings.language}
            onChange={(e) => handleSelectChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>

      {/* Security Settings */}
      <div className="settings-section">
        <h3>🔒 Security</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h5>Two-Factor Authentication</h5>
            <p>Add an extra layer of security to your account</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle('twoFactorAuth')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <button className="btn-change-password">Change Password</button>
      </div>

      {/* Account Actions */}
      <div className="settings-section danger-zone">
        <h3>⚠️ Account Actions</h3>
        <button className="btn-danger">Reset Account Data</button>
        <button className="btn-danger delete">Delete Account Permanently</button>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn-save">💾 Save Changes</button>
      </div>
    </div>
  )
}