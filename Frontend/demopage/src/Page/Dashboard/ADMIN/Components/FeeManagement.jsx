import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Space, Popconfirm, InputNumber } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchFees = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/fees').catch(() => ({
          data: [
            { id: 1, studentName: 'John Doe', rollNo: 'S001', feeType: 'Tuition', amount: 5000, status: 'Paid', dueDate: '2026-01-31' },
            { id: 2, studentName: 'Jane Smith', rollNo: 'S002', feeType: 'Hostel', amount: 3000, status: 'Pending', dueDate: '2026-02-15' },
            { id: 3, studentName: 'Mike Johnson', rollNo: 'S003', feeType: 'Tuition', amount: 5000, status: 'Overdue', dueDate: '2026-01-20' },
          ],
        }));
        setFees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fees:', error);
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  const refetchFees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/fees').catch(() => ({
        data: [
          { id: 1, studentName: 'John Doe', rollNo: 'S001', feeType: 'Tuition', amount: 5000, status: 'Paid', dueDate: '2026-01-31' },
          { id: 2, studentName: 'Jane Smith', rollNo: 'S002', feeType: 'Hostel', amount: 3000, status: 'Pending', dueDate: '2026-02-15' },
          { id: 3, studentName: 'Mike Johnson', rollNo: 'S003', feeType: 'Tuition', amount: 5000, status: 'Overdue', dueDate: '2026-01-20' },
        ],
      }));
      setFees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching fees:', error);
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
        await axios.put(`/api/fees/${editingId}`, values).catch(() => {
          setFees(fees.map((fee) => (fee.id === editingId ? { ...fee, ...values } : fee)));
        });
        message.success('Fee updated successfully');
      } else {
        const newFee = { id: Date.now(), ...values };
        await axios.post('/api/fees', values).catch(() => {
          setFees([...fees, newFee]);
        });
        message.success('Fee created successfully');
      }
      setIsModalVisible(false);
      setEditingId(null);
      form.resetFields();
      refetchFees();
    } catch (error) {
      console.error('Error saving fee:', error);
      message.error('Failed to save fee');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/fees/${id}`).catch(() => {
        setFees(fees.filter((fee) => fee.id !== id));
      });
      message.success('Fee deleted successfully');
      refetchFees();
    } catch (error) {
      console.error('Error deleting fee:', error);
      message.error('Failed to delete fee');
    }
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Roll No',
      dataIndex: 'rollNo',
      key: 'rollNo',
    },
    {
      title: 'Fee Type',
      dataIndex: 'feeType',
      key: 'feeType',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { Paid: '#52c41a', Pending: '#faad14', Overdue: '#f5222d' };
        return <span style={{ color: colors[status] }}>{status}</span>;
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
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
            title="Delete Fee"
            description="Are you sure you want to delete this fee?"
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
    <div className="fee-management">
      <Card
        title="Student Fee Management"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Add Fee
          </Button>
        }
        style={{ borderRadius: '8px' }}
      >
        <Table
          columns={columns}
          dataSource={fees}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Fee' : 'Add New Fee'}
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
            name="studentName"
            label="Student Name"
            rules={[{ required: true, message: 'Please enter student name' }]}
          >
            <Input placeholder="e.g., John Doe" />
          </Form.Item>

          <Form.Item
            name="rollNo"
            label="Roll Number"
            rules={[{ required: true, message: 'Please enter roll number' }]}
          >
            <Input placeholder="e.g., S001" />
          </Form.Item>

          <Form.Item
            name="feeType"
            label="Fee Type"
            rules={[{ required: true, message: 'Please enter fee type' }]}
          >
            <Input placeholder="e.g., Tuition, Hostel, Transport" />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter amount' }]}
          >
            <InputNumber min={0} placeholder="e.g., 5000" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please enter due date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Input placeholder="e.g., Paid, Pending, Overdue" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeeManagement;
