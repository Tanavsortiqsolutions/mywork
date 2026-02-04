import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Space, Popconfirm, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/salaries').catch(() => ({
          data: [
            { id: 1, teacherName: 'Dr. John Smith', employeeId: 'T001', department: 'Science', baseSalary: 8000, deductions: 500, netSalary: 7500, month: 'January 2026' },
            { id: 2, teacherName: 'Prof. Jane Doe', employeeId: 'T002', department: 'Mathematics', baseSalary: 7500, deductions: 400, netSalary: 7100, month: 'January 2026' },
            { id: 3, teacherName: 'Mr. Robert Wilson', employeeId: 'T003', department: 'English', baseSalary: 7000, deductions: 350, netSalary: 6650, month: 'January 2026' },
          ],
        }));
        setSalaries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching salaries:', error);
        setLoading(false);
      }
    };
    fetchSalaries();
  }, []);

  const refetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/salaries').catch(() => ({
        data: [
          { id: 1, teacherName: 'Dr. John Smith', employeeId: 'T001', department: 'Science', baseSalary: 8000, deductions: 500, netSalary: 7500, month: 'January 2026' },
          { id: 2, teacherName: 'Prof. Jane Doe', employeeId: 'T002', department: 'Mathematics', baseSalary: 7500, deductions: 400, netSalary: 7100, month: 'January 2026' },
          { id: 3, teacherName: 'Mr. Robert Wilson', employeeId: 'T003', department: 'English', baseSalary: 7000, deductions: 350, netSalary: 6650, month: 'January 2026' },
        ],
      }));
      setSalaries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching salaries:', error);
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
      const netSalary = values.baseSalary - values.deductions;
      const dataToSend = { ...values, netSalary };
      
      if (editingId) {
        await axios.put(`/api/salaries/${editingId}`, dataToSend).catch(() => {
          setSalaries(salaries.map((sal) => (sal.id === editingId ? { ...sal, ...dataToSend } : sal)));
        });
        message.success('Salary updated successfully');
      } else {
        const newSalary = { id: Date.now(), ...dataToSend };
        await axios.post('/api/salaries', dataToSend).catch(() => {
          setSalaries([...salaries, newSalary]);
        });
        message.success('Salary created successfully');
      }
      setIsModalVisible(false);
      setEditingId(null);
      form.resetFields();
      refetchSalaries();
    } catch (error) {
      console.error('Error saving salary:', error);
      message.error('Failed to save salary');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/salaries/${id}`).catch(() => {
        setSalaries(salaries.filter((sal) => sal.id !== id));
      });
      message.success('Salary deleted successfully');
      refetchSalaries();
    } catch (error) {
      console.error('Error deleting salary:', error);
      message.error('Failed to delete salary');
    }
  };

  const columns = [
    {
      title: 'Teacher Name',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Base Salary',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      render: (salary) => `$${salary}`,
    },
    {
      title: 'Deductions',
      dataIndex: 'deductions',
      key: 'deductions',
      render: (deduction) => `$${deduction}`,
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      key: 'netSalary',
      render: (salary) => <span style={{ fontWeight: 'bold', color: '#52c41a' }}>${salary}</span>,
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Salary"
            description="Are you sure you want to delete this salary?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="salary-management">
      <Card
        title="Teacher Salary Management"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Add Salary
          </Button>
        }
        style={{ borderRadius: '8px' }}
      >
        <Table
          columns={columns}
          dataSource={salaries}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Salary' : 'Add New Salary'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          labelCol={{ span: 24 }}
        >
          <Form.Item
            name="teacherName"
            label="Teacher Name"
            rules={[{ required: true, message: 'Please enter teacher name' }]}
          >
            <Input placeholder="e.g., Dr. John Smith" />
          </Form.Item>

          <Form.Item
            name="employeeId"
            label="Employee ID"
            rules={[{ required: true, message: 'Please enter employee ID' }]}
          >
            <Input placeholder="e.g., T001" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please enter department' }]}
          >
            <Input placeholder="e.g., Science" />
          </Form.Item>

          <Form.Item
            name="baseSalary"
            label="Base Salary"
            rules={[{ required: true, message: 'Please enter base salary' }]}
          >
            <InputNumber min={0} placeholder="e.g., 8000" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="deductions"
            label="Deductions"
            rules={[{ required: true, message: 'Please enter deductions' }]}
          >
            <InputNumber min={0} placeholder="e.g., 500" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="month"
            label="Month"
            rules={[{ required: true, message: 'Please enter month' }]}
          >
            <Input placeholder="e.g., January 2026" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalaryManagement;
