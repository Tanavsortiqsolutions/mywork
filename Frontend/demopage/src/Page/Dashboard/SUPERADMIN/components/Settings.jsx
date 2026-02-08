import React, { useState } from 'react'
import './Settings.css'

const SettingItem = ({ label, name, type = 'text', options = [], editMode, value, onChange }) => (
    <div className="setting-item">
      <label>{label}</label>
      {editMode ? (
        type === 'select' ? (
          <select name={name} value={value} onChange={onChange}>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
          />
        )
      ) : (
        <span className="setting-value">
          {type === 'checkbox' ? (value ? '✓ Enabled' : '✗ Disabled') : value}
        </span>
      )}
    </div>
  )

const Settings = () => {
  const [settings, setSettings] = useState({
    organizationName: 'ABC Corporation',
    email: 'admin@abccorp.com',
    phone: '+1-800-123-4567',
    address: '123 Business Street, City, Country',
    timezone: 'UTC-5',
    language: 'English',
    theme: 'Light',
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    dataBackup: true,
    backupFrequency: 'Daily',
  })

  const [editMode, setEditMode] = useState(false)
  const [tempSettings, setTempSettings] = useState(settings)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setTempSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = () => {
    setSettings(tempSettings)
    setEditMode(false)
  }

  const handleCancel = () => {
    setTempSettings(settings)
    setEditMode(false)
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>⚙️ Settings</h1>
        <button
          className={`btn-settings ${editMode ? 'cancel' : 'edit'}`}
          onClick={() => (editMode ? handleCancel() : setEditMode(true))}
        >
          {editMode ? '❌ Cancel' : '✏️ Edit Settings'}
        </button>
      </div>

      <div className="settings-content">
        {/* Organization Settings */}
        <section className="settings-section">
          <h2>🏢 Organization Settings</h2>
          <div className="settings-grid">
            <SettingItem label="Organization Name" name="organizationName" editMode={editMode} value={tempSettings.organizationName} onChange={handleInputChange} />
            <SettingItem label="Email" name="email" type="email" editMode={editMode} value={tempSettings.email} onChange={handleInputChange} />
            <SettingItem label="Phone" name="phone" editMode={editMode} value={tempSettings.phone} onChange={handleInputChange} />
            <SettingItem label="Address" name="address" editMode={editMode} value={tempSettings.address} onChange={handleInputChange} />
          </div>
        </section>

        {/* Preferences */}
        <section className="settings-section">
          <h2>🎨 Preferences</h2>
          <div className="settings-grid">
            <SettingItem
              label="Timezone"
              name="timezone"
              type="select"
              options={['UTC-8', 'UTC-5', 'UTC-0', 'UTC+1', 'UTC+5:30', 'UTC+8']}
              editMode={editMode}
              value={tempSettings.timezone}
              onChange={handleInputChange}
            />
            <SettingItem
              label="Language"
              name="language"
              type="select"
              options={['English', 'Spanish', 'French', 'German', 'Chinese']}
              editMode={editMode}
              value={tempSettings.language}
              onChange={handleInputChange}
            />
            <SettingItem
              label="Theme"
              name="theme"
              type="select"
              options={['Light', 'Dark', 'Auto']}
              editMode={editMode}
              value={tempSettings.theme}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Security Settings */}
        <section className="settings-section">
          <h2>🔒 Security Settings</h2>
          <div className="settings-grid">
            <SettingItem label="Two-Factor Authentication" name="twoFactorAuth" type="checkbox" editMode={editMode} value={tempSettings.twoFactorAuth} onChange={handleInputChange} />
            <button className="btn-change-password">Change Password</button>
          </div>
        </section>

        {/* Notification Settings */}
        <section className="settings-section">
          <h2>🔔 Notification Settings</h2>
          <div className="settings-grid">
            <SettingItem label="Email Notifications" name="emailNotifications" type="checkbox" editMode={editMode} value={tempSettings.emailNotifications} onChange={handleInputChange} />
            <SettingItem label="SMS Notifications" name="smsNotifications" type="checkbox" editMode={editMode} value={tempSettings.smsNotifications} onChange={handleInputChange} />
          </div>
        </section>

        {/* Backup Settings */}
        <section className="settings-section">
          <h2>💾 Backup & Storage</h2>
          <div className="settings-grid">
            <SettingItem label="Data Backup" name="dataBackup" type="checkbox" editMode={editMode} value={tempSettings.dataBackup} onChange={handleInputChange} />
            <SettingItem
              label="Backup Frequency"
              name="backupFrequency"
              type="select"
              options={['Hourly', 'Daily', 'Weekly', 'Monthly']}
              editMode={editMode}
              value={tempSettings.backupFrequency}
              onChange={handleInputChange}
            />
            <button className="btn-backup">🔄 Backup Now</button>
          </div>
        </section>

        {/* Actions */}
        <section className="settings-section">
          <h2>⚡ Quick Actions</h2>
          <div className="action-buttons">
            <button className="btn-action-primary">📊 Generate Report</button>
            <button className="btn-action-secondary">📥 Export Data</button>
            <button className="btn-action-danger">🗑️ Clear Cache</button>
          </div>
        </section>

        {/* Save Button */}
        {editMode && (
          <div className="settings-actions">
            <button className="btn-save" onClick={handleSave}>
              ✓ Save Settings
            </button>
          </div>
        )}
      </div>

      {/* System Information */}
      <div className="system-info">
        <h3>ℹ️ System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Version:</span>
            <span className="info-value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="info-label">Last Updated:</span>
            <span className="info-value">Feb 7, 2026</span>
          </div>
          <div className="info-item">
            <span className="info-label">Server Status:</span>
            <span className="info-value active">🟢 Online</span>
          </div>
          <div className="info-item">
            <span className="info-label">Database:</span>
            <span className="info-value active">🟢 Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
