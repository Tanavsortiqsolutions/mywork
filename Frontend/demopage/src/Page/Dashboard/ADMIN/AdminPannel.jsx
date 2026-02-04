import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Avatar } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  FileProtectOutlined,
  DollarOutlined,
  BankOutlined,
  NotificationOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import AdminDashboard from './Components/AdminDashboard';
import DepartmentManagement from "./Components/DepartmentManagement"
import RolesAndAccess from './Components/RolesAndAccess';
import FeeManagement from './Components/FeeManagement';
import SalaryManagement from './Components/SalaryManagement';
import NoticeManagement from './Components/NoticeManagement';
import AnnouncementManagement from './Components/AnnouncementManagement';
import './AdminPannel.css';

const { Header, Sider, Content } = Layout;

const AdminPannel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState('dashboard');

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'departments',
      icon: <BankOutlined />,
      label: 'Departments',
    },
    {
      key: 'roles',
      icon: <TeamOutlined />,
      label: 'Roles & Access',
    },
    {
      key: 'fees',
      icon: <DollarOutlined />,
      label: 'Fee Management',
    },
    {
      key: 'salary',
      icon: <FileProtectOutlined />,
      label: 'Salary Management',
    },
    {
      key: 'notices',
      icon: <UnorderedListOutlined />,
      label: 'Notices',
    },
    {
      key: 'announcements',
      icon: <NotificationOutlined />,
      label: 'Announcements',
    },
  ];

  const renderContent = () => {
    switch (activeKey) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'departments':
        return <DepartmentManagement />;
      case 'roles':
        return <RolesAndAccess />;
      case 'fees':
        return <FeeManagement />;
      case 'salary':
        return <SalaryManagement />;
      case 'notices':
        return <NoticeManagement />;
      case 'announcements':
        return <AnnouncementManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="admin-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="admin-sider"
        width={250}
        collapsedWidth={80}
      >
        <div className="admin-logo">
          <h2 className="logo-text">{collapsed ? 'AD' : 'ADMIN'}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={(e) => setActiveKey(e.key)}
          items={menuItems}
          className="admin-menu"
        />
      </Sider>

      <Layout className="admin-main">
        <Header className="admin-header">
          <div className="header-content">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapse}
              style={{
                fontSize: '18px',
              }}
            />
            <h1 className="header-title">Admin Panel - School Management System</h1>
          </div>
          <Space size="large" className="header-actions">
            <Avatar size={40} icon={<UserOutlined />} className="admin-avatar" />
            <Button
              danger
              icon={<LogoutOutlined />}
              onClick={() => {
                // Handle logout
                localStorage.removeItem('adminToken');
                window.location.href = '/login';
              }}
            >
              Logout
            </Button>
          </Space>
        </Header>

        <Content className="admin-content">
          <div className="content-wrapper">
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPannel;
