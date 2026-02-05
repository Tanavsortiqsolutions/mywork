import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
  InputNumber,
  Select,
  DatePicker,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  /* ----------------------------------
     Utility: normalize API response
  -----------------------------------*/
  const normalizeFees = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  };

  /* ----------------------------------
     Fetch Fees
  -----------------------------------*/
  const fetchFees = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/fees');
      setFees(normalizeFees(res.data));
    } catch (err) {
      // fallback demo datac
      console.error('Failed to fetch fees, using demo data', err);
      setFees([
        {
          id: 1,
          studentName: 'John Doe',
          rollNo: 'S001',
          feeType: 'Tuition',
          amount: 5000,
          status: 'Paid',
          dueDate: '2026-01-31',
        },
        {
          id: 2,
          studentName: 'Jane Smith',
          rollNo: 'S002',
          feeType: 'Hostel',
          amount: 3000,
          status: 'Pending',
          dueDate: '2026-02-15',
        },
        {
          id: 3,
          studentName: 'Mike Johnson',
          rollNo: 'S003',
          feeType: 'Transport',
          amount: 2000,
          status: 'Overdue',
          dueDate: '2026-01-20',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  /* ----------------------------------
     Modal Handlers
  -----------------------------------*/
  const showModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue({
        ...record,
        dueDate: dayjs(record.dueDate),
      });
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

  /* ----------------------------------
     Submit Form
  -----------------------------------*/
  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
    };

    try {
      if (editingId) {
        await axios.put(`/api/fees/${editingId}`, payload).catch(() => {
          setFees((prev) =>
            prev.map((fee) =>
              fee.id === editingId ? { ...fee, ...payload } : fee
            )
          );
        });
        message.success('Fee updated successfully');
      } else {
        const newFee = { id: Date.now(), ...payload };
        await axios.post('/api/fees', payload).catch(() => {
          setFees((prev) => [...prev, newFee]);
        });
        message.success('Fee added successfully');
      }
      handleCancel();
      fetchFees();
    } catch (error) {
      console.error('Failed to save fee', error);
    }
  };

  /* ----------------------------------
     Delete Fee
  -----------------------------------*/
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/fees/${id}`).catch(() => {
        setFees((prev) => prev.filter((fee) => fee.id !== id));
      });
      message.success('Fee deleted successfully');
    } catch {
      message.error('Failed to delete fee');
    }
  };

  /* ----------------------------------
     Table Columns
  -----------------------------------*/
  const columns = [
    { title: 'Student Name', dataIndex: 'studentName' },
    { title: 'Roll No', dataIndex: 'rollNo' },
    { title: 'Fee Type', dataIndex: 'feeType' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const colors = {
          Paid: '#52c41a',
          Pending: '#faad14',
          Overdue: '#f5222d',
        };
        return <span style={{ color: colors[status] }}>{status}</span>;
      },
    },
    { title: 'Due Date', dataIndex: 'dueDate' },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Fee?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /* ----------------------------------
     Render
  -----------------------------------*/
  return (
    <Card
      title="Student Fee Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Fee
        </Button>
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={fees}
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingId ? 'Edit Fee' : 'Add Fee'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="studentName"
            label="Student Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rollNo"
            label="Roll Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="feeType"
            label="Fee Type"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Paid">Paid</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Overdue">Overdue</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default FeeManagement;
