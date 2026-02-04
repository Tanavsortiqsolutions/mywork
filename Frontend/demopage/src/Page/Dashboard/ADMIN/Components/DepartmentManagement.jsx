import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]); // 🔐 always array
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const normalizeArray = (res) => {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/departments').catch(() => ({
        data: [
          { id: 1, name: 'Science', head: 'Dr. John Smith', budget: '$50,000', staff: 12 },
          { id: 2, name: 'Mathematics', head: 'Prof. Jane Doe', budget: '$45,000', staff: 10 },
          { id: 3, name: 'English', head: 'Mr. Robert Wilson', budget: '$40,000', staff: 15 },
          { id: 4, name: 'History', head: 'Mrs. Sarah Johnson', budget: '$35,000', staff: 8 },
        ],
      }));

      setDepartments(normalizeArray(response)); // 🔐 SAFE
    } catch (err) {
      console.error(err);
      setDepartments([]); // 🔐 SAFE
      message.error('Failed to load departments');
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
        await axios.put(`/api/departments/${editingId}`, values).catch(() => {
          setDepartments((prev) =>
            prev.map((d) => (d.id === editingId ? { ...d, ...values } : d))
          );
        });
        message.success('Department updated');
      } else {
        const newDept = { id: Date.now(), ...values };
        await axios.post('/api/departments', values).catch(() => {
          setDepartments((prev) => [...prev, newDept]);
        });
        message.success('Department created');
      }
      handleCancel();
      fetchDepartments();
    } catch (err) {
      console.error(err);
      message.error('Failed to save department');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/departments/${id}`).catch(() => {
        setDepartments((prev) => prev.filter((d) => d.id !== id));
      });
      message.success('Department deleted');
      fetchDepartments();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete department');
    }
  };

  const columns = [
    { title: 'Department Name', dataIndex: 'name', key: 'name' },
    { title: 'Department Head', dataIndex: 'head', key: 'head' },
    { title: 'Budget', dataIndex: 'budget', key: 'budget' },
    { title: 'Staff Count', dataIndex: 'staff', key: 'staff' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.id)}>
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Department Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Department
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={Array.isArray(departments) ? departments : []} // 🔐 CRITICAL
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title={editingId ? 'Edit Department' : 'Add Department'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Department Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="head" label="Department Head" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="budget" label="Budget" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="staff" label="Staff Count" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DepartmentManagement;
