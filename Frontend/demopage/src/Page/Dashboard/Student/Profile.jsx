import React, { useEffect, useRef } from 'react';
import { Card, Avatar, Typography, Descriptions } from 'antd';
import gsap from 'gsap';

const { Title } = Typography;

const Profile = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, scale: 0.98, duration: 0.45 });
  }, []);

  return (
    <Card ref={ref}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Avatar size={80} />
        <div>
          <Title level={4}>Student Name</Title>
          <div>Roll No: 23</div>
        </div>
      </div>

      <Descriptions bordered column={1} style={{ marginTop: 16 }}>
        <Descriptions.Item label="Class">10 - A</Descriptions.Item>
        <Descriptions.Item label="Email">student@example.com</Descriptions.Item>
        <Descriptions.Item label="Phone">+1 234 567 890</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;
