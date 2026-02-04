import React, { useEffect, useRef } from 'react';
import { Card, Switch, Typography } from 'antd';
import gsap from 'gsap';

const { Title, Paragraph } = Typography;

const AttendanceSetting = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, { opacity: 1, y: 8, duration: 0.45 });
  }, []);

  return (
    <Card ref={ref} title={<Title level={4}>Attendance Settings</Title>}>
      <Paragraph>
        Toggle settings for attendance notifications and auto-marking.
      </Paragraph>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span>Enable notifications</span>
        <Switch defaultChecked />
      </div>
    </Card>
  );
};

export default AttendanceSetting;
