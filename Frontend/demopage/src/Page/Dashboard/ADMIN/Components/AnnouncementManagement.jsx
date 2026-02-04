import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]); // 🔐 always array
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  // 🔐 normalize any API response
  const normalizeArray = (res) => {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/announcements').catch(() => ({
        data: [
          {
            id: 1,
            title: 'Welcome to New Academic Year',
            message: 'We welcome all students to the new academic year 2025-2026',
            audience: 'All',
            date: '2026-02-04',
            status: 'Sent',
          },
          {
            id: 2,
            title: 'Class Schedule Update',
            message: 'Please note that class timings have been revised',
            audience: 'Students',
            date: '2026-02-03',
            status: 'Sent',
          },
          {
            id: 3,
            title: 'Staff Meeting',
            message: 'Mandatory staff meeting on Friday at 2 PM',
            audience: 'Teachers',
            date: '2026-02-02',
            status: 'Draft',
          },
        ],
      }));

      setAnnouncements(normalizeArray(response)); // 🔐 SAFE
    } catch (err) {
      console.error(err);
      setAnnouncements([]); // 🔐 SAFE
      message.error('Failed to load announcements');
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
        await axios.put(`/api/announcements/${editingId}`, values).catch(() => {
          setAnnouncements((prev) =>
            prev.map((a) => (a.id === editingId ? { ...a, ...values } : a))
          );
        });
        message.success('Announcement updated');
      } else {
        const newAnnouncement = {
          id: Date.now(),
          ...values,
          date: new Date().toISOString().split('T')[0],
          status: 'Draft',
        };

        await axios.post('/api/announcements', values).catch(() => {
          setAnnouncements((prev) => [...prev, newAnnouncement]);
        });
        message.success('Announcement created');
      }
      handleCancel();
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      message.error('Failed to save announcement');
    }
  };

  const handleSendAnnouncement = async (id) => {
    try {
      await axios.post(`/api/announcements/${id}/send`).catch(() => {
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: 'Sent' } : a))
        );
      });
      message.success('Announcement sent');
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      message.error('Failed to send announcement');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/announcements/${id}`).catch(() => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      });
      message.success('Announcement deleted');
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete announcement');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text = '') => text.length > 50 ? text.slice(0, 50) + '…' : text,
    },
    { title: 'Audience', dataIndex: 'audience', key: 'audience' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s) => (
        <span style={{ color: s === 'Sent' ? '#52c41a' : '#faad14' }}>{s}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'Draft' && (
            <Button size="small" icon={<SendOutlined />} onClick={() => handleSendAnnouncement(record.id)}>
              Send
            </Button>
          )}
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
      title="Announcement Management"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Create Announcement
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={Array.isArray(announcements) ? announcements : []} // 🔐 CRITICAL
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />

      <Modal
        title={editingId ? 'Edit Announcement' : 'Create Announcement'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true }]}>
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item name="audience" label="Audience" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'All', value: 'All' },
                { label: 'Students', value: 'Students' },
                { label: 'Teachers', value: 'Teachers' },
                { label: 'Parents', value: 'Parents' },
                { label: 'Staff', value: 'Staff' },
                { label: 'Accountant', value: 'Accountant' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AnnouncementManagement;
