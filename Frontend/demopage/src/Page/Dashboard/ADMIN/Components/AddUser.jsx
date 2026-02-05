import React, { useState } from 'react';
import { Form, Input, Select, Button, InputNumber, Table, message } from 'antd';



const AddUser = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  // 👇 AntD-safe way to watch role changes
  const role = Form.useWatch('role', form);

  const onFinish = (values) => {
    const id = Date.now();

    const record = {
      key: id,
      name: values.name,
      email: values.email,
      role: values.role,
      designation: values.designation,
      fees: values.fees,
      salary: values.salary,
    };

    setUsers((prev) => [record, ...prev]);
    message.success('User added successfully');

    // reset form after submit
    form.resetFields();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    {
      title: 'Fees / Salary',
      key: 'compensation',
      render: (_, record) => {
        if (record.role === 'Student') return record.fees ?? '-';
        if (record.role === 'Teacher') return record.salary ?? '-';
        return '-';
      },
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>Add User</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: 'Student' }}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please enter full name' }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select role' }]}
        >
          <Select placeholder="Select role">
            <Option value="Student">Student</Option>
            <Option value="Teacher">Teacher</Option>
            <Option value="Nonteaching">Staff</Option>
            <Option value="Admin">Admin</Option>
            
          </Select>
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[{ required: true, message: 'Please enter designation' }]}
        >
          <Select placeholder="Select designation">
            <Option value="principal">Principal</Option>
            <Option value="dean">Dean</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="hod">HOD</Option>
            <Option value="as">Assistant Lecturer</Option>
            <Option value="la">Lab Assistent</Option>
            <Option value="librarian">Librarian</Option>
            <Option value="warden">Warden</Option>
            <Option value="accountant">Accountant</Option>
             <Option value="student">Student</Option>
          </Select>
        </Form.Item>

        {/* Conditional fields */}
        {role === 'Student' && (
           <>
          
             <Form.Item
            label="Student Type"
            name="studenttype"
            rules={[{ required: true, message: 'Enter student type' }]}
          >
           <Select placeholder="Select student type">
            <Option value="domestic">Regular</Option>
            <Option value="international">Lateral Entery</Option>
           </Select>
          </Form.Item>  
            <Form.Item
            label="Course"
            name="course"
            rules={[{ required: true, message: 'Enter student course' }]}
          >
            <Select placeholder="Select course">
              <Option value="btech">B.Tech</Option>
              <Option value="mtech">M.Tech</Option><span style={{ color: 'red' }}>New</span>
              <Option value="bca">BCA</Option>
              <Option value="mca">MCA</Option>
                <Option value="bsc">B.Sc</Option>
                <Option value="msc">M.Sc</Option>
            </Select>
          </Form.Item>
           <Form.Item
            label="Course"
            name="course"
            rules={[{ required: true, message: 'Enter student branch' }]}
          >
            <Select placeholder="Select Branch">
              <Option value="btech">Computer Science</Option>
              <Option value="btech">Electronics & Communication</Option>
              <Option value="btech">Mechanical Engineering</Option>
              <Option value="btech">Civil Engineering</Option>
              <Option value="mtech">Electronical Engineering</Option><span style={{ color: 'red' }}>New</span>
              <Option value="bca">Computer Applications</Option>
              <Option value="mca">Information Technology</Option>
              <Option value="bsc">Physics</Option>
              <Option value="msc">Mathematics</Option>
         
              <Option value="mca">Master of Computer Applications</Option>
                <Option value="bsc">Bachelor of Science</Option>
                <Option value="msc">Master of Science</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Semester Fees"
            name="fees"
            rules={[{ required: true, message: 'Enter student fees' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="Total Fees"
            />
          </Form.Item>
           </>
        
        )}

        {role === 'Teacher' && (
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: 'Enter teacher salary' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="Monthly Salary"
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add User
          </Button>
        </Form.Item>
      </Form>

      <hr style={{ margin: '30px 0' }} />

      <h3>Users List</h3>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AddUser;
