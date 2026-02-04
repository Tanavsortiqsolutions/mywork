import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, message, Space, Popconfirm, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/notices').catch(() => ({
          data: [
            { id: 1, title: 'Holiday Schedule', content: 'Spring break starts on March 1st', date: '2026-02-04', status: 'Active' },
            { id: 2, title: 'Exam Schedule', content: 'Final exams scheduled for April', date: '2026-02-03', status: 'Active' },
            { id: 3, title: 'Campus Maintenance', content: 'Campus closed for maintenance on Feb 10', date: '2026-02-02', status: 'Inactive' },
          ],
        }));
        setNotices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notices:', error);
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const refetchNotices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notices').catch(() => ({
        data: [
          { id: 1, title: 'Holiday Schedule', content: 'Spring break starts on March 1st', date: '2026-02-04', status: 'Active' },
          { id: 2, title: 'Exam Schedule', content: 'Final exams scheduled for April', date: '2026-02-03', status: 'Active' },
          { id: 3, title: 'Campus Maintenance', content: 'Campus closed for maintenance on Feb 10', date: '2026-02-02', status: 'Inactive' },
        ],
      }));
      setNotices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notices:', error);
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
        await axios.put(`/api/notices/${editingId}`, values).catch(() => {
          setNotices(notices.map((notice) => (notice.id === editingId ? { ...notice, ...values } : notice)));
        });
        message.success('Notice updated successfully');
      } else {
        const newNotice = { id: Date.now(), ...values, date: new Date().toISOString().split('T')[0] };
        await axios.post('/api/notices', values).catch(() => {
          setNotices([...notices, newNotice]);
        });
        message.success('Notice created successfully');
      }
      setIsModalVisible(false);
      setEditingId(null);
      form.resetFields();
      refetchNotices();
    } catch (error) {
      console.error('Error saving notice:', error);
      message.error('Failed to save notice');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notices/${id}`).catch(() => {
        setNotices(notices.filter((notice) => notice.id !== id));
      });
      message.success('Notice deleted successfully');
      refetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
      message.error('Failed to delete notice');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (text) => text.substring(0, 50) + (text.length > 50 ? '...' : ''),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'Active' ? '#52c41a' : '#999' }}>
          {status}
        </span>
      ),
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
            title="Delete Notice"
            description="Are you sure you want to delete this notice?"
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
    <div className="notice-management">
      <Card
        title="Notice Management"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Post Notice
          </Button>
        }
        style={{ borderRadius: '8px' }}
      >
        <Table
          columns={columns}
          dataSource={notices}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Notice' : 'Post New Notice'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          labelCol={{ span: 24 }}
        >
          <Form.Item
            name="title"
            label="Notice Title"
            rules={[{ required: true, message: 'Please enter notice title' }]}
          >
            <Input placeholder="e.g., Holiday Schedule" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Notice Content"
            rules={[{ required: true, message: 'Please enter notice content' }]}
          >
            <Input.TextArea rows={6} placeholder="Enter notice content here..." />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Input placeholder="e.g., Active, Inactive" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NoticeManagement;
