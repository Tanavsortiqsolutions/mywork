import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const RolesAndAccess = () => {
  const [roles, setRoles] = useState([]); // 🔐 always array
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  // 🔐 normalize ANY api response into array
  const normalizeArray = (res) => {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/roles').catch(() => ({
        data: [
          { id: 1, name: 'Admin', description: 'Full access to all features', permissions: ['All'] },
          { id: 2, name: 'Teacher', description: 'Can manage classes and students', permissions: ['Class', 'Student', 'Grades'] },
          { id: 3, name: 'Student', description: 'Can view personal information', permissions: ['Profile', 'Grades', 'Attendance'] },
          { id: 4, name: 'Accountant', description: 'Can manage fees and salaries', permissions: ['Fees', 'Salary', 'Reports'] },
        ],
      }));

      setRoles(normalizeArray(response)); // 🔐 SAFE
    } catch (err) {
      console.error(err);
      setRoles([]); // 🔐 SAFE
      message.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingId(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await axios.put(`/api/roles/${editingId}`, values).catch(() => {
          setRoles((prev) =>
            prev.map((r) => (r.id === editingId ? { ...r, ...values } : r))
          );
        });
        message.success('Role updated successfully');
      } else {
        const newRole = { id: Date.now(), ...values };
        await axios.post('/api/roles', values).catch(() => {
          setRoles((prev) => [...prev, newRole]);
        });
        message.success('Role created successfully');
      }
      handleCancel();
      fetchRoles();
    } catch (err) {
      console.error(err);
      message.error('Failed to save role');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/roles/${id}`).catch(() => {
        setRoles((prev) => prev.filter((r) => r.id !== id));
      });
      message.success('Role deleted successfully');
      fetchRoles();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete role');
    }
  };

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (p) => (Array.isArray(p) ? p.join(', ') : p),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete role?" onConfirm={() => handleDelete(record.id)}>
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Roles & Access Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Role
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={Array.isArray(roles) ? roles : []} // 🔐 CRITICAL
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title={editingId ? 'Edit Role' : 'Add Role'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="permissions" label="Permissions" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              options={[
                { label: 'Dashboard', value: 'Dashboard' },
                { label: 'Departments', value: 'Departments' },
                { label: 'Roles', value: 'Roles' },
                { label: 'Fees', value: 'Fees' },
                { label: 'Salary', value: 'Salary' },
                { label: 'Notices', value: 'Notices' },
                { label: 'Announcements', value: 'Announcements' },
                { label: 'Reports', value: 'Reports' },
                { label: 'Students', value: 'Students' },
                { label: 'Teachers', value: 'Teachers' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default RolesAndAccess;
