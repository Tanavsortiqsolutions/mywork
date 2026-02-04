import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Button } from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  NotificationOutlined,
  WalletOutlined,
  ReadOutlined,
  BookOutlined,
  SettingOutlined,
  UserOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import gsap from 'gsap';
import './StudentDash.css';

import Attendance from './Attendance';
import Homework from './Homework';
import Notice from './Notice';
import FeeLedger from './FeeLedger';
import LibraryBooks from './LibraryBooks';
import Announcement from './Announcement';
import AttendanceSetting from './AttendanceSetting';
import Profile from './Profile';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const StudentDash = () => {
  const [selected, setSelected] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const siderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(siderRef.current, { x: -220, opacity: 0, duration: 0.6, ease: 'power3.out' });
      gsap.from(contentRef.current, { opacity: 0, y: 20, duration: 0.6, delay: 0.12, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);



  

  const renderContent = () => {
    switch (selected) {
      case 'attendance':
        return <Attendance />;
      case 'homework':
        return <Homework />;
      case 'notice':
        return <Notice />;
      case 'fee':
        return <FeeLedger />;
      case 'library':
        return <LibraryBooks />;
      case 'announcement':
        return <Announcement />;
      case 'attendancesetting':
        return <AttendanceSetting />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <div>
            <Title level={3}>Welcome to Student Dashboard</Title>
            <Text>Select a section from the sidebar.</Text>
          </div>
        );
    }
  };

  return (
    <Layout className="student-dashboard">
      <Sider 
        width={260} 
        collapsedWidth={80}
        collapsed={collapsed}
        ref={siderRef} 
        className="student-sider"
        trigger={null}
      >
        <div className="sider-header">
          <Avatar size={56} icon={<UserOutlined />} />
          {!collapsed && (
            <div className="sider-user">
              <Title level={4} style={{ margin: 0 }}>
                Student Name
              </Title>
            </div>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selected]}
          onClick={(e) => setSelected(e.key)}
          inlineCollapsed={collapsed}
          items={[
            { key: 'home', icon: <HomeOutlined />, label: 'Home' },
            { key: 'attendance', icon: <CalendarOutlined />, label: 'Attendance' },
            { key: 'homework', icon: <FileTextOutlined />, label: 'Homework' },
            { key: 'notice', icon: <NotificationOutlined />, label: 'Notice' },
            { key: 'fee', icon: <WalletOutlined />, label: 'Fee Ledger' },
            { key: 'library', icon: <ReadOutlined />, label: 'Library Books' },
            { key: 'announcement', icon: <BookOutlined />, label: 'Announcement' },
            { key: 'attendancesetting', icon: <SettingOutlined />, label: 'Attendance Setting' },
            { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
          ]}
        />
      </Sider>

      <Layout>
        <div className="toolbar">
          <Button 
            type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-btn"
          />
        </div>
        <Content className="student-content" ref={contentRef}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDash;
