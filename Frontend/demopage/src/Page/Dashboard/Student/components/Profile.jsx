import React, { useState } from 'react'
import './Profile.css'

export default function Profile() {
  const [student] = useState({
    name: 'John Doe',
    email: 'john.doe@college.com',
    phone: '+1 (555) 123-4567',
    roll: 'CSE-2022-001',
    class: 'B.Tech Computer Science',
    semester: '4th Semester',
    branch: 'Computer Science & Engineering',
    dob: '2004-05-15',
    gender: 'Male',
    address: '123 Main Street, City, State 12345',
    parentName: 'Jane Doe',
    parentPhone: '+1 (555) 987-6543',
    bloodGroup: 'O+',
    caste: 'General',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(student)

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value })
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">{student.name.charAt(0)}</div>
          <div className="profile-title">
            <h2>{student.name}</h2>
            <p className="profile-subtitle">{student.roll}</p>
          </div>
        </div>
        <button
          className={`edit-btn ${isEditing ? 'saving' : ''}`}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? '✅ Save' : '✏️ Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        {/* Academic Information */}
        <div className="section">
          <h3>📚 Academic Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Class</label>
              <p>{isEditing ? <input disabled value={editData.class} /> : student.class}</p>
            </div>
            <div className="info-item">
              <label>Semester</label>
              <p>{isEditing ? <input disabled value={editData.semester} /> : student.semester}</p>
            </div>
            <div className="info-item">
              <label>Branch</label>
              <p>{isEditing ? <input disabled value={editData.branch} /> : student.branch}</p>
            </div>
            <div className="info-item">
              <label>Roll Number</label>
              <p>{isEditing ? <input disabled value={editData.roll} /> : student.roll}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="section">
          <h3>👤 Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <p>
                {isEditing ? (
                  <input value={editData.name} onChange={(e) => handleChange('name', e.target.value)} />
                ) : (
                  student.name
                )}
              </p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>
                {isEditing ? (
                  <input value={editData.email} onChange={(e) => handleChange('email', e.target.value)} />
                ) : (
                  student.email
                )}
              </p>
            </div>
            <div className="info-item">
              <label>Phone</label>
              <p>
                {isEditing ? (
                  <input value={editData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                ) : (
                  student.phone
                )}
              </p>
            </div>
            <div className="info-item">
              <label>Date of Birth</label>
              <p>
                {isEditing ? (
                  <input value={editData.dob} onChange={(e) => handleChange('dob', e.target.value)} />
                ) : (
                  student.dob
                )}
              </p>
            </div>
            <div className="info-item">
              <label>Gender</label>
              <p>{isEditing ? <input disabled value={editData.gender} /> : student.gender}</p>
            </div>
            <div className="info-item">
              <label>Blood Group</label>
              <p>{isEditing ? <input disabled value={editData.bloodGroup} /> : student.bloodGroup}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="section">
          <h3>📍 Address</h3>
          <p>
            {isEditing ? (
              <textarea value={editData.address} onChange={(e) => handleChange('address', e.target.value)} />
            ) : (
              student.address
            )}
          </p>
        </div>

        {/* Parent/Guardian Information */}
        <div className="section">
          <h3>👨‍👩‍👧 Parent/Guardian Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Parent Name</label>
              <p>
                {isEditing ? (
                  <input
                    value={editData.parentName}
                    onChange={(e) => handleChange('parentName', e.target.value)}
                  />
                ) : (
                  student.parentName
                )}
              </p>
            </div>
            <div className="info-item">
              <label>Parent Phone</label>
              <p>
                {isEditing ? (
                  <input
                    value={editData.parentPhone}
                    onChange={(e) => handleChange('parentPhone', e.target.value)}
                  />
                ) : (
                  student.parentPhone
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
