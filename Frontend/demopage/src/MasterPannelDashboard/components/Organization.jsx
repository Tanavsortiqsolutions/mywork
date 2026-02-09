import React, { useState } from 'react'
import './Organization.css'

const Organization = () => {
  const [view, setView] = useState('list')
  const [organizations, setOrganizations] = useState([
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+91-9876543210',
      registeredDate: '2024-06-15',
      status: 'Active',
      industry: 'Technology',
    },
    {
      id: 2,
      name: 'TechStart Inc',
      email: 'info@techstart.com',
      phone: '+91-9876543211',
      registeredDate: '2024-07-20',
      status: 'Active',
      industry: 'Software',
    },
    {
      id: 3,
      name: 'Global Industries',
      email: 'admin@globalind.com',
      phone: '+91-9876543212',
      registeredDate: '2024-08-10',
      status: 'Inactive',
      industry: 'Manufacturing',
    },
    {
      id: 4,
      name: 'Future Ventures',
      email: 'contact@futureventuressl.com',
      phone: '+91-9876543213',
      registeredDate: '2024-09-05',
      status: 'Active',
      industry: 'Consulting',
    },
  ])

  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      organizationName: 'NextGen Solutions',
      contactPerson: 'John Doe',
      email: 'john@nextgen.com',
      phone: '+91-9876543214',
      enquiryDate: '2026-02-05',
      productInterest: 'Enterprise Suite',
      status: 'Pending',
    },
    {
      id: 2,
      organizationName: 'Digital Transformation Ltd',
      contactPerson: 'Sarah Smith',
      email: 'sarah@digitaltrans.com',
      phone: '+91-9876543215',
      enquiryDate: '2026-02-06',
      productInterest: 'Cloud Platform',
      status: 'Contacted',
    },
    {
      id: 3,
      organizationName: 'Innovation Labs',
      contactPerson: 'Mike Johnson',
      email: 'mike@innolabs.com',
      phone: '+91-9876543216',
      enquiryDate: '2026-02-07',
      productInterest: 'AI Solutions',
      status: 'In Review',
    },
  ])

  const [newOrganization, setNewOrganization] = useState({
    name: '',
    email: '',
    phone: '',
    industry: 'Technology',
  })

  const [newEnquiry, setNewEnquiry] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    productInterest: '',
  })

  const handleRegisterOrg = (e) => {
    e.preventDefault()
    const org = {
      id: organizations.length + 1,
      ...newOrganization,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    }
    setOrganizations([...organizations, org])
    setNewOrganization({ name: '', email: '', phone: '', industry: 'Technology' })
    alert('Organization registered successfully!')
  }

  const handleAddEnquiry = (e) => {
    e.preventDefault()
    const enquiry = {
      id: enquiries.length + 1,
      ...newEnquiry,
      enquiryDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    }
    setEnquiries([...enquiries, enquiry])
    setNewEnquiry({ organizationName: '', contactPerson: '', email: '', phone: '', productInterest: '' })
    alert('Enquiry added successfully!')
  }

  const handleDeleteOrg = (id) => {
    setOrganizations(organizations.filter((org) => org.id !== id))
  }

  const handleDeleteEnquiry = (id) => {
    setEnquiries(enquiries.filter((eq) => eq.id !== id))
  }

  return (
    <div className="organization-view">
      {/* Tab Navigation */}
      <div className="org-tabs">
        <button
          className={`tab-btn ${view === 'register' ? 'active' : ''}`}
          onClick={() => setView('register')}
        >
          📝 Register Organization
        </button>
        <button
          className={`tab-btn ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          📋 Organization List ({organizations.length})
        </button>
        <button
          className={`tab-btn ${view === 'enquiry' ? 'active' : ''}`}
          onClick={() => setView('enquiry')}
        >
          ❓ Enquiries ({enquiries.length})
        </button>
      </div>

      {/* Register Organization */}
      {view === 'register' && (
        <div className="org-section">
          <h2>Register New Organization</h2>
          <form onSubmit={handleRegisterOrg} className="org-form">
            <div className="form-row">
              <div className="form-group">
                <label>Organization Name *</label>
                <input
                  type="text"
                  required
                  value={newOrganization.name}
                  onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                  placeholder="Enter organization name"
                />
              </div>
              <div className="form-group">
                <label>Industry *</label>
                <select
                  value={newOrganization.industry}
                  onChange={(e) => setNewOrganization({ ...newOrganization, industry: e.target.value })}
                >
                  <option>Technology</option>
                  <option>Software</option>
                  <option>Manufacturing</option>
                  <option>Consulting</option>
                  <option>Finance</option>
                  <option>Retail</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  value={newOrganization.email}
                  onChange={(e) => setNewOrganization({ ...newOrganization, email: e.target.value })}
                  placeholder="organization@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newOrganization.phone}
                  onChange={(e) => setNewOrganization({ ...newOrganization, phone: e.target.value })}
                  placeholder="+91-9876543210"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Register Organization
            </button>
          </form>
        </div>
      )}

      {/* Organization List */}
      {view === 'list' && (
        <div className="org-section">
          <h2>List of Organizations</h2>
          <div className="org-table-container">
            <table className="org-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Organization Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Industry</th>
                  <th>Registered Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((org) => (
                  <tr key={org.id}>
                    <td>{org.id}</td>
                    <td>
                      <strong>{org.name}</strong>
                    </td>
                    <td>{org.email}</td>
                    <td>{org.phone}</td>
                    <td>
                      <span className="industry-badge">{org.industry}</span>
                    </td>
                    <td>{new Date(org.registeredDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${org.status.toLowerCase()}`}>{org.status}</span>
                    </td>
                    <td className="actions-cell">
                      <button className="edit-btn" title="Edit">✏️</button>
                      <button className="delete-btn" title="Delete" onClick={() => handleDeleteOrg(org.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Organization Enquiry */}
      {view === 'enquiry' && (
        <div className="org-section">
          <h2>Manage Organization Enquiries</h2>

          {/* Add Enquiry Form */}
          <div className="enquiry-form-section">
            <h3>Add New Enquiry</h3>
            <form onSubmit={handleAddEnquiry} className="org-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={newEnquiry.organizationName}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, organizationName: e.target.value })}
                    placeholder="Organization name"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={newEnquiry.contactPerson}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, contactPerson: e.target.value })}
                    placeholder="Contact person name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newEnquiry.email}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newEnquiry.phone}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                    placeholder="+91-9876543210"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Product Interest *</label>
                  <input
                    type="text"
                    required
                    value={newEnquiry.productInterest}
                    onChange={(e) => setNewEnquiry({ ...newEnquiry, productInterest: e.target.value })}
                    placeholder="e.g., Enterprise Suite, Cloud Platform"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Add Enquiry
              </button>
            </form>
          </div>

          {/* Enquiries List */}
          <div className="enquiry-list-section">
            <h3>Enquiry Records</h3>
            <div className="enquiry-cards">
              {enquiries.map((enquiry) => (
                <div key={enquiry.id} className="enquiry-card">
                  <div className="card-header-section">
                    <h4>{enquiry.organizationName}</h4>
                    <span className={`status-badge-small ${enquiry.status.toLowerCase().replace(' ', '-')}`}>
                      {enquiry.status}
                    </span>
                  </div>

                  <div className="card-content">
                    <p>
                      <strong>Contact Person:</strong> {enquiry.contactPerson}
                    </p>
                    <p>
                      <strong>Email:</strong> {enquiry.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {enquiry.phone}
                    </p>
                    <p>
                      <strong>Product Interest:</strong> {enquiry.productInterest}
                    </p>
                    <p>
                      <strong>Enquiry Date:</strong> {new Date(enquiry.enquiryDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="card-actions">
                    <button className="action-btn">📧 Send Reply</button>
                    <button className="action-btn danger" onClick={() => handleDeleteEnquiry(enquiry.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Organization
